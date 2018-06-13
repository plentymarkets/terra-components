var gulp = require('gulp');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var tsc = require('gulp-typescript');
var tsProject = tsc.createProject('./tsconfig.json', {typescript: require('typescript')});
var config = require('./gulp.config.js')();
var fs = require('fs');
var semver = require('semver');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');
var argv = require('yargs').argv;
var Dgeni = require('dgeni');
var gulpTasks = require('./component-documentation/tasks/docuTasks.js');
var paths = require('./component-documentation/tasks/paths');

var version, increment, sequence, preid;

/**
 *
 * usage: 'npm run build' for local build
 *        or
 *        'npm run build -- --param1 --param2 param2_value' for publishing
 *
 * @param publish    - If set publish to npm, otherwise publish locally
 * @param increment  - Possible values are
 *                      major           (1.x.x to 2.x.x),
 *                      premajor        (1.x.x to 2.x.x-0 or 2.x.x-subversion.0),
 *                      minor           (x.1.x to x.2.x),
 *                      preminor        (x.1.x to x.2.x-0 or x.2.x-subversion.0)
 *                      patch           (x.x.1 to x.x.2),
 *                      prepatch        (x.x.1 to x.x.2-0 or x.x.1 to x.x.2-subversion.0)
 *                      or prerelease   (x.x.x-0 or x.x.x-subversion.0 to x.x.x-1 or x.x.x-subversion.1)
 *                     If not set patch is default. See VERSIONING.md for further information.
 * @param preid      - Sets a subversion (appends '-param_value', e.g. x.x.x-newFeature, to version in package.json) for a premajor, preminor or prepatch release. Use only, if really necessary!!
 * @param target     - Actually not implemented!! Sets the target directory to copy build files to. Will copy files to 'node_modules/@plentymarkets/terra-components' in target directory
 *
 **/
gulp.task('build', function (callback) {
    increment = argv.increment ? argv.increment : 'patch';
    sequence = argv.publish ? 'npm-publish' : 'build-local';
    preid = argv.preid ? argv.preid : '';

    if(argv.level || argv.subversion)
    {
        console.log('-------------------------------------------------------------------');
        console.log('----  Build not started. See gulpfile for further information. ----');
        console.log('-------------------------------------------------------------------');
    }
    else
    {
        runSequence(sequence, callback);
    }
});

gulp.task('npm-publish', function (callback) {
    runSequence(
        'changeVersion',
        'clean-dist',
        'compile-ts',
        'copy-files',
        'copy-fonts',
        'copy-images',
        'copy-lang',
        'copy-tslint-rules',
        'publish',
        callback
    );
});

gulp.task('build-local', function (callback) {
    runSequence(
        'clean-dist',
        'compile-ts',
        'copy-files',
        'copy-fonts',
        'copy-images',
        'copy-lang',
        'copy-tslint-rules',
        'copy-to-terra',
        callback
    );
});

/**
 * run "gulp generateDocu" to let Dgeni generate api files and to create json data.
 */
gulp.task('generateDocu', function (done) {
    runSequence(
        'build-local',
        'dgeni',
        'generateJson',
        'copy-to-terra-doc',
        'copy-components-to-doc',
        'copy-api-to-terra-doc',
        'copy-markdown-to-doc',
        'copy-icon-description-json',
        'copy-documentation-changelog',
        done);
});

//changing version of package.json for new publish
gulp.task('changeVersion', function () {
    var json = JSON.parse(fs.readFileSync('./package.json'));

    console.log('-------------------------------------------------');
    console.log('--- OLD PACKAGE VERSION: ' + json.version + ' ---');

    json.version = semver.inc(json.version, increment, preid);

    version = json.version;

    console.log('--- NEW PACKAGE VERSION: ' + json.version + ' ---');
    console.log('-------------------------------------------------');

    return fs.writeFileSync('./package.json', JSON.stringify(json, null, '\t'));
});

gulp.task('clean-dist', function () {
    return del(config.destinations.tsOutputPath);
});

//compile typescript files
gulp.task('compile-ts', function () {
    var sourceTsFiles = [
        config.excluded,
        config.fileSelectors.allTs
    ];

    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest(config.destinations.tsOutputPath)),
        tsResult.js.pipe(sourcemaps.write('.')).pipe(gulp.dest(config.destinations.tsOutputPath))
    ]);
});

//copy files to dist
gulp.task('copy-files', function () {
    return gulp.src(['package.json',
        'README.md',
        config.fileSelectors.allCSS,
        config.fileSelectors.allSCSS,
        config.fileSelectors.allHTML])
        .pipe(gulp.dest(config.destinations.tsOutputPath));
});

//copy fonts to dist
gulp.task('copy-fonts', function () {
    return gulp.src(config.fileSelectors.allFonts)
        .pipe(gulp.dest(config.destinations.fontsOutputPath));
});

//copy images to dist
gulp.task('copy-images', function () {
    return gulp.src(config.fileSelectors.allImages)
        .pipe(gulp.dest(config.destinations.imagesOutputPath));
});

//copy lang to dist
gulp.task('copy-lang', function () {
    return gulp.src(config.fileSelectors.allLang)
        .pipe(gulp.dest(config.destinations.langOutputPath));
});

//copy lang to dist
gulp.task('copy-tslint-rules', function ()
{
    return gulp.src(config.sources.tslintRules)
        .pipe(gulp.dest(config.destinations.tsOutputPath));
});

//copy files from dist to terra
gulp.task('copy-to-terra', function () {
    return gulp.src(config.sources.dist)
        .pipe(gulp.dest(config.destinations.terra));
});

gulp.task('copy-to-terra-doc', function () {
    return gulp.src(config.sources.dist)
        .pipe(gulp.dest(config.destinations.terraComponentsDoc));
});
gulp.task('copy-api-to-terra-doc', function () {
    return gulp.src('component-documentation/build/**/*.*')
        .pipe(gulp.dest(config.destinations.terraComponentsDocBuild));
});

//copy components from dist to terra-component-doc
gulp.task('copy-components-to-doc', function () {
    return gulp.src('src/app/components/**/**/example/*.ts')
        .pipe(gulp.dest(config.destinations.terraComponentsDocComponents));
});

gulp.task('copy-markdown-to-doc', function () {
    return gulp.src('src/app/components/**/example/*.md')
        .pipe(gulp.dest(config.destinations.terraComponentsDocComponents));
});

gulp.task('copy-icon-description-json', function () {
    return gulp.src('src/app/assets/styles/iconDescription.json')
        .pipe(gulp.dest(config.destinations.terraComponentsDocBuild));
});
gulp.task('copy-documentation-changelog', function () {
    return gulp.src('component-documentation/documentation-changelog.json')
        .pipe(gulp.dest(config.destinations.terraComponentsDocBuild));
});

//publish to npm
gulp.task('publish', shell.task([
        'npm publish dist'
    ])
);

gulp.task('dgeni', function () {
    try {
        var dgeni = new Dgeni([require('./component-documentation/index')]);
        return dgeni.generate();
    } catch (x) {
        console.log(x.stack);
        throw x;
    }
});

gulp.task('generateJson', function ()
{
    gulpTasks.buildJsonFile(paths.dataJsonOutputPath);
});
