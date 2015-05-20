var gulp = require("gulp");
var $ = require("gulp-load-plugins")({lazy: true});

gulp.task("help", $.taskListing);
gulp.task("tasks", $.taskListing);

gulp.task("default", ["ng-route-timing"]);

gulp.task("ng-route-timing", function () {
  gulp.src([
    "ng-route-timing/src/newrelic.module.js",
    "ng-route-timing/src/newrelic.service.js",
    "ng-route-timing/src/newrelic.init.js"
  ])
  .pipe($.concat("newrelic.js"))
  .pipe(gulp.dest("./ng-route-timing/dist/"));
});