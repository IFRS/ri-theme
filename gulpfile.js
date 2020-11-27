const autoprefixer         = require('autoprefixer');
const babel                = require('gulp-babel');
const csso                 = require('gulp-csso');
const del                  = require('del');
const gulp                 = require('gulp');
const path                 = require('path');
const pixrem               = require('pixrem');
const postcss              = require('gulp-postcss');
const sass                 = require('gulp-sass');
const sourcemaps           = require('gulp-sourcemaps');
const uglify               = require('gulp-uglify');
const webpack              = require('webpack');

var webpackPlugins = [];

gulp.task('clean', async function() {
    return await del(['dist/']);
});

gulp.task('sass', function() {
    let postCSSplugins = [
        require('postcss-flexibility'),
        pixrem(),
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
    .pipe(gulp.dest('dist/lib/'));
});

gulp.task('styles', gulp.series('sass', function css() {
    return gulp.src(['dist/lib/*.css'])
    .pipe(csso())
    .pipe(gulp.dest('dist/lib/'));
}));

gulp.task('webpack', function(done) {
    webpack({
        mode: 'production',
        devtool: 'source-map',
        entry: {
            'script-ie': './src/script-ie.js',
            'script': './src/script.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist/lib'),
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
    return gulp.src(['dist/lib/*.js'])
    .pipe(babel({
        presets: [
            [
                "@babel/env",
                { "modules": false }
            ]
        ]
    }))
    .pipe(uglify({
        ie8: true,
    }))
    .pipe(gulp.dest('dist/lib/'));
}));

gulp.task('copy', function() {
    return gulp.src([
        'xmlui/**/*',
    ])
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('sass', 'webpack'), 'copy'));

gulp.task('build-production', gulp.series('clean', gulp.parallel('styles', 'scripts'), 'copy'));

gulp.task('default', gulp.series('build', function watch() {
    gulp.watch('sass/**/*.scss', gulp.series('sass'));

    gulp.watch('src/**/*.js', gulp.series('webpack'));

    gulp.watch('xmlui/**/*', gulp.series('dist'));
}));
