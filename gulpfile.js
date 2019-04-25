var gulp = require('gulp'),

    // jshint = require('gulp-jshint'),
    // uglify = require('gulp-uglify'),

    // concat = require('gulp-concat'),
    // rename = require('gulp-rename')

    autoprefix = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),

    browserSync = require('browser-sync'),
    del = require('del'),
    fileinclude = require('gulp-file-include');

// gulp.task('jshint', function() {
//     gulp.src('./js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

gulp.task('js', (callback) => {
    // 这里可以引入其他js库
    return gulp.src(['./js/*.js'])
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('less', (callback) => {
    // 其余的样式文件都由style.less引入
    let pipeStream = gulp.src(['./css/*.less'])
        .pipe(less())
        .pipe(autoprefix({
            browsers: ['last 2 versions'],
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
    console.log('less changed');
    return pipeStream;
    // callback();
});
gulp.task('html', () => {
  return gulp.src(['./page/*.html'])
    .pipe(fileinclude({
      prefix: '<!--@',
      suffix: '-->',
      basepath: './html_template'
    }))
    .pipe(gulp.dest('./dist/page/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});
gulp.task('img', () => {
  return gulp.src(['./img/**.*'])
    .pipe(gulp.dest('./dist/img/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});
gulp.task('browserSync', (callback) => {
    browserSync({
        server: {
            baseDir: ['./dist/']
        }
    })
});

// gulp.task('fileinclude', function() {
//   return gulp.src(['./page/*.html'])
//     .pipe(fileinclude({
//       prefix: '<!--@',
//       suffix: '-->',
//       basepath: './html_template'
//     }))
//     .pipe(gulp.dest('./dist/page/'));
// });

gulp.task('watch', (callback) =>  {
    console.log('starting watch');
    gulp.watch('./js/*.js', gulp.series('js'));

    gulp.watch('./css/*.less', gulp.series('less'));

    gulp.watch('./img/**.*', gulp.series('img'));
    gulp.watch(['./page/*.html', './html_template/*.html'], gulp.series('html')); // gulp.series(browserSync.reload)
    // gulp.watch(['./page/*.html', './html_template/*.html'], ['html'])
    //   .on('change', browserSync.reload);

    callback();
});

gulp.task('clean', (callback) =>  {
    // return gulp.src(['dist/css/', 'dist/js/'])
    //   .pipe(clean({allowEmpty: true}));
    return del(['dist/css/', 'dist/js/', 'dist/page/']);
    // callback();
});

gulp.task('build', gulp.series('clean', 'html', 'less', 'js', 'img'));

gulp.task("default", gulp.series('clean', 'less', 'js', 'img', 'html', 'watch', 'browserSync')); // ,