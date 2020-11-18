const gulp = require('gulp');
const gulpIf = require('gulp-if');
const cleaner = require('gulp-clean');
const gulpSass = require('gulp-sass');
const jsConcat = require('gulp-concat');
const jsUglify = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const beautify = require('gulp-beautify');
const rename = require('gulp-rename');
const jsInclude = require('gulp-include');
const htmlMinify = require('gulp-htmlmin');
const sourceMaps = require('gulp-sourcemaps');
const cssExtend = require('gulp-autoprefixer');
const htmlPartial = require('gulp-html-partial');
const browserSync = require('browser-sync').create();
const isProduction = process.env.NODE_ENV === 'prod';

function html() {
    return gulp.src('src/*.html')
        .pipe(htmlPartial({
            basePath: 'src/includes/'
        }))
        .pipe(gulpIf(isProduction, htmlMinify({
            collapseWhitespace: true
        })))
        .pipe(gulp.dest('docs'));
}

function css() {
    return gulp.src('src/sass/style.scss')
        .pipe(sourceMaps.init())
        .pipe(gulpSass({
            includePaths: ['node_modules']
        }).on('error', gulpSass.logError))
        .pipe(gulpIf(isProduction, cleanCSS()))
        .pipe(cssExtend({
            cascade: false
        }))
        .pipe(beautify.css({
            indent_size: 2
        }))
        .pipe(sourceMaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('docs/css/'));
}

function js() {
    return gulp.src('src/js/*.js')
        .pipe(sourceMaps.init())
        .pipe(jsInclude({
            extensions: 'js',
            hardFail: true,
            separateInputs: true
        }))
        .on('error', console.log)
        .pipe(beautify.js({
            indent_size: 2
        }))
        .pipe(jsConcat('main.js'))
        .pipe(gulpIf(isProduction, jsUglify()))
        .pipe(sourceMaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('docs/js'));
}

function images() {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('docs/images/'));
}

function serve() {
    browserSync.init({
        open: true,
        server: './docs'
    });
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function watchFiles() {
    gulp.watch('src/**/*.html', gulp.series(html, browserSyncReload));
    gulp.watch('src/**/*.scss', gulp.series(css, browserSyncReload));
    gulp.watch('src/**/*.js', gulp.series(js, browserSyncReload));
    gulp.watch('src/images/**/*.*', gulp.series(images));
    return;
}

function del() {
    return gulp.src('docs/*', {read: false})
        .pipe(cleaner());
}

exports.css = css;
exports.html = html;
exports.js = js;
exports.del = del;
exports.serve = gulp.parallel(html, css, js, images, watchFiles, serve);
exports.default = gulp.series(del, html, css, js, images);