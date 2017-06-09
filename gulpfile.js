var gulp = require('gulp');

var paths = {
  vendor: ['bower_components/angular/angular.min.js', 'bower_components/ng-file-upload/ng-file-upload-all.min.js', 'bower_components/angular-messages/angular-messages.min.js', 'bower_components/jquery/dist/jquery.min.js'],
  dest: 'public/vendor/'
};

gulp.task('copy-vendor', [], function () {
  // move vendor scripts
  return gulp.src(paths.vendor)
    .pipe(gulp.dest(paths.dest));
});

gulp.task('default', ['copy-vendor'], function () {
});