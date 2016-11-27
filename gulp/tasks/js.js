/**
 * js.js
 *
 * 構文チェック,圧縮
 * - 構文チェックはPJルートにある.eslntrcに従う
 */
'use strict';

var gulp, $, browserSync, cliOpts, config;
gulp = require('gulp');
$ = require('gulp-load-plugins')();
browserSync = require('browser-sync').get('My Server');
cliOpts = require('../pass-arguments.js');
config = require('../config.js').js;

gulp.task('js', function(){
  return gulp.src(config.src)
    .pipe($.plumber({
      errorHandler: $.notify.onError("<%= error.message %>")
    }))
    .pipe($.cached('js'))
    .pipe($.eslint({
      useEslintrc: true
    }))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
    .pipe($.eslint.result(function(result){
      if (result.errorCount !== 0) {
        return;
      }
      gulp.src(result.filePath)
      .pipe($.if(cliOpts.isProduction, $.uglify(config.uglifyOption)))
      .pipe(gulp.dest(config.dest));
    }))
    .pipe(browserSync.stream());
});
