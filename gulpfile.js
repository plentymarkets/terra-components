const { series, src, dest } = require('gulp');
var config = require('./gulp.config.js')();
var fs = require('fs');
var semver = require('semver');
var shell = require('gulp-shell');
var argv = require('yargs').argv;
var sass = require('gulp-sass');
var tildeImporter = require('node-sass-tilde-importer');

//copy fonts to dist
function copyFonts() {
    return src(config.fileSelectors.allFonts)
        .pipe(dest(config.destinations.fontsOutputPath));
}

//copy lang to dist
function copyLang() {
    return src(config.fileSelectors.allLang)
        .pipe(dest(config.destinations.langOutputPath));
}

//copy TSLint rules to dist
function copyTslintRules() {
    return src(config.sources.tslintRules)
        .pipe(dest(config.destinations.tsOutputPath));
}

function copyJsFiles() {
    return src(config.sources.floatThead)
        .pipe(dest(config.destinations.floatThead));
}

//copy files from dist to terra
function copyToTerra() {
    return src(config.sources.dist)
        .pipe(dest(config.destinations.terra));
}

/**
 * Copies all the files to the dedicated deploy folder
 **/
const copy = series(copyFonts, copyLang, copyTslintRules, copyJsFiles, copyToTerra);
exports.copy = copy;

// convert global scss styles to css files
function compileCss() {
    return src(config.sources.scss)
    .pipe(sass({
        importer: tildeImporter,
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(dest('dist/styles'))
}

/**
 * Compiles scss to css
 **/
exports.compileStyles = compileCss;

//changing version of package.json for new publish
function changeVersion(done) {
    const increment = argv.increment ? argv.increment : 'patch';
    const preid = argv.preid ? argv.preid : '';
    const json = JSON.parse(fs.readFileSync('./package.json'));

    console.log('-------------------------------------------------');
    console.log('--- OLD PACKAGE VERSION: ' + json.version + ' ---');

    json.version = semver.inc(json.version, increment, preid);

    version = json.version;

    console.log('--- NEW PACKAGE VERSION: ' + json.version + ' ---');
    console.log('-------------------------------------------------');

    fs.writeFileSync('./package.json', JSON.stringify(json, null, '\t'));
    done();
}

//publish to npm
function publish() {
    return shell.task(['npm publish dist'])
}

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
const release = series(changeVersion, compileCss, copy, publish);
exports.release = release;
