const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const svgsprite = require('gulp-svg-sprite');
const autoprefixer = require('gulp-autoprefixer');
const uglifycss = require('gulp-uglifycss');
const uglify = require('gulp-uglify');
const inject = require('gulp-inject-string');

// Configuration
var configuration = {
    paths: {
        entry: './src/index.js',
        src: {
            html: './src/*.html',
            scripts: './src/scripts/*.js',
            fonts: [ './src/fonts/*.ttf',
                './src/fonts/*.woff',
                './src/fonts/*.woff2' ],
            images: './src/images/*.*',
            svgs: '.src/images/svg/*.svg',
            scss: ['./src/sass/*.scss',
                './src/sass/*css']
        },
        dist: './dist'
    }
};

// Gulp task to copy HTML files to output directory
function htmlTask(done) {
    gulp.src('build/images/symbol/svg/sprite.symbol.svg')
        .on('data', (data, error) => {
            const svgString = data.contents
                .toString();
            gulp.src(configuration.paths.src.html)
                .pipe(inject.replace('<!-- SVG SPRITES -->', svgString))
                .pipe(gulp.dest(configuration.paths.dist));
            gulp.src('./src/favicon.ico')
                .pipe(gulp.dest(configuration.paths.dist));
            gulp.src(configuration.paths.src.scripts)
                .pipe(uglify())
                .pipe(gulp.dest(configuration.paths.dist + '/scripts'));
            gulp.src(configuration.paths.src.fonts)
                .pipe(gulp.dest(configuration.paths.dist + '/fonts'));
            done();
        });
}
htmlTask.description = 'Copy HTML files to output';
gulp.task('html', htmlTask);

// Gulp task to create SVG sprites
function svgSpritesTask(done) {
    const svgConfig = {
        mode: {
            symbol: true,
            inline: true
        },
        svg: {
            xmlDeclaration: false,
            doctypeDeclaration: false,
            namespaceIDs: false,
            namespaceClassnames: false
        }
    };
    gulp.src('src/images/svg/*.svg')
        .pipe(svgsprite(svgConfig))
        .pipe(gulp.dest('build/images'));
    done();
}
svgSpritesTask.description = 'Create SVG sprites';
gulp.task('svgSprites', svgSpritesTask);

// Gulp task to generate CSS from SCSS files
function sassTask() {
    return gulp.src(configuration.paths.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(uglifycss({ maxLineLen: 80, expandVars: true }))
        .pipe(gulp.dest(configuration.paths.dist + '/css'));
};
sassTask.description = 'Preprocess scss files';
gulp.task('sass', sassTask);

gulp.task('sass:watch', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// Gulp clean task
function cleanTask() {
    return del([configuration.paths.dist.slice(2) + '/**/*']);
}
cleanTask.description = 'Clean dist folder';
gulp.task('clean', cleanTask);

// Gulp build task
gulp.task('build', gulp.series(['svgSprites', 'html', 'sass']));
