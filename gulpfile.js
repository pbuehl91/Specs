'use strict';

const gulp = require('gulp'),
    bump = require('gulp-bump'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    debug = require('gulp-debug'),
    gzip = require('gulp-gzip'),
    minifyCss = require('gulp-clean-css'),
    path = require('path'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    tar = require('gulp-tar'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    //typings = require('typings'),
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
const DIST_JS_LIB_PATH = path.join(DIST_JS_PATH, 'lib');
const DIST_STATIC_PATH = path.join(DIST_PATH, '*.{ico,html,js}');

//TypeScript
const TS_EXT = path.join('**', '*.ts');
const TS_SRC = path.join(JS_PATH, TS_EXT);

/*
 *  Automated gulp tasks
 */
gulp.task('build', build); //build app
gulp.task('clean', clean); //clean dist files
gulp.task('dev', ['start','watch']);
gulp.task('html', html);
gulp.task('htmlCache', htmlCache);
gulp.task('htmlPackage', htmlPackage);
gulp.task('htmlTemplate', htmlTemplate); //dynamically set src files
gulp.task('start', start); //build app and start server
gulp.task('transpile', transpile.bind(null, TS_SRC, DIST_JS_PATH)); //transpiles typescript into js and puts it in dist
gulp.task('watch', watch); //will watch for changes in files and redeploy

function build(done) {
    runSequence('clean', ['html', 'htmlTemplate', 'static', 'styles', 'transpile'], done);
}

function clean() {
    return gulp.src([
        DIST_STYLES_PATH,
        DIST_IMAGES_PATH,
        DIST_STATIC_PATH,
        '!' + DIST_JS_LIB_PATH,
        path.join(DIST_JS_PATH, '*')
    ]).pipe(vinylPaths(del));
}

function html(done) {
    runSequence('htmlCache', 'htmlPackage', done);
}

function htmlCache(done) {
    return gulp.src(HTML_PATH)
        .pipe(templateCache('tpl.ts', {
            module: 'Specs.Templates',
            standalone: true,
            moduleSystem: 'IIFE'
        })).pipe(gulp.dest(DIST_JS_PATH));
}

function htmlPackage() {
    return merge(transpile('dist/scripts/tpl.ts', 'dist/scripts'), del('dist/scripts/tpl.ts'));
}

function htmlTemplate(done) {
    var includes;

    var sources = function(paths) {
        var tmp = [];
        var tpl = '<script src="%s"></script>';

        paths.forEach(src => {
            tmp.push(tpl.replace('%s'), src)
        });
        return tmpl
    };

    includes = sources(['scripts/lib/system.js',
        'jspm_config.js'])
    includes.push('<script>System.import("specs")</script>');

    return gulp.src(path.join('specs', 'index.html'))
        .pipe(template({
            scripts: includes.join('')
        }))
        .pipe(gulp.dest(DIST_PATH));
}

function start(done) {
    runSequence('build', 'server', done);
}

function staticTask() {
    return merge([
        gulp.src([STATIC_PATH, '!' + path.join(SPECS_FOLDER, 'index.html')])
            .pipe(gulp.dest(DIST_PATH)),
        gulp.src(IMAGES_PATH)
            .pipe(gulp.dest(DIST_IMAGES_PATH)),
            htmlTemplate()
    ])
    .pipe(connect.reload());
}

function styles() {
    return gulp.src(path.join(STYLES_PATH, '**', '*.scss'))
        .pipe(sass())
        .pipe(concat('specs.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(DIST_STYLES_PATH))
        .pipe(connect.reload());
}

function transpile(src, dest) {
    var glob = [src, 'typings'];
}

function watch() {
    console.log('passive');
}