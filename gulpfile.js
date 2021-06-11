const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function compilaSass(){
    return gulp
    .src('css/scss/*.scss')
    .pipe(sass({output: 'compressed'}))
    .pipe(autoprefixer({
        browser: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('css/'))
}

gulp.task('sass', compilaSass);

function browser(){
    browserSync.init({
        server: {
            baseDir:"./"
        }
    })
}

function watch() {
    gulp.watch('css/scss/*.scss', compilaSass)
}

gulp.task('default', watch);

