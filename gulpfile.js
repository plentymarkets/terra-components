var gulp = require('gulp');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var tsc = require('gulp-typescript');
var tsProject = tsc.createProject('./src/tsconfig.json', {typescript: require('typescript')});
var config = require('./gulp.config.js')();
var fs = require('fs');
var semver = require('semver');
var runSequence = require('run-sequence');
var git = require('gulp-git');
var gitignore = require('gulp-gitignore');
var shell = require('gulp-shell');
var version;

//build task
gulp.task('build', function (callback)
{
  runSequence('gitPull',
    callback);
});

//init git
gulp.task('gitInit', function ()
{
  console.log('------- INITIALIZING GIT -------');
  git.init(function (err)
  {
    if (err) throw err;
  });

  console.log('------- GIT INITIALIZED -------');
});

//fetch data
gulp.task('gitFetch', ['gitInit'], function()
{
  console.log('------- FETCHING DATA -------');

  git.fetch('origin', '', function (err)
  {
    if (err) throw err;
  });

  console.log('------- FETCHING DONE -------');
});

gulp.task('gitPull', ['gitCommit'], function()
{
  console.log('------- COMMITTING DONE -------');
  console.log('------- PULLING -------');

  git.pull('origin', ['stable7'], function (err)
  {
    if (err)
    {
      throw err;
    }
    else
    {
      gulp.run('publish');
    }
  });

  console.log('------- PULLING DONE -------');
});

//changing version of package.json for new publish
gulp.task('changeVersion', ['gitFetch'], function ()
{

  var json = JSON.parse(fs.readFileSync('./package.json'));

  console.log('------- OLD VERSION: ' + json.version + ' -------');
  console.log('-------------------------');
  console.log('------- CHANGING VERSION -------');

  //possible values are: patch, minor, major
  json.version = semver.inc(json.version, 'patch');

  version = json.version;

  console.log('------- VERSION CHANGED -------');
  console.log('-------------------------');
  console.log('------- WRITING PACKAGE.JSON -------');

  fs.writeFileSync('./package.json', JSON.stringify(json, null, '\t'));

  console.log('------- PACKAGE.JSON CHANGED -------');
});

//commit version changes
gulp.task('gitCommit', ['changeVersion'], function ()
{
  console.log('------- COMMITTING -------');

  return gulp.src('./*')
    .pipe(gitignore())
    .pipe(git.commit('update version to ' + version));
});

//push version changes
gulp.task('gitPush', ['clean-dist'], function ()
{
  console.log('------- PUSHING -------');

  git.push('origin', 'stable7', function (err)
  {
    if (err) throw err;
  });

  console.log('------- PUSHING DONE -------');
});

//compile typescript files
gulp.task('compile-ts', ['gitPush'], function ()
{

  console.log('------- COMPILING TYPESCRIPT FILES -------');
  var sourceTsFiles = [

    config.excluded,
    config.allTs
  ];

  var tsResult =
    gulp.src(sourceTsFiles, 'typings/globals/**/*.d.ts')
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

gulp.task('copy-files', ['compile-ts'], function ()
{
  gulp.src(config.allCSS)
      .pipe(gulp.dest(config.tsOutputPath));

  gulp.src(config.allHTML)
      .pipe(gulp.dest(config.tsOutputPath));

  gulp
      .src(['package.json', 'README.md'])
      .pipe(gulp.dest(config.tsOutputPath));
});

gulp.task('clean-dist', function ()
{
  return del(config.tsOutputPath);
});

//console log after typescript compile
//maybe add more tasks after this one
gulp.task('post-compile', ['copy-files'], function ()
{
  console.log('------- TYPESCRIPT FILES COMPILED -------');
});

//publish to npm
gulp.task('publish', ['post-compile'], shell.task([
  'npm publish dist'
]));
