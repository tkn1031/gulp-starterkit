'use strict';

var gulp, $, browserSync, requireDir, cliOpts, config;
gulp = require('gulp');
$ = require('gulp-load-plugins')();
browserSync = require('browser-sync').create('My Server');
requireDir = require('require-dir');
cliOpts = require('./gulp/pass-arguments.js');
config = require('./gulp/config.js');

// ディレクトリ内（サブディレクトリを含む）のタスクファイルを一括読込
requireDir('./gulp/tasks', {recurse: true});

// 一括ビルド
gulp.task('build', ['ejs', 'sass', 'js']);

// ファイル監視
gulp.task('watch', function(){
  gulp.watch(config.ejs.watch, ['ejs']);
  gulp.watch(config.sass.watch, ['sass']);
  gulp.watch(config.js.watch, ['js']);
});

// ローカルサーバー起動
gulp.task('server', function(){
  browserSync.init({
    server: {
      // PROJECT Root
      baseDir: './'
    }
  });
})

gulp.task('default', ['server', 'watch']);
