const { pipe, src, dest, watch, series, parallel } = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();

function concatCss() {
  return src("css/*.css")
    .pipe(plumber())
    .pipe(concat("styles.css"))
    .pipe(browserSync.stream())
    .pipe(dest("css"));
}

function transpileToScss() {
  return src(["scss/*.scss", "!scss/fonts.scss", "!scss/variables.scss"])
    .pipe(plumber())
    .pipe(sass())
    .pipe(browserSync.stream())
    .pipe(dest("css"));
}

function watching(done) {
  watch(["scss/*.scss"], series(transpileToScss, concatCss));
  watch(["./*.html"]).on("change", browserSync.reload);
}

exports.default = watching;
