/**
 * Created by sammy on 7/13/16.
 */
 "use strict";

var es = require('event-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var fs = require('fs');
var _ = require('lodash');
var babel = require("gulp-babel");


var scripts = require('./app.scripts.json');

var source = {
    js: {
        src: [
            // main module
            'app/app.js',

            // module files
            'app/**/module.js',

            // other js files [controllers, services, etc.]
            'app/**/!(module)*.js'
        ],
        tpl: 'app/**/*.tpl.html'
    }
};

var destinations = {
    js: 'build'
};


gulp.task('build', function(){
    return es.merge(gulp.src(source.js.src) , getTemplateStream())
        .pipe(ngAnnotate())
        .pipe(babel({
          "presets": ["es2015"],
          "plugins": ["transform-async-to-generator"]
        }))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(destinations.js));
});

gulp.task('js', function(){
    return es.merge(gulp.src(source.js.src) , getTemplateStream())
        .pipe(concat('app.js'))
        .pipe(babel({
            "presets": ["es2015"],
            "plugins": ["transform-async-to-generator"]
        }))
        .pipe(gulp.dest(destinations.js));
});

gulp.task('watch', function(){
    gulp.watch(source.js.src, ['js']);
    gulp.watch(source.js.tpl, ['js']);
});

gulp.task('vendor', function(){
    _.forIn(scripts.chunks, function(chunkScripts, chunkName){
        var paths = [];
        chunkScripts.forEach(function(script){
            var scriptFileName = scripts.paths[script];

            if (!fs.existsSync(__dirname + '/' + scriptFileName)) {

                throw console.error('Required path doesn\'t exist: ' + __dirname + '/' + scriptFileName, script);
            }
            paths.push(scriptFileName);
        });
        gulp.src(paths)
            .pipe(concat(chunkName + '.js'))
            //.on('error', swallowError)
            .pipe(gulp.dest(destinations.js));
    });

});

gulp.task('prod', ['vendor', 'build']);
gulp.task('dev', ['vendor', 'js', 'watch']);
gulp.task('default', ['dev']);

var swallowError = function(error){
    console.log(error.toString());
    this.emit('end');
};

var getTemplateStream = function () {
    return gulp.src(source.js.tpl)
        .pipe(templateCache({
            root: 'src/',
            module: 'app'
        }));
};
