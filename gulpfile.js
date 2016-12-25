'use strict';

const gulp = require('gulp'),
    bump = require('gulp-bump'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    debug = require('gulp-debug'),
    gzip = require('gulp-gzip'),
    minifyCss = require('gulp-minify-css'),
    path = require('path'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    tar = require('gulp-tar'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    typings = require('typings'),
    template = require('gulp-template'),
    templateCache = require('gulp-angular-templatecache'),
    tsd = require('tsd'),
    del = require('del'),
    vinylPaths = require('vinyl-paths');

/*
 *  File Structures
 */

//Source folders and paths
const ROOT = path.parse(process.cwd()).root;
const SPECS_FOLDER = 'specs';
const STYLES_PATH = path.join(SPECS_FOLDER, 'styles', '**');
const HTML_PATH = path.join(SPECS_FOLDER, '**', '*.tpl');
const IMAGES_PATH = path.join(SPECS_FOLDER, 'img', '*');
const JS_PATH = path.join(SPECS_FOLDER, '**', '*.tpl');
const STATIC_PATH = path.join(SPECS_FOLDER, '*.{ico,html,js}');

//Distributed folders and paths
const BUILDS = path.join('builds');
const DIST_PATH = 'dist';
const DIST_IMAGES_PATH = path.join(DIST_PATH, 'img');
const DIST_STYLES_PATH = path.join(DIST_PATH, 'styles');
const DIST_JS_PATH = path.join(DIST_PATH, 'scripts');
const DIST_JS_LIB_PATH = path.join(DIST_PATH, 'scripts');
const DIST_STATIC_PATH = path.join(DIST_PATH, 'scripts');

//TypeScript
const TS_EXT = path.join('**', '*.ts');
const TS_SRC = path.join(JS_PATH, TS_EXT);

/*
 *  Automated gulp tasks
 */
gulp.task('build', build); //build app
gulp.task('dev', ['start','watch']);
gulp.task('start', start); //build app and start server
gulp.task('watch', watch); //will watch for changes in files and redeploy

function build(done) {
    return runSequence('clean', ['html', 'htmlTemplate', 'static', 'styles', 'transpile'], done);
}

function clean() {
    console.log('hecarim');
}

function start(done) {
    runSequence('build', 'server', done);
}

function watch() {
    console.log('passive');
}