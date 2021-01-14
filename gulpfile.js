const { series, parallel, src, dest } = require('gulp');
const config = require('./gulp.config.js')();
const fs = require('fs');
const semver = require('semver');
const argv = require('yargs').argv;
const sass = require('gulp-sass');
const del = require('del');
const tildeImporter = require('node-sass-tilde-importer');

const badgeUrlPrefix = 'https://img.shields.io/badge/';
const badgeUrlTemplate = new RegExp(badgeUrlPrefix + '\\w+-[0-9.%]+-\\w+');

function getCoverage() {
    const coverageSummary = fs.readFileSync('./coverage/coverage-summary.json', { encoding: 'utf8' });
    const coverageJSON = JSON.parse(coverageSummary);
    return coverageJSON.total.statements.pct;
}

function generateBadgeUrl(coverage) {
    const color = coverage > 80 ? 'brightgreen' : coverage > 50 ? 'yellow' : 'red';
    return badgeUrlPrefix + encodeURIComponent(`${'coverage'}-${coverage}%-${color}`);
}

function updateCoverageBadge(done) {
    const coverage = getCoverage();
    const badgeUrl = generateBadgeUrl(coverage);
    const badge = `![code coverage](${badgeUrl})`;
    const readme = fs.readFileSync('README.md', { encoding: 'utf8' });
    const eol = readme.indexOf('\n');
    const currentBadge = readme.slice(0, eol);
    if (!badgeUrlTemplate.test(currentBadge)) {
        throw 'Failed to update badge. No coverage badge available in line 1 of the README.md';
    }
    if (!badgeUrlTemplate.test(badge)) {
        throw `Failed to update badge. New badge doesn't comply to the badge template`;
    }
    const newReadmeString = badge + readme.slice(eol);
    fs.writeFileSync('README.md', newReadmeString);
    done();
}
exports.updateCoverageBadge = updateCoverageBadge;

// convert global scss styles to css files
function compileGlobalStyles() {
    return src(config.sources.scss)
        .pipe(
            sass({
                importer: tildeImporter,
                outputStyle: 'compressed'
            }).on('error', sass.logError)
        )
        .pipe(dest(config.destinations.styles));
}
const compileStyles = compileGlobalStyles;
exports.compileStyles = compileStyles;

//copy lang to dist
function copyLang() {
    return src(config.fileSelectors.allLang).pipe(dest(config.destinations.langOutputPath));
}

//copy README to dist
function copyReadme() {
    return src(config.sources.readme).pipe(dest(config.destinations.tsOutputPath));
}

function copyFunctionGroupsScss() {
    return src('src/lib/styles/function-groups.scss').pipe(dest(config.destinations.styles));
}

function copyVariablesScss() {
    return src('src/lib/styles/_variables.scss').pipe(dest(config.destinations.styles));
}

function copyCustomDataTableScss() {
    return src('src/lib/components/tables/data-table/custom-data-table.scss').pipe(
        dest('dist/components/tables/data-table')
    );
}

function copyNodeTreeScss() {
    return src('src/lib/components/tree/node-tree/terra-node-tree.component.scss').pipe(
        dest('dist/components/tree/node-tree')
    );
}

function copyTagScss() {
    return src('src/lib/components/layouts/tag/terra-tag.component.scss').pipe(dest('dist/components/layouts/tag'));
}

function copyTagListScss() {
    return src('src/lib/components/layouts/taglist/terra-taglist.component.scss').pipe(
        dest('dist/components/layouts/taglist')
    );
}

function copyButtonScss() {
    return src('src/lib/components/buttons/button/terra-button.component.scss').pipe(
        dest('dist/components/buttons/button')
    );
}

const copySassFiles = parallel(
    copyFunctionGroupsScss,
    copyVariablesScss,
    copyCustomDataTableScss,
    copyNodeTreeScss,
    copyTagScss,
    copyTagListScss,
    copyButtonScss
);
const copyFilesToDist = parallel(copyLang, copyReadme, copySassFiles);

//delete terra-components folder in terra
function cleanUpTerra() {
    return del(config.destinations.terra + '/**', { force: true });
}

//copy files from dist to terra
function copyToTerra() {
    return src(config.sources.dist).pipe(dest(config.destinations.terra));
}

/**
 * Copies all the files to the dist folder and then to the terra workspace
 **/
const copy = series(copyFilesToDist, cleanUpTerra, copyToTerra);
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
 * @param target     - Actually not implemented!! Sets the target directory to copy build files to. Will copy files to
 *     'node_modules/@plentymarkets/terra-components' in target directory
 *
 **/
function changeVersion(done) {
    const libPath = 'src/lib/package.json';
    const distPath = 'dist/package.json';
    const increment = argv.increment ? argv.increment : 'patch';
    const preid = argv.preid ? argv.preid : '';
    const jsonLib = JSON.parse(fs.readFileSync(libPath));
    const jsonDist = JSON.parse(fs.readFileSync(distPath));

    console.log('-------------------------------------------------');
    console.log('--- OLD PACKAGE VERSION: ' + jsonDist.version + ' ---');

    const version = semver.inc(jsonDist.version, increment, preid);
    if (version == null) {
        console.error('! - Invalid parameter used. Changing of version aborted. Please check command - !');
    } else {
        console.log('--- NEW PACKAGE VERSION: ' + version + ' ---');
        console.log('-------------------------------------------------');
        jsonDist.version = version;
        jsonLib.version = version;
        fs.writeFileSync(libPath, JSON.stringify(jsonLib, null, '\t'));
        fs.writeFileSync(distPath, JSON.stringify(jsonDist, null, '\t'));
    }
    done();
}
exports.changeVersion = changeVersion;
