/**
 * ejs.js
 *
 * EJSコンパイル,html構文チェック
 * - 構文チェックはPJルートにある.htmlhintrcに従う
 */
'use strict';

var gulp, $, fs, browserSync, cliOpts, config;
gulp = require('gulp');
$ = require('gulp-load-plugins')();
fs = require('fs');
browserSync = require('browser-sync').get('My Server');
cliOpts = require('../pass-arguments.js');
config = require('../config.js').ejs;

gulp.task('ejs', function(){
  var pageData
  pageData = JSON.parse(fs.readFileSync(config.json));
  return pageData.forEach(function(data, i) {
    return gulp.src(data.template)
      .pipe($.plumber({
        errorHandler: $.notify.onError("<%= error.message %>")
      }))
      .pipe($.ejs({pageData: data}))
      .pipe($.rename(data.url))
      .pipe(gulp.dest(config.dest))
      .pipe($.htmlhint('.htmlhintrc'))
      .pipe($.htmlhint.failReporter())
      .pipe(browserSync.stream());
  })
});
