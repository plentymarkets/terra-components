const { series, parallel, src, dest } = require('gulp');
var config = require('./gulp.config.js')();
const prompt = require('gulp-prompt');
var fs = require('fs');
var semver = require('semver');
var sass = require('gulp-sass');
var tildeImporter = require('node-sass-tilde-importer');


// convert global scss styles to css files
function compileGlobalStyles() {
    return src(config.sources.scss)
        .pipe(sass({
            importer: tildeImporter,
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(dest('dist/styles'))
}
const compileStyles = compileGlobalStyles;
exports.compileStyles = compileStyles;


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

//copy README to dist
function copyReadme() {
    return src(config.sources.readme)
        .pipe(dest(config.destinations.tsOutputPath));
}

function copyJsFiles() {
    return src(config.sources.floatThead)
        .pipe(dest(config.destinations.floatThead));
}

function copyIconsScss() {
    return src('src/lib/styles/icons.scss')
        .pipe(dest(config.destinations.styles));
}

function copyPlentyIconsScss() {
    return src('src/lib/styles/fonts/plentyicons.scss')
        .pipe(dest(config.destinations.styles + 'fonts'));
}

function copyCustomDataTableScss() {
    return src('src/lib/components/tables/data-table/custom-data-table.scss')
        .pipe(dest('dist/components/tables/data-table'));
}

function copyNodeTreeScss() {
    return src('src/lib/components/tree/node-tree/terra-node-tree.component.scss')
        .pipe(dest('dist/components/tree/node-tree'));
}

function copyTagScss() {
    return src('src/lib/components/layouts/tag/terra-tag.component.scss')
        .pipe(dest('dist/components/layouts/tag'))
}

function copyTagListScss() {
    return src('src/lib/components/layouts/taglist/terra-taglist.component.scss')
        .pipe(dest('dist/components/layouts/taglist'))
}

function copyButtonScss() {
    return src('src/lib/components/buttons/button/terra-button.component.scss')
        .pipe(dest('dist/components/buttons/button'))
}

const copySassFiles = parallel(copyIconsScss, copyPlentyIconsScss, copyCustomDataTableScss, copyNodeTreeScss, copyTagScss, copyTagListScss, copyButtonScss);
const copyFilesToDist = parallel(copyFonts, copyLang, copyReadme, copySassFiles, copyJsFiles, copyTslintRules);


//copy files from dist to terra
function copyToTerra() {
    return src(config.sources.dist)
        .pipe(dest(config.destinations.terra));
}

/**
 * Copies all the files to the dist folder and then to the terra workspace
 **/
const copy = series(copyFilesToDist, copyToTerra);
exports.copy = copy;



/**
 *
 * usage: 'gulp changeVersion --param1 --param2 param2_value'
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
 **/
function changeVersion(increment = 'patch', preid = '') {
    const libPath = 'src/lib/package.json';
    const distPath = 'dist/package.json';
    const jsonLib = JSON.parse(fs.readFileSync(libPath));
    const jsonDist = JSON.parse(fs.readFileSync(distPath));

    console.log('-------------------------------------------------');
    console.log('--- OLD PACKAGE VERSION: ' + jsonDist.version + ' ---');

    const version = semver.inc(jsonDist.version, increment, preid);

    console.log('--- NEW PACKAGE VERSION: ' + version + ' ---');
    console.log('-------------------------------------------------');

    jsonDist.version = version;
    jsonLib.version = version;
    fs.writeFileSync(libPath, JSON.stringify(jsonLib, null, '\t'));
    fs.writeFileSync(distPath, JSON.stringify(jsonDist, null, '\t'));
}

function updateVersion() {
    return src('package.json')
        .pipe(prompt.prompt([
            {
                type: 'list',
                name: 'increment',
                message: 'What type of increment would you like to do?',
                choices: ['patch', 'minor', 'major', 'prerelease', 'prepatch', 'preminor', 'premajor']
            }
        ], function (res) {
            changeVersion(res.increment);
        }))
        .pipe(prompt.confirm({
            message: 'Version correct?',
            default: false
        }))
}
exports.updateVersion = updateVersion;

