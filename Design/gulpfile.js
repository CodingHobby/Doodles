var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create()

// SETUP BROWSERSYNC
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: __dirname
		}
	})
})

// SCSS COMPILATION AND STREAMING
gulp.task('styles', function () {
	return gulp.src(['style/style.sass'])
		.pipe(sass())
		.on('error', function (err) {
			console.log(err)
			this.emit('end')
		})
		.pipe(gulp.dest(__dirname))
		.pipe(browserSync.stream())
})

// SERVING THE BROWSER W/ WATCHES
gulp.task('serve', ['styles'], function () {
	browserSync.init({
		server: __dirname
	})
	gulp.watch('style/**/*.sass', ['styles']).on('change', browserSync.reload)
	gulp.watch('./index.html').on('change', browserSync.reload)
})

// DEFAULT GULP TASK
gulp.task('default', ['serve'])