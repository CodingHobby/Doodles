var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var sass = require('gulp-sass')

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {
	browserSync.init({
		server: __dirname
	})

	gulp.watch("style/*.sass", ['sass']).on('change', browserSync.reload)
	gulp.watch("*.html").on('change', browserSync.reload)
})

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
	return gulp.src("style/style.sass")
		.pipe(sass())
		.pipe(gulp.dest(__dirname))
		.pipe(browserSync.stream())
})

gulp.task('default', ['serve'])