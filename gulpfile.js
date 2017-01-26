 /* jshint esversion: 6 */

 const gulp = require('gulp');
 const jasmineNode = require('gulp-jasmine-node');
 const open = require('gulp-open');
 const nodemon = require('gulp-nodemon');
 const browserSync = require('browser-sync');

 gulp.task('default', ['browser-sync', 'test', 'watch']);

 // Runs jasmine spec tests
 gulp.task('test', () => {
   gulp.src('jasmine/spec/*_spec.js').pipe(jasmineNode());
 });

 // Loads jasmine browser 
 gulp.task('spec', () => {
   gulp.src('jasmine/specRunner.html').pipe(open());
 });

// Watch jasmine spec file and calls spec if any change is detected
 gulp.task('watch', () => {
   gulp.watch('jasmine/spec/*_spec.js', ['spec']);
 });

// Initializws browser sync and sets it to watch public files
// if change is detected, nodemon is called.
 gulp.task('browser-sync', ['nodemon'], () => {
   browserSync.init(null, {
     proxy: 'http://localhost:1337',
     files: ['public/**/*.*'],
     browser: 'google chrome',
     port: 5000,
   });
 });

 gulp.task('nodemon', (cb) => {
   let started = false;
   return nodemon({
     script: 'server.js',
   }).on('start', () => {
     if (!started) {
       cb();
       started = true;
     }
   });
 });
