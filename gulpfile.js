var gulp = require('gulp'); //importing gulp node package
var open =require('gulp-open');

gulp.task('default', ['watch']);


//triggers jasmine tests
gulp.task('tests', function(){
	gulp.src("jasmine/SpecRunner.html").pipe(open());
});

//watch changes on any jasmine js files
gulp.task('watch', function() {
  gulp.watch('jasmine/**/*.js', ['tests']);
});

// gulp.task('watch', function() {
//   gulp.watch('src/inverted-index.js', ['tests']);
// });

