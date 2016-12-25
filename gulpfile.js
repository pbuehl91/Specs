'use strict';

var gulp = require('gulp'),
    bump = require('gulp-bump'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    debug = require('gulp-debug'),
    gzip = require('gulp-gzip'),
    minifyCss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    tar = require('gulp-tar'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    typings = require('typings'),
    template = require('gulp-template'),
    templateCache = require('gulp-angular-templatecache'),
    tsd = require('tsd'),
    del = require('del');

/*
 *  Automated gulp tasks
 */
gulp.task('dev', ['start','watch']);
gulp.task('start', start); //build app and start server
gulp.task('watch', watch); //will watch for changes in files and redeploy

function start() {
    console.log('hecarim');
}

function watch() {
    console.log('passive');
}