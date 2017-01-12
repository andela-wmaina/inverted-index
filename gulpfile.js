var gulp = require('gulp'); //importing gulp node package
var open = require('gulp-open');
var jasmineNode = require('gulp-jasmine-node');
var jasmineBrowser = require('gulp-jasmine-browser');


// Loads Jasmine Browser
gulp.task('jasmine', function() {
  return gulp.src("jasmine/spec/*_spec.js").pipe(jasmineNode());
});

// Loads Jasmine Browser
gulp.task('browser', function() {
  console.log('working');
  return gulp.src("index.html").pipe(open());
});


gulp.task('watch', function() {
  // Checks for change in the jasmine folder
  gulp.watch('jasmine/**/*.js', ['jasmine']);

  //Checks for change in all html file in public
  gulp.watch('public/*.html', ['browser']);

  //Checks for change in all css file in public 
  gulp.watch('public/**/*.css', ['browser']);

  //Checks for change in all js file in public
  gulp.watch('public/js/*.js', ['browser']);
});

gulp.task('default', ['watch', 'browser', 'jasmine']);
