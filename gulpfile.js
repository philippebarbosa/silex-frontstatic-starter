/**
 * Plugins
 */
var gulp         = require('gulp');
    sass         = require('gulp-sass'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    mqpacker     = require('css-mqpacker'),
    cleanCSS     = require('gulp-clean-css'),
    rename       = require("gulp-rename"),
    plumber      = require('gulp-plumber'),
    concat       = require('gulp-concat'),
    imageOptim   = require('gulp-imageoptim'),
    uglify       = require('gulp-uglify'),
    notify       = require("gulp-notify"),
    browserSync  = require('browser-sync').create(),
    reload       = browserSync.reload;


/**
 * PATHS
 */
var src  = 'app/assets/',
    dist = 'web/'

/**
 * CSS
 */
gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 2 version']}),
        mqpacker({
            sort: true
        })
    ];
    return gulp.src(src + 'scss/index.scss')
        .pipe(sass({ outputStyle : 'expanded' })
        .on('error', notify.onError("Error: <%= error.message %>")))
        .pipe(postcss(processors))
        .pipe(gulp.dest(src + 'css/')) // save a copy to assets
        .pipe(gulp.dest(dist + 'css/'))
        .pipe(browserSync.stream());
});

gulp.task('minify-css', function() {
  return gulp.src(src + 'css/index.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest(dist + 'css/'));
});

/**
 * JAVASCRIPT
 */

// compile
gulp.task('jsLibs', function() { // Concatenate all JS libs
    return gulp.src(src + 'js/plugins/*.js')
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest(dist + 'js/'));
});

gulp.task('jsScripts', function() { // Move main js script file
  gulp.src(src + 'js/index.js')
    .pipe(plumber())
    .pipe(rename('script.js'))
    .pipe(gulp.dest(dist + 'js/'))
    .pipe(browserSync.stream());
});

//build for prod
gulp.task('jsScriptsBuild', function() { // Move and minify main js script file
  gulp.src( src + 'js/index.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename('script.js'))
    .pipe(gulp.dest(dist + 'js/'));
});

gulp.task('jsLibsBuild', function() { // Concatenate and minify libs file
  return gulp.src(src + 'js/plugins/*.js')
    .pipe(concat('plugins.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist + 'js/'));
});

/**
 * Images
 */

gulp.task('images', function() {
    return gulp.src(src + 'img/**/*')
        .pipe(imageOptim.optimize())
        .pipe(gulp.dest(dist + 'img'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: ""
    });
});

 /**
 * TASKS
 */

// default task (development)
gulp.task('default', ['css', 'jsLibs', 'jsScripts', 'browser-sync'], function () {
    gulp.watch(src + 'scss/**/*.scss', ['css']);
    gulp.watch(src + 'js/**/*.js', ['jsScripts', 'jsLibs']);
    gulp.watch(src + 'img/**/*', ['images']);
    gulp.watch('app/templates/*.html.twig').on("change", reload);
});

// Build tasks
gulp.task( "prod", [ 'minify-css', 'jsLibsBuild', 'jsScriptsBuild'], function () {
    console.log("Build complete !");
});