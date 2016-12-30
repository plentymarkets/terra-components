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
var flatten = require('gulp-flatten');

var version;

gulp.task('npm-publish', function (callback) {

    runSequence(
        'gitInit',
        'gitFetch',
        'changeVersion',
        'gitCommit',
        'gitPull',
        'clean-dist',
        'gitPush',
        'compile-ts',
        'copy-files',
        'publish',
        callback
    );

});


gulp.task('build-local', function (callback) {

    gulp.src('dist/**/*.*').pipe(gulp.dest('../terra/node_modules/@plentymarkets/terra-components/'));

    runSequence(
        'compile-ts-locally',
        'copy-files-locally',
        callback
    );

});

//init git
gulp.task('gitInit', function () {
    git.init(function (err) {
        if (err) throw err;
    });

});

//fetch data
gulp.task('gitFetch', function () {

    git.fetch('origin', '', function (err) {
        if (err) throw err;
    });

});

//changing version of package.json for new publish
gulp.task('changeVersion', function () {

    var json = JSON.parse(fs.readFileSync('./package.json'));

    console.log('-------------------------------------------------');
    console.log('--- OLD PACKAGE VERSION: ' + json.version + ' ---');

    //possible values are: patch, minor, major
    json.version = "1.0.0-test.04"; //semver.inc(json.version, 'patch');

    version = json.version;

    console.log('--- NEW PACKAGE VERSION: ' + json.version + ' ---');
    console.log('-------------------------------------------------');

    fs.writeFileSync('./package.json', JSON.stringify(json, null, '\t'));

});

//commit version changes
gulp.task('gitCommit', function () {

    return gulp.src('./*')
        .pipe(gitignore())
        .pipe(git.commit('update version to ' + version));
});

gulp.task('gitPull', function () {

    git.pull('origin', ['stable7'], function (err) {
        if (err) {
            throw err;
        }
        else {
            gulp.watch('publish');
        }
    });

});

gulp.task('clean-dist', function () {
    return del(config.tsOutputPath);
});

//push version changes
gulp.task('gitPush', function () {

    git.push('origin', 'stable7', function (err) {
        if (err) throw err;
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
        .pipe(tsc(tsProject));

    return merge([
        tsResult.dts.pipe(gulp.dest(config.tsOutputPath)),
        tsResult.js.pipe(sourcemaps.write('.')).pipe(gulp.dest(config.tsOutputPath))
    ]);
});

//copy files to dist
gulp.task('copy-files', function () {
    gulp.src(config.allCSS)
        .pipe(gulp.dest(config.tsOutputPath));

    gulp.src(config.allFonts)
        .pipe(flatten())
        .pipe(gulp.dest(config.fontsOutputPath));

    gulp.src(config.allImages)
        .pipe(flatten())
        .pipe(gulp.dest(config.imagesOutputPath));

    gulp.src(config.allSCSS)
        .pipe(gulp.dest(config.tsOutputPath));

    gulp.src(config.allHTML)
        .pipe(gulp.dest(config.tsOutputPath));

    gulp.src(['package.json', 'README.md'])
        .pipe(gulp.dest(config.tsOutputPath));
});

//publish to npm
gulp.task('publish', shell.task([
    'npm publish dist'
]));


gulp.task('compile-ts-locally', function () {

    var sourceTsFiles = [

        config.excluded,
        config.allTs
    ];

    var tsResult =
        gulp.src(sourceTsFiles)
            .pipe(sourcemaps.init())
            .pipe(tsc(tsProject));

    return merge([
        tsResult.dts
            .pipe(gulp.dest(config.tsOutputPath)),
        tsResult.js
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.tsOutputPath))
    ]);
});

gulp.task('copy-files-locally', function () {

    gulp.src(config.allCSS)
        .pipe(gulp.dest(config.tsOutputPath));

    gulp.src(config.allFonts)
        .pipe(flatten())
        .pipe(gulp.dest(config.fontsOutputPath));

    gulp.src(config.allImages)
        .pipe(flatten())
        .pipe(gulp.dest(config.imagesOutputPath));

    gulp.src(config.allSCSS)
        .pipe(gulp.dest(config.tsOutputPath));

    gulp.src(config.allHTML)
        .pipe(gulp.dest(config.tsOutputPath));

    gulp.src(['package.json', 'README.md'])
        .pipe(gulp.dest(config.tsOutputPath));
});
