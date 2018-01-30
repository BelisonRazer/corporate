'use strict';
/*
const gulp = require('gulp');

gulp.task('hello', function (callback) {
    console.log('hello');
    callback();
});
*/

//remember кеширование цепочки обработки
//path создает абсолютный путь
//autoprefixer добавляет браузерные автопрефиксы
//cached исключение одинаковых файлов из потока
//cache кешит на диск
const gulp = require('gulp');
const gulps = require('gulp-series');

const stylus = require('gulp-stylus');
const less = require('gulp-less');
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const newer = require('gulp-newer'); // filtred new file
const browserSync = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles_less', function () {

    return gulp.src('frontend/styles_less/main.less')

        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(less())
        .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
        .pipe(gulp.dest('public'))

});

gulp.task('styles', function() {

    return gulp.src('frontend/styles/main.styl')

        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(stylus())
        .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
        .pipe(gulp.dest('public'));
});

gulp.task('clean', function () {
    return del('public');
});

gulp.task('assets', function () {
    return gulp.src('frontend/assets/**', {since: gulp.lastRun("assets")})
        .pipe(newer('public'))
        .pipe(debug({title: 'assets'}))
        .pipe(gulp.dest('public'));
});


gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'assets')));

//                          Инкрементальная сборка

gulp.task('watch', function () {

    gulp.watch('frontend/styles/**/*.*', gulp.series('styles'));
    gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
});

gulp.task('serve', function () {
    browserSync.init({server: 'public'})
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

browserSync.watch('public/**/*.*').on('change', browserSync.reload);



/*
gulp.task('styles', function() {

    let pipline =  gulp.src('frontend/styles/main.styl')

    if(isDevelopment) {
        pipline = pipline.pipe(sourcemaps.init());
    }

    pipline = pipline
        .pipe(stylus())

    if(isDevelopment) {
        pipline = pipline.pipe(sourcemaps.write('.'))
    }

    return pipline
        .pipe(gulp.dest('public'));
});
*/

/* var gulp = require('gulp');

gulp.task ('myTask', function(callback) {
    console.log('Hello');
    callback();
});

function nameVariant(callback) {
    console.log('it is work!');
    callback();
};

gulp.task('lol', nameVariant);
*/