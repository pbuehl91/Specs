'use strict';

var gulp = require('gulp'),
    bump = require('gulp-bump'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect',)
    debug = require('gulp-debug'),
    gzip = require('gulp-gzip'),
    minifyCss = require('gulp-minify-css'),
    protractor = require('gulp-protractor'),
    sass = require('gulp-sass'),
    tar = require('gulp-tar'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    typings = require('typings'),
    template = require('gulp-template'),
    tsd = require('tsd'),
    del = require('del'),
    browserSync = require('browser-sync');