/**
 * ************************************
 * PLUGINS
 * ************************************
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
    uglify       = require('gulp-uglify');





/**
 * ************************************
 * PATHS
 * ************************************
 */
var src  = 'app/assets/',
    dist = 'web/'





/**
 * ************************************
 * CSS
 * ************************************
 */

// Compile CSS
gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 2 version']}),
        mqpacker({
            sort: true
        })
    ];
    return gulp.src(src + 'scss/index.scss')
        .pipe(sass({ outputStyle : 'expanded' }).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest(src + 'css/')) // save a copy to assets
        .pipe(gulp.dest(dist + 'css/'));
});

// Minify CSS
gulp.task('minify-css', function() {
  return gulp.src(src + 'css/index.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest(dist + 'css/'));
});





/**
 * ************************************
 * JAVASCRIPT
 * ************************************
 */

// Concatenate all librairies
gulp.task('jsLibs', function() {
    return gulp.src(src + 'js/plugins/*.js')
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest(dist + 'js/'));
});

// Move main script file to dist
gulp.task('jsScripts', function() {
  gulp.src(src + 'js/index.js')
    .pipe(plumber())
    .pipe(rename('scripts.js'))
    .pipe(gulp.dest(dist + 'js/'));
});

// Minify and move script file to dist
gulp.task('jsScriptsBuild', function() {
  gulp.src( src + 'js/index.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename('scripts.js'))
    .pipe(gulp.dest(dist + 'js/'));
});

// Concatenate and minify librairies to dist
gulp.task('jsLibsBuild', function() {
  return gulp.src(src + 'js/plugins/*.js')
    .pipe(concat('plugins.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist + 'js/'));
});


/**
 * ************************************
 * IMAGES
 * ************************************
 */
gulp.task('images', function() {
    return gulp.src(src + 'img/**/*')
        .pipe(imageOptim.optimize())
        .pipe(gulp.dest(dist + 'img'));
});

 /**
 * TASKS
 */

// default task (development)
gulp.task('default', ['css', 'jsLibs', 'jsScripts'], function () {
    gulp.watch(src + 'scss/**/*.scss', ['css']);
    gulp.watch(src + 'js/**/*.js', ['jsScripts', 'jsLibs']);
    gulp.watch(src + 'img/**/*', ['images']);

});

// Build tasks
gulp.task( "prod", [ 'minify-css', 'jsLibsBuild', 'jsScriptsBuild'], function () {
    console.log("Build complete !");
});