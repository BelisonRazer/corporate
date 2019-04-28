'use strict';

const ignore = require('gulp-ignore');
const gulp = require('gulp');
const gulps = require('gulp-series');
const stylus = require('gulp-stylus');
const less = require('gulp-less');
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const newer = require('gulp-newer'); // filtered new file
const browserSync = require('browser-sync').create();
const autoprefixer  = require('gulp-autoprefixer');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles_less', function () {
    return gulp.src('styles/main.less')
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(less())
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
        .pipe(gulp.dest('public'))
});

gulp.task('clean', function () {
    return del('public');
});

gulp.task('assets', function () {
    return gulp.src('assets/**', {since: gulp.lastRun("assets")})
        .pipe(newer('public'))
        .pipe(debug({title: 'assets'}))
        .pipe(gulp.dest('public'));
});

gulp.task('images', function () {
   return gulp.src(['blocks/header/**/*.*', '!blocks/**/**/styles/*'], {since: gulp.lastRun("images")})
       .pipe(ignore.exclude('./styles/**/*'))
       .pipe(newer('public'))
       .pipe(debug({title: 'header'}))
       .pipe(gulp.dest('public/blocks/header'))
});

gulp.task('images2', function () {
    return gulp.src(['blocks/platform/**/*.*', '!blocks/**/**/styles/*'], {since: gulp.lastRun("images")})
        .pipe(ignore.exclude('./styles/**/*'))
        .pipe(newer('public'))
        .pipe(debug({title: 'platform'}))
        .pipe(gulp.dest('public/blocks/platform'))
});

gulp.task('images3', function () {
    return gulp.src(['common/**/**/*.*', '!common/**/styles/*'], {since: gulp.lastRun("images")})
        .pipe(ignore.exclude('./styles/**/*'))
        .pipe(newer('public'))
        .pipe(debug({title: 'common'}))
        .pipe(gulp.dest('public/common'))
});

gulp.task('images4', function () {
    return gulp.src(['blocks/features/**/*.*', '!blocks/**/**/styles/*'], {since: gulp.lastRun("images")})
        .pipe(ignore.exclude('./styles/**/*'))
        .pipe(newer('public'))
        .pipe(debug({title: 'features'}))
        .pipe(gulp.dest('public/blocks/features'))
});

gulp.task('images5', function () {
    return gulp.src(['blocks/presentation/**/*.*', '!blocks/**/**/styles/*'], {since: gulp.lastRun("images")})
        .pipe(ignore.exclude('./styles/**/*'))
        .pipe(newer('public'))
        .pipe(debug({title: 'presentation'}))
        .pipe(gulp.dest('public/blocks/presentation'))
});

gulp.task('images6', function () {
    return gulp.src(['blocks/clients/**/*.*', '!blocks/**/**/styles/*'], {since: gulp.lastRun("images")})
        .pipe(ignore.exclude('./styles/**/*'))
        .pipe(newer('public'))
        .pipe(debug({title: 'clients'}))
        .pipe(gulp.dest('public/blocks/clients'))
});

gulp.task('images7', function () {
    return gulp.src(['blocks/features-two/**/*.*', '!blocks/**/**/styles/*'], {since: gulp.lastRun("images")})
        .pipe(ignore.exclude('./styles/**/*'))
        .pipe(newer('public'))
        .pipe(debug({title: 'features-two'}))
        .pipe(gulp.dest('public/blocks/features-two'))
});

gulp.task('images8', function () {
    return gulp.src(['blocks/registration/**/*.*', '!blocks/**/**/styles/*'], {since: gulp.lastRun("images")})
        .pipe(ignore.exclude('./styles/**/*'))
        .pipe(newer('public'))
        .pipe(debug({title: 'registration'}))
        .pipe(gulp.dest('public/blocks/registration'))
});

gulp.task('images9', function () {
    return gulp.src(['blocks/footer/**/*.*', '!blocks/**/**/styles/*'], {since: gulp.lastRun("images")})
        .pipe(ignore.exclude('./styles/**/*'))
        .pipe(newer('public'))
        .pipe(debug({title: 'footer'}))
        .pipe(gulp.dest('public/blocks/footer'))
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles_less', 'assets'), 'images9', 'images8', 'images7', 'images6', 'images5',
    'images4', 'images3', 'images2', 'images'));

//                          Инкрементальная сборка

gulp.task('watch', function () {
    gulp.watch('styles/**/*.*', gulp.series('styles_less'));
    gulp.watch('**/styles/*.*', gulp.series('styles_less'));
    gulp.watch('**/**/styles/*.*', gulp.series('styles_less'));
    gulp.watch('assets/**/*.*', gulp.series('assets'));
    gulp.watch('**/images/**/*.*', gulp.series('images9', 'images8', 'images7', 'images6', 'images5', 'images4', 'images3', 'images2', 'images'));
    gulp.watch('**/**/images/**/*.*', gulp.series('images9', 'images8', 'images7', 'images6', 'images5', 'images4', 'images3', 'images2', 'images'));
    gulp.watch('**/**/**/images/**/*.*', gulp.series('images9', 'images8', 'images7', 'images6', 'images5', 'images4', 'images3', 'images2', 'images'));
});

gulp.task('serve', function () {
    browserSync.init({server: 'public'})
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

browserSync.watch('public/**/*.*').on('change', browserSync.reload);