/*jshint esversion: 6 */

const gulp = require('gulp'); //importing gulp node package
const open = require('gulp-open');
const jasmineNode = require('gulp-jasmine-node');
const livereload = require('gulp-livereload');

// Loads Jasmine Browser
gulp.task('test', function() {
  return gulp.src("jasmine/spec/*_spec.js").pipe(jasmineNode());
});

// Loads Jasmine Browser
gulp.task('browser', function() {
  return gulp.src("index.html").pipe(livereload());
});


gulp.task('watch', function() {
  livereload.listen();
  // Checks for change in the jasmine folder
  gulp.watch('jasmine/**/*.js', ['test']);

  //Checks for change in all html file in public
  gulp.watch('public/*.html', ['browser']);

  //Checks for change in all css file in public 
  gulp.watch('public/**/*.css', ['browser']);

  //Checks for change in all js file in public
  gulp.watch('public/js/*.js', ['browser']);
});

gulp.task('default', ['watch', 'browser', 'test']);
