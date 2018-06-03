"use strict";
var gulp = require("gulp");
var rename = require("gulp-rename");
var html_min = require("gulp-htmlmin");
var replace = require("gulp-replace");

gulp.task("template", function () {
    return gulp.src("template/*.dev.html")
        .pipe(rename(function (path) {
            path.basename = path.basename.slice(0, -4);
        }))
        .pipe(html_min({
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
            removeComments: true,
            decodeEntities: true
        }))
        .pipe(replace(/[\r\n]\ */g, ""))
        .pipe(gulp.dest("template"));
});

gulp.task("default", ["template"], function () {
    gulp.watch('template/*.dev.html', ["template"]);
});
