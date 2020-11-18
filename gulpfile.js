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
        .pipe(gulp.dest('assets'));
}

function sass() {
    return gulp.src('src/sass/style.scss')
        .pipe(sourceMaps.init())
        .pipe(gulpSass({
            includePaths: ['node_modules']
        }).on('error', gulpSass.logError))
        .pipe(cssExtend({
            cascade: false
        }))
        .pipe(beautify.css({
            indent_size: 2
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('assets/css/'));
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
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('assets/js'));
}

function js_minify() {
    return gulp.src(['assets/js/*.js', '!assets/js/*.min.js'])
        .pipe(sourceMaps.init())
        .pipe(jsUglify())
        .pipe(sourceMaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/js'));
}

function css_minify() {
    return gulp.src(['assets/css/*.css', '!assets/css/*.min.css'])
        .pipe(sourceMaps.init())
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(sourceMaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/css'));
}

function minify() {
    return gulpIf(isProduction, js_minify()) && gulpIf(isProduction, css_minify());
}

function images() {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('assets/images/'));
}

function serve() {
    browserSync.init({
        open: true,
        server: './assets'
    });
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function watchFiles() {
    gulp.watch('src/**/*.html', gulp.series(html, browserSyncReload));
    gulp.watch('src/**/*.scss', gulp.series(sass, browserSyncReload));
    gulp.watch('src/**/*.js', gulp.series(js, browserSyncReload));
    gulp.watch('src/images/**/*.*', gulp.series(images));
    return;
}

function cleanup() {
    return gulp.src('assets/*', {read: false})
        .pipe(cleaner());
}

exports.js = js;
exports.sass = sass;
exports.html = html;
exports.cleanup = cleanup;
exports.js_minify = js_minify;
exports.css_minify = css_minify;
exports.minify = gulp.parallel(js_minify, css_minify);
exports.serve = gulp.parallel(html, sass, js, minify, images, watchFiles, serve);
exports.default = gulp.series(cleanup, html, sass, js, minify, images);