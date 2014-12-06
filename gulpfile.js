var gulp       = require('gulp');
var webserver  = require('gulp-webserver');

var config = {
  host    : 'localhost',
  port    : '8080'
};

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      host:             config.host,
      port:             config.port,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('default', ['webserver']);
