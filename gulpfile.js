/*
 * Run `gulp` to build the files and watch for changes.
 */

var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var changed = require("gulp-changed");

// Paths
var jsSourcePath = "src";
var jsDestinationPath = "./static/js/";
var cssPath = "static/css";
var imagesDir = "app/assets/images";
var imagesTargetDir = "public/static/images";

gulp.task('browserify', function () {
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src(['./src/main.js'])
        .pipe(changed(jsDestinationPath))
        .pipe(browserified)
        .pipe(uglify())
        .pipe(gulp.dest('./static/js/bundle.js')
    );
});

gulp.task("default", ["browserify"]);
