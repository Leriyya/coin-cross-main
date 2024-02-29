var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-dart-sass'),
    fileinclude = require('gulp-file-include'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    rigger = require('gulp-rigger'),
    rename = require("gulp-rename"),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    imageminMozJpeg = require('imagemin-mozjpeg'),
    imageminPngQuant = require('imagemin-pngquant'),
    notify = require('gulp-notify'),
    babel = require('gulp-babel'),
    terser = require('gulp-terser'),
    CacheBuster = require('gulp-cachebust'),
    gaze = require('gaze');

var cachebust = new CacheBuster();

var path = {
        source: {
            scss: 'src/scss/styles.scss',
            normalize_css: 'src/scss/vendor/normalize.scss',
            swiper_css: 'src/scss/vendor/swiper.scss',
            js: 'src/js/*.js',
            vendor_js: 'src/js/vendor/*.js',
            html: 'src/*.html',
            i: 'src/i/**/*.+(jpg|png|svg|ico)',
            docs: 'src/docs/**/*.+(pdf)'
        },

        build: {
            css: 'build/css/',
            js: 'build/js/',
            vendor_js: 'build/js/vendor/',
            html: 'build/',
            i: 'build/i',
            docs: 'build/docs/'
        }
    }
;

var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'
    })
};

gulp.task('scss', function () {
  return gulp.src(path.source.scss)
    .pipe(sass())
    .pipe(prefixer())
    .pipe(rename({ suffix: ".min"}))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(cachebust.resources())
    .pipe(gulp.dest(path.build.css));
});

gulp.task('normalize_css', function () {
  return gulp.src(path.source.normalize_css)
    .pipe(sass())
    .pipe(prefixer())
    .pipe(rename({ suffix: ".min"}))
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.build.css));
});

gulp.task('swiper_css', function () {
  return gulp.src(path.source.swiper_css)
    .pipe(sass())
    .pipe(prefixer())
    .pipe(rename({ suffix: ".min"}))
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.build.css));
});

gulp.task('js', function () {
  return gulp.src(path.source.js)
    .pipe(fileinclude({
        prefix: '@@',
        basepath: 'src/js/'
    }))
    .pipe(babel({
        presets: ['@babel/preset-env'],
    }))
    .pipe(terser({
    }))
    .pipe(rename({ suffix: ".min"}))
    .pipe(cachebust.resources())
    .pipe(gulp.dest(path.build.js));
});

gulp.task('vendor_js', function () {
  return gulp.src(path.source.vendor_js)
    .pipe(gulp.dest(path.build.vendor_js));
});

gulp.task('html', function() {
    return gulp.src(path.source.html)
        .pipe(rigger())
        .pipe(cachebust.references())
        .pipe(gulp.dest(path.build.html));
});

gulp.task('img', function () {
  return gulp.src(path.source.i)
    .pipe(plumber(plumberErrorHandler))
    .pipe(changed(path.build.i))
    .pipe(
        imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imageminMozJpeg({ quality: 85 }),
        imageminPngQuant({ quality: [0.9, 1] }),
        imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
        })
       ])
     )
    .pipe(gulp.dest(path.build.i));
});


gulp.task('docs', function () {
    return gulp.src(path.source.docs)
        .pipe(gulp.dest(path.build.docs));
});

//+----------------------  MAIN TASKS  ------------------------+//

gulp.task('build',
    gulp.series(gulp.parallel('html', 'scss', 'normalize_css', 'js', 'img', 'vendor_js', 'swiper_css', 'docs'))
);


gulp.task('watch', function () {
    // Watch all files
    gaze('src/scss/**/*.scss', function(err, watcher) {
        this.on('all', gulp.series('scss'));
        this.on('all', gulp.series('html'));
    });
    gaze('src/**/*.html', function(err, watcher) {
        this.on('all', gulp.series('html'));
    });
    gaze('src/js/**/*.js', function(err, watcher) {
        this.on('all', gulp.series('js'));
        this.on('all', gulp.series('html'));
    });
    gaze('src/i/**/*.*', function(err, watcher) {
        this.on('all', gulp.series('img'));
    });
});

gulp.task('default',  gulp.series('build', 'watch')); //, 'server'

