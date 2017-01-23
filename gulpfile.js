 /* jshint esversion: 6 */

 const gulp = require('gulp');
 const jasmineNode = require('gulp-jasmine-node');
 const open = require('gulp-open');
 const nodemon = require('gulp-nodemon');
 const browserSync = require('browser-sync');

 gulp.task('default', ['browser-sync', 'test', 'watch']);

 // Loads Jasmine Browser
 gulp.task('test', () => {
   gulp.src('jasmine/spec/*_spec.js').pipe(jasmineNode());
 });

 gulp.task('spec', () => {
   gulp.src('jasmine/specRunner.html').pipe(open());
 });

 gulp.task('watch', () => {
   gulp.watch('jasmine/spec/*_spec.js', ['spec']);
 });

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
