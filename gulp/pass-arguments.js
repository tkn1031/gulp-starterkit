/**
 * pass-argument.js
 *
 * コマンドライン引数から情報を取得
 */
'use strict';

var minimist, knownOptions, options, isProduction
minimist = require('minimist');

knownOptions = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'development'  // NODE_ENVに指定がなければモードを開発モードにする
  }
}
options = minimist(process.argv.slice(2), knownOptions);
isProduction = (options.env === 'production') ? true : false;

console.log('[build env]', options.env, '[is production]', isProduction);

module.exports = {
  "isProduction": isProduction
}
