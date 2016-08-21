const gulp = require('gulp');
const useref = require('gulp-useref');
const del = require('del');

gulp.task('build', function () {
  gulp.src('index.html')
      .pipe(useref())
      .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  del(['dist/**/*']);
});

gulp.task('copy', function () {
  gulp.src(['favicon.ico'])
      .pipe(gulp.dest('dist'));

  gulp.src(['web/img/*'])
      .pipe(gulp.dest('dist/web/img'));

  gulp.src(['content/*'])
      .pipe(gulp.dest('dist/content'));

  gulp.src(['../app/dist/**'])
    .pipe(gulp.dest('dist/app'));
});

gulp.task('default', ['clean', 'build', 'copy']);
