var gulp = require('gulp');
var config = require('./gulp.config.js')();
var fs = require('fs');
var semver = require('semver');
var shell = require('gulp-shell');
var argv = require('yargs').argv;

var version, increment, preid;

//copy files to dist
gulp.task('copy-files', function () {
    return gulp.src(config.filesToCopy)
        .pipe(gulp.dest(config.destinations.tsOutputPath));
});

//copy fonts to dist
gulp.task('copy-fonts', function () {
    return gulp.src(config.fileSelectors.allFonts)
        .pipe(gulp.dest(config.destinations.fontsOutputPath));
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

/**
 * Copies all the files to the dedicated deploy folder
 **/
gulp.task('copy',
    gulp.series(
        'copy-files',
        'copy-fonts',
        'copy-lang',
        'copy-tslint-rules',
        'copy-to-terra'
    )
);

/**
 * define gulp tasks for 'npm-publish'
 */
//changing version of package.json for new publish
function changeVersion(done) {
    var json = JSON.parse(fs.readFileSync('./package.json'));

    console.log('-------------------------------------------------');
    console.log('--- OLD PACKAGE VERSION: ' + json.version + ' ---');

    json.version = semver.inc(json.version, increment, preid);

    version = json.version;

    console.log('--- NEW PACKAGE VERSION: ' + json.version + ' ---');
    console.log('-------------------------------------------------');

    fs.writeFileSync('./package.json', JSON.stringify(json, null, '\t'));
    done();
};

//publish to npm
gulp.task('publish', shell.task([
        'npm publish dist'
    ])
);

/**
 *
 * usage: 'npm run publish -- --param1 --param2 param2_value' for publishing
 *
 * @param increment  - Possible values are
 *                      major           (1.x.x to 2.x.x),
 *                      premajor        (1.x.x to 2.x.x-0 or 2.x.x-subversion.0),
 *                      minor           (x.1.x to x.2.x),
 *                      preminor        (x.1.x to x.2.x-0 or x.2.x-subversion.0)
 *                      patch           (x.x.1 to x.x.2),
 *                      prepatch        (x.x.1 to x.x.2-0 or x.x.1 to x.x.2-subversion.0)
 *                      or prerelease   (x.x.x-0 or x.x.x-subversion.0 to x.x.x-1 or x.x.x-subversion.1)
 *                     If not set patch is default. See VERSIONING.md for further information.
 * @param preid      - Sets a subversion (appends '-param_value', e.g. x.x.x-newFeature, to version in package.json) for a premajor,
 *     preminor or prepatch release. Use only, if really necessary!!
 * @param target     - Actually not implemented!! Sets the target directory to copy build files to. Will copy files to
 *     'node_modules/@plentymarkets/terra-components' in target directory
 *
 **/
gulp.task('npm-publish', function () {
    increment = argv.increment ? argv.increment : 'patch';
    preid = argv.preid ? argv.preid : '';

    if(argv.level || argv.subversion)
    {
        console.log('-------------------------------------------------------------------');
        console.log('----  Build not started. See gulpfile for further information. ----');
        console.log('-------------------------------------------------------------------');

        return;
    }
    else
    {
        return gulp.series(
            changeVersion,
            'copy',
            'publish'
        );
    }
}());
