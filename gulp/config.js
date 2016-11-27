/**
 * config.js
 *
 * watchのpathは'./'から始めるとwatch中に追加したファイルが対象にならないので注意!
 */
module.exports = {
  ejs: {
    dest: './',
    json: './src/ejs/data/pages.json',
    watch: [
      'src/ejs/**/*.ejs',
      'src/ejs/data/pages.json'
    ]
  },
  sass: {
    src: ['./src/scss/**/*.scss'],
    dest: './dist/css',
    watch: ['src/scss/**/*.scss'],
    options: {
      outputStyle: 'expanded'
    },

    // ターゲットブラウザ指定
    target_browsers: [
      'ie >= 11',
      '> 5%'
    ],

    // 上記のターゲットブラウザで未対応のCSSの除外リスト
    ignore_css: [],

    // MAPSのCSSからの相対パス
    maps_dest: './maps'
  },
  js: {
    src: ['./src/js/**/*.js'],
    dest: './dist/js',
    watch: ['src/js/**/*.js'],
    uglifyOption: {
      preserveComments: 'license' // ライセンスコメントを残す
    }
  }
}
