//Adiciona os modulso instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

//Função para compilar o SASS e adicionar os prefixos
function compilaSass(){
    return gulp
    .src('css/scss/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
        browser: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
}

//Tarefa de gulp para função de SASS
gulp.task('sass', compilaSass);

//Função para juntar op JS
function gulpJS(){
    return gulp
    .src('js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js/'))
}

gulp.task('mainjs', gulpJS);

// Função para iniciar o browser
function browser(){
    browserSync.init({
        server: {
            baseDir:"./"
        }
    });
}

//Tarefa para iniciar o browser-sync
gulp.task('browser-sync', browser);

// Função de watch do gulp
function watch() {
    gulp.watch('css/scss/*.scss', compilaSass)
    gulp.watch(['js/*.js', '!js/main.js'], gulpJS)
    gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
}

//Inicia a tarefa de watch
gulp.task('watch', watch);

//Tarefa padrão do gulp, que inicia o watch e o browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs'));

