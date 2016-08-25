var path = require('path');
var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var gulpRename = require('gulp-rename');
var gulpUglify = require('gulp-uglify');
var gulpWebpack = require('webpack-stream');
var gulpDelete = require('del');

/* Convert sass files into css files */
gulp.task('task-css', function() {
    return gulp.src(path.join(__dirname, '/frontend/sass/*.scss'))
                        .pipe( gulpSass().on('error', gulpSass.logError) )
                        .pipe( gulp.dest(path.join(__dirname, '/frontend/')) );
});

/* Concatenate (bundle together) all JS files. Then, minify the concatenated JS file with the uglify webpack loader.
 * Save the bundled and minified file in the "dist" folder.
 * Run this task only after 'task-css' has been completely performed.
 */
gulp.task('task-js', ['task-css'] , function() {
    // the gulp entry point is a dummy entry point because we're using entry points defined
    // in webpack.config.js.
    return gulp.src(path.join(__dirname, '/frontend/js/*.js'))
               .pipe( gulpWebpack(require(path.join(__dirname, '/webpack.config.js'))) )
               .pipe( gulpRename({suffix: '.bundle'}) )
               .pipe( gulp.dest(path.join(__dirname, '/public/')) );

});

/* Run the cleaning task only after task.js has been performed.
 */
gulp.task('task-cleaning', ['task-js'] , function() {
    return gulpDelete([
        // remove the styleCombo.bundle.js generated in webpack.config.js as a
        // byproduct of generating the styleCombo.bundle.css
        path.join(__dirname, '/public/styleCombo.bundle.js'),
        path.join(__dirname, '/frontend/style.css')
    ]);
});

/* All Set! */
gulp.task('default', ['task-css', 'task-js', 'task-cleaning']);
