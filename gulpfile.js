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
var git = require('gulp-git');
var gitignore = require('gulp-gitignore');
var shell = require('gulp-shell');
var argv = require('yargs').argv;
var Dgeni = require('dgeni');
var gulpTasks = require('./component-documentation/tasks/docuTasks.js');
var paths = require('./component-documentation/tasks/paths');

var version, level, sequence, subversion, prerelease;

/**
 *
 * usage: 'npm run build' for local build
 *        or
 *        'npm run build -- --param1 --param2 param2_value' for publishing
 *
 * @param publish    - If set publish to npm, otherwise publish locally
 * @param level      - Possible values are major (1.x.x to 2.x.x), minor (x.1.x to x.2.x) or patch (x.x.1 to x.x.2).
 *                     If not set patch is default. See VERSIONING.md for further information.
 * @param subversion - Sets a subversion (appends '-param_value', e.g. x.x.x-newFeature, to version in package.json). Use only, if really necessary!!
 * @param target     - Sets the target directory to copy build files to. Will copy files to 'node_modules/@plentymarkets/terra-components' in target directory
 * @param prerelease - If set, a prerelease version is published using the 'rc' label. You can use prerelease OR subversion parameter. Both at the same time are not supported
 *
 **/
gulp.task('build', function (callback) {
    level = argv.level ? argv.level : 'patch';
    sequence = argv.publish ? 'npm-publish' : 'build-local';
    subversion = argv.subversion ? argv.subversion : '';
    prerelease = !!argv.prerelease;

    runSequence(sequence, callback);
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


//init git
gulp.task('gitInit', function () {
    git.init(function (err) {
        if (err) {
            throw err;
        }
    });
});

//fetch data
gulp.task('gitFetch', function () {
    git.fetch('origin', '', function (err) {
        if (err) {
            throw err;
        }
    });
});

//changing version of package.json for new publish
gulp.task('changeVersion', function () {
    var json = JSON.parse(fs.readFileSync('./package.json'));

    console.log('-------------------------------------------------');
    console.log('--- OLD PACKAGE VERSION: ' + json.version + ' ---');

    json.version = json.version.replace('-' + subversion, '');
    
    //possible values are: patch, minor, major
    if (prerelease)
    {
        json.version = semver.inc(json.version, 'prerelease', 'rc');
    }
    else
    {
        json.version = semver.inc(json.version, level);
        if(subversion !== '')
        {
            json.version += '-' + subversion;
        }
    }

    version = json.version;

    console.log('--- NEW PACKAGE VERSION: ' + json.version + ' ---');
    console.log('-------------------------------------------------');

    return fs.writeFileSync('./package.json', JSON.stringify(json, null, '\t'));
});

//commit version changes
gulp.task('gitCommit', function () {
    return gulp.src('./*')
        .pipe(gitignore())
        .pipe(git.commit('update version to ' + version));
});

gulp.task('gitPull', function () {
    return git.pull('origin', ['stable7'], function (err) {
        if (err) {
            throw err;
        }
    });

});

gulp.task('clean-dist', function () {
    return del(config.tsOutputPath);
});

//push version changes
gulp.task('gitPush', function () {
    git.push('origin', 'stable7', function (err) {
        if (err) {
            throw err;
        }
    });
});

//compile typescript files
gulp.task('compile-ts', function () {
    var sourceTsFiles = [
        config.excluded,
        config.allTs
    ];

    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest(config.tsOutputPath)),
        tsResult.js.pipe(sourcemaps.write('.')).pipe(gulp.dest(config.tsOutputPath))
    ]);
});

//copy files to dist
gulp.task('copy-files', function () {
    return gulp.src(['package.json',
        'README.md',
        config.allCSS,
        config.allSCSS,
        config.allHTML])
        .pipe(gulp.dest(config.tsOutputPath));
});

//copy fonts to dist
gulp.task('copy-fonts', function () {
    return gulp.src(config.allFonts)
        .pipe(gulp.dest(config.fontsOutputPath));
});

//copy images to dist
gulp.task('copy-images', function () {
    return gulp.src(config.allImages)
        .pipe(gulp.dest(config.imagesOutputPath));
});

//copy lang to dist
gulp.task('copy-lang', function () {
    return gulp.src(config.allLang)
        .pipe(gulp.dest(config.langOutputPath));
});

//copy lang to dist
gulp.task('copy-tslint-rules', function ()
{
    return gulp.src(config.tslint)
        .pipe(gulp.dest(config.tsOutputPath));
});

//copy files from dist to terra
gulp.task('copy-to-terra', function () {
    return gulp.src('dist/**/*.*')
        .pipe(gulp.dest('../terra/node_modules/@plentymarkets/terra-components/'));
});

gulp.task('copy-to-terra-doc', function () {
    return gulp.src('dist/**/*.*')
        .pipe(gulp.dest('../terra-components-doc/node_modules/@plentymarkets/terra-components/'));
});
gulp.task('copy-api-to-terra-doc', function () {
    return gulp.src('component-documentation/build/**/*.*')
        .pipe(gulp.dest('../terra-components-doc/node_modules/@plentymarkets/terra-components/component-documentation/build'));
});

//copy components from dist to terra-component-doc
gulp.task('copy-components-to-doc', function () {
    return gulp.src('src/app/components/**/**/example/*.ts')
        .pipe(gulp.dest('../terra-components-doc/node_modules/@plentymarkets/terra-components/app/components'));
});

gulp.task('copy-markdown-to-doc', function () {
    return gulp.src('src/app/components/**/example/*.md')
        .pipe(gulp.dest('../terra-components-doc/node_modules/@plentymarkets/terra-components/app/components'));
});

gulp.task('copy-icon-description-json', function () {
    return gulp.src('src/app/assets/styles/iconDescription.json')
        .pipe(gulp.dest('../terra-components-doc/node_modules/@plentymarkets/terra-components/component-documentation/build'));
});
gulp.task('copy-documentation-changelog', function () {
    return gulp.src('component-documentation/documentation-changelog.json')
        .pipe(gulp.dest('../terra-components-doc/node_modules/@plentymarkets/terra-components/component-documentation/build'));
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
