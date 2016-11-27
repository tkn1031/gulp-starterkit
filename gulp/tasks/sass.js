/**
 * sass.js
 *
 * コンパイル,プレフィックス追加,並び替え,圧縮,ソースマップ出力
 * - CSSの並び替えはPJルートにある.csscomb.jsonに従う
 */
'use strict';

var gulp, $, browserSync, sassGraph, _, cliOpts, config;
gulp = require('gulp');
$ = require('gulp-load-plugins')();
browserSync = require('browser-sync').get('My Server');
sassGraph = require('sass-graph');
_ = require('lodash');
cliOpts = require('../pass-arguments.js');
config = require('../config.js').sass;

gulp.task('sass', function(){
  var baseDir, graph;
  baseDir = "src/scss/";
  graph = sassGraph.parseDir(baseDir);
  return gulp.src(config.src)
    .pipe($.cached('sass'))

    // パーシャルファイル更新時に、import元のファイルを処理対象にする
    .pipe($.flatmap(function(stream, file){
      var files, addParent;
      files = [file.path];
      addParent = function(childPath) {

        // パーシャルファイルのimport元をたどる
        return graph.visitAncestors(childPath, function(parent) {
          if (!_.includes(files, parent)) {
            files.push(parent);
          }
          return addParent(parent);
        });

      };
      addParent(file.path);
      return gulp.src(files, {
        base: baseDir
      });
    }))

    .pipe($.plumber({
      errorHandler: $.notify.onError("<%= error.message %>")
    }))
    .pipe($.sourcemaps.init())
    .pipe($.sass(config.options).on('error', $.sass.logError))
    .pipe($.postcss([
      require('doiuse')({
        browsers: config.target_browsers,
        ignore: config.ignore_css
      }),
      require('autoprefixer')({
        browsers: config.target_browsers
      })
    ]))

    // ソースマップがずれるので開発時は実行しない
    .pipe($.if(cliOpts.isProduction, $.csscomb()))

    .pipe($.if(cliOpts.isProduction, $.csso()))
    .pipe($.sourcemaps.write(config.maps_dest))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
