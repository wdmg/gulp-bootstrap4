'use strict';

let gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    cache = require('gulp-cache'),
    rimraf = require('gulp-rimraf'),
    plumber = require('gulp-plumber'),
    rigger = require('gulp-rigger'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-clean-css'),
    minifyJS = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    jpeg = require('imagemin-jpeg-recompress'),
    png = require('imagemin-pngquant');

let paths = {
    build: {
        html: './assets/',
        js: './assets/js/',
        css: './assets/css/',
        fonts: './assets/fonts/',
        images: './assets/images/'
    },
    src: {
        html: './src/*.html',
        js: './src/js/main.js',
        scss: './src/scss/style.scss',
        images: './src/images/**/*.*',
        fonts: './src/fonts/**/*.*'
    },
    watch: {
        html: './src/**/*.html',
        js: './src/js/**/*.js',
        scss: './src/scss/**/*.scss',
        fonts: './src/fonts/**/*.*',
        images: './src/images/**/*.*'
    },
    clean: './assets/*'
};

let config = {
    autoprefix: 'last 2 versions',
    sass: {
        outputStyle: 'expanded',
        sourceComments: 'map',
        sourceMap: 'sass',
        outputStyle: 'nested'
    },
    compress: {
        jpeg: {
            loops: 4,
            min: 72,
            max: 86,
            quality: 'high'
        },
        png: {
            strip: true,
            speed: 2,
            quality: 0.9
        },
        svg: {
            plugins: [{
                removeViewBox: true,
                cleanupIDs: false
            }]
        },
        gif: {
            interlaced: true
        }
    },
    web: {
        server: {
            baseDir: './assets'
        },
        notify: false
    }
};

gulp.task('clean', () => {
    cache.clearAll();
    return gulp.src(paths.clean, {
        read: false
    }).pipe(rimraf());
});

gulp.task('build:html', () => {
    return gulp.src(paths.src.html, {
            allowEmpty: true
        })
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(paths.build.html))
        .pipe(browserSync.stream());
});

gulp.task('build:js', () => {
    return gulp.src(paths.src.js, {
            allowEmpty: true
        })
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(paths.build.js))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.init())
        .pipe(minifyJS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.build.js))
        .pipe(browserSync.stream());
});

gulp.task('build:css', () => {
    return gulp.src(paths.src.scss, {
            allowEmpty: true
        })
        .pipe(plumber())
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(sass(config.sass))
        .pipe(autoprefix(config.autoprefix))
        .pipe(gulp.dest(paths.build.css))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.build.css))
        .pipe(browserSync.stream());
});

gulp.task('build:fonts', () => {
    return gulp.src(paths.src.fonts, {
            allowEmpty: true
        })
        .pipe(gulp.dest(paths.build.fonts))
        .pipe(browserSync.stream());
});

gulp.task('build:images', () => {
    return gulp.src(paths.src.images, {
            allowEmpty: true
        })
        .pipe(cache(imagemin([
            imagemin.gifsicle(config.compress.gif),
            jpeg(config.compress.jpeg),
            png(config.compress.png),
            imagemin.svgo(config.compress.svg)
        ])))
        .pipe(gulp.dest(paths.build.images))
        .pipe(browserSync.stream());
});

gulp.task('build',
    gulp.series('clean',
        gulp.parallel(
            'build:html',
            'build:js',
            'build:css',
            'build:fonts',
            'build:images'
        )
    )
);

gulp.task('watch', function () {
    browserSync(config.web);
    gulp.watch(paths.watch.html, gulp.series('build:html')).on('change', browserSync.reload);
    gulp.watch(paths.watch.js, gulp.series('build:js')).on('change', browserSync.reload);
    gulp.watch(paths.watch.scss, gulp.series('build:css')).on('change', browserSync.reload);
    gulp.watch(paths.watch.fonts, gulp.series('build:fonts')).on('change', browserSync.reload);
    gulp.watch(paths.watch.images, gulp.series('build:images')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series(
    'build',
    'watch'
));