const autoprefixer         = require('autoprefixer');
const babel                = require('gulp-babel');
const csso                 = require('gulp-csso');
const del                  = require('del');
const gulp                 = require('gulp');
const path                 = require('path');
const postcss              = require('gulp-postcss');
const sass                 = require('gulp-sass')(require('sass'));
const sourcemaps           = require('gulp-sourcemaps');
const uglify               = require('gulp-uglify');
const webpack              = require('webpack');

var webpackPlugins = [];

gulp.task('clean', async function() {
    return await del(['dist/']);
});

gulp.task('sass', function() {
    let postCSSplugins = [
        autoprefixer(),
    ];

    return gulp.src('sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: ['sass', 'node_modules'],
        outputStyle: 'expanded',
        precision: 6
    }).on('error', sass.logError))
    .pipe(postcss(postCSSplugins))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/lib/css/'));
});

gulp.task('styles', gulp.series('sass', function css() {
    return gulp.src(['dist/lib/css/*.css'])
    .pipe(csso())
    .pipe(gulp.dest('dist/lib/css/'));
}));

gulp.task('webpack', function(done) {
    webpack({
        mode: 'production',
        devtool: 'source-map',
        entry: {
            'script': './src/script.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist/lib/js/'),
            filename: '[name].js',
        },
        resolve: {
            alias: {
                jquery: 'jquery/src/jquery',
                bootstrap: 'bootstrap/dist/js/bootstrap.bundle',
            },
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
            }),
        ],
        optimization: {
            minimize: false,
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendors: false,
                    commons: {
                        name: "commons",
                        chunks: "initial",
                        minChunks: 1,
                    }
                },
            },
        },
        plugins: webpackPlugins,
    }, (err, stats) => {
        if (err) {
            console.error(err.details || err.stack || err);
        }
        if (stats && stats.hasErrors()) {
            console.error(stats.toString({
                colors: true
            }));
        };
        done();
    });
});

gulp.task('scripts', gulp.series('webpack', function js() {
    return gulp.src(['dist/lib/js/*.js'])
    .pipe(babel({
        presets: [
            [
                "@babel/env",
                { "modules": false }
            ]
        ]
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/lib/js/'));
}));

gulp.task('fonts', function() {
    return gulp.src(['fonts/**/*'])
    .pipe(gulp.dest('dist/lib/fonts/'));
});

gulp.task('images', function() {
    return gulp.src(['images/**/*'])
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('xsl', function() {
    return gulp.src(['xsl/**/*'])
    .pipe(gulp.dest('dist/lib/xsl/'));
});

gulp.task('copy', gulp.parallel('fonts', 'images', 'xsl', function xmlui() {
    return gulp.src([
        'xmlui/**/*',
    ])
    .pipe(gulp.dest('dist/'));
}));

gulp.task('build', gulp.series('clean', gulp.parallel('sass', 'webpack'), 'copy'));

gulp.task('build-production', gulp.series('clean', gulp.parallel('styles', 'scripts'), 'copy'));

gulp.task('default', gulp.series('build', function watch() {
    gulp.watch('sass/**/*.scss', gulp.series('sass'));

    gulp.watch('src/**/*.js', gulp.series('webpack'));

    gulp.watch('images/**/*', gulp.series('images'));

    gulp.watch('xsl/**/*', gulp.series('copy'));

    gulp.watch('xmlui/**/*', gulp.series('copy'));
}));
