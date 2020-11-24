

const {src, dest, series, watch} = require('gulp'),
      gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const gulpAtoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const include = require('gulp-file-include');

const sync = require('browser-sync').create();
const gulpImagemin = require('gulp-imagemin');
const gulpLivereload = require('gulp-livereload');
const gulpMinify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');




function html() {
  return src('src/**.html')
  .pipe(include({
    prefix: '@@'
  }))
  .pipe(dest('dist'))
    
}

function scss() {
  return src('src/scss/**.scss')
  .pipe(sass())
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 versions'],
    cascade: false
  }))
  .pipe(csso())
  .pipe(concat('index.css'))
  .pipe(dest('dist'))
}

function minJs() {
  return src('src/js/**.js')
      .pipe(gulpMinify({
          ext: {
              min: '.min.js'
          },
          ignoreFiles: ['-min.js']
      }))
      .pipe(dest('dist'))
}

function imgMin() {
  src('src/img/*')
  .pipe(gulpImagemin())
  .pipe(dest('dist/img'))
}

function serve() {
  sync.init({
    server: './dist'
  })
  watch('src/**.html', series(html)).on('change', sync.reload)
  watch('src/parts/**.html', series(html)).on('change', sync.reload)
  watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
}

exports.build = series(scss, html, minJs, imgMin)
exports.serve = series(scss, html, serve)
// exports.html = html
// exports.scss = scss
