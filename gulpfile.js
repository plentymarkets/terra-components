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
var path = require('path');

var version, level, sequence, subversion;

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
 *
 **/
gulp.task('build', function(callback)
{
    level = argv.level ? argv.level : 'patch';
    sequence = argv.publish ? 'npm-publish' : 'build-local';
    subversion = argv.subversion ? argv.subversion : '';
    
    runSequence(sequence, callback);
});

gulp.task('npm-publish', function (callback)
{
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
        'copy-fonts',
        'copy-images',
        'copy-lang',
        'publish',
        callback
    );
});

gulp.task('build-local', function (callback)
{
    runSequence(
        'clean-dist',
        'compile-ts',
        'copy-files',
        'copy-fonts',
        'copy-images',
        'copy-lang',
        'copy-to-target',
        callback
    );
});


//init git
gulp.task('gitInit', function ()
{
    git.init(function (err)
             {
                 if(err)
                 {
                     throw err;
                 }
             });
});

//fetch data
gulp.task('gitFetch', function ()
{
    git.fetch('origin', '', function (err)
    {
        if(err)
        {
            throw err;
        }
    });
});

//changing version of package.json for new publish
gulp.task('changeVersion', function ()
{
    var json = JSON.parse(fs.readFileSync('./package.json'));
    
    console.log('-------------------------------------------------');
    console.log('--- OLD PACKAGE VERSION: ' + json.version + ' ---');
    
    json.version = json.version.replace('-'+subversion, '');
    
    //possible values are: patch, minor, major
    json.version = semver.inc(json.version, level);
    
    json.version += '-' + subversion;
    
    version = json.version;
    
    console.log('--- NEW PACKAGE VERSION: ' + json.version + ' ---');
    console.log('-------------------------------------------------');
    
    return fs.writeFileSync('./package.json', JSON.stringify(json, null, '\t'));
});

//commit version changes
gulp.task('gitCommit', function ()
{
    return gulp.src('./*')
               .pipe(gitignore())
               .pipe(git.commit('update version to ' + version));
});

gulp.task('gitPull', function ()
{
    return git.pull('origin', ['stable7'], function (err)
    {
        if(err)
        {
            throw err;
        }
    });
    
});

gulp.task('clean-dist', function ()
{
    return del(config.tsOutputPath);
});

//push version changes
gulp.task('gitPush', function ()
{
    git.push('origin', 'stable7', function (err)
    {
        if(err)
        {
            throw err;
        }
    });
});

//compile typescript files
gulp.task('compile-ts', function ()
{
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
gulp.task('copy-files', function ()
{
    return gulp.src(['package.json',
                     'README.md',
                     config.allCSS,
                     config.allSCSS,
                     config.allHTML])
               .pipe(gulp.dest(config.tsOutputPath));
});

//copy fonts to dist
gulp.task('copy-fonts', function ()
{
    return gulp.src(config.allFonts)
               .pipe(gulp.dest(config.fontsOutputPath));
});

//copy images to dist
gulp.task('copy-images', function ()
{
    return gulp.src(config.allImages)
               .pipe(gulp.dest(config.imagesOutputPath));
});

//copy lang to dist
gulp.task('copy-lang', function ()
{
    return gulp.src(config.allLang)
               .pipe(gulp.dest(config.langOutputPath));
});

//copy files from dist to defined directory
gulp.task('copy-to-target', function ()
{
    var target = argv.target || '/workspace/terra';
    return gulp.src('dist/**/*.*')
        .pipe(
            gulp.dest( path.join( target, '/node_modules/@plentymarkets/terra-components/' ) )
        );
});

//publish to npm
gulp.task('publish', shell.task([
                                    'npm publish dist'
                                ])
);