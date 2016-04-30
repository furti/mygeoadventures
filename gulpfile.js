var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  markdown = require('gulp-markdown'),
  nunjucksRender = require('gulp-nunjucks-render'),
  tsconfig = require('./tsconfig.json'),
  tsProject = ts.createProject('./tsconfig.json', {
    sortOutput: true
  });

var renderer = new markdown.marked.Renderer();
renderer.link = function(href, title, text) {
  var link = '<a href="' + href + '"';

  if (title !== 'self') {
    link += 'target="_blank"';
  }

  link += '>' + text + '</a>';

  return link;
};

var libSources = [
  './node_modules/es6-shim/es6-shim.js',
  './node_modules/angular/angular.js',
  './node_modules/@angular/router/angular1/angular_1_router.js',
  './node_modules/angular-animate/angular-animate.js',
  './node_modules/angular-aria/angular-aria.js',
  './node_modules/angular-messages/angular-messages.js',
  './node_modules/angular-material/angular-material.js',
];

gulp.task('libjs', function() {
  return gulp.src(libSources)
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(concat('lib.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(tsconfig.compilerOptions.outDir));
});

gulp.task('ts', function() {
  var tsSources = tsProject.src()
    .pipe(ts(tsProject)).js;


  return tsSources
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(tsconfig.compilerOptions.outDir));
});

gulp.task('libcss', function() {
  return gulp.src([
      './node_modules/angular-material/angular-material.css',
      './src/style/material-icons.css'
    ])
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat('lib.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(tsconfig.compilerOptions.outDir));
});

gulp.task('css', function() {
  return gulp.src([
      './src/style/**/*.css',
      '!./src/style/material-icons.css'
    ])
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(tsconfig.compilerOptions.outDir));
});

gulp.task('font', function() {
  return gulp.src('./src/style/MaterialIcons-Regular.*')
    .pipe(gulp.dest(tsconfig.compilerOptions.outDir));
});


gulp.task('pictures', function() {
  return gulp.src('./src/pictures/**/*')
    .pipe(gulp.dest(tsconfig.compilerOptions.outDir + '/pictures'));
});

gulp.task('templates', ['markdown'], function() {
  return gulp.src('./src/**/*.html')
    .pipe(nunjucksRender({
      path: ['./target/content']
    }))
    .pipe(gulp.dest(tsconfig.compilerOptions.outDir));
});

gulp.task('markdown', function() {
  return gulp.src('./src/content/**/*.md')
    .pipe(markdown({
      renderer: renderer
    }))
    .pipe(gulp.dest(tsconfig.compilerOptions.outDir + '/content'));
});

gulp.task('watch', ['ts', 'css', 'templates'], function() {
  gulp.watch(tsconfig.compilerOptions.rootDir + '/**.ts', ['ts']);
  gulp.watch('./src/style/**/*.css', ['css']);
  gulp.watch('./src/**/*.html', ['templates']);
  gulp.watch('./src/content/**/*.md', ['templates']);
});

gulp.task('build', ['libjs', 'ts', 'libcss', 'font', 'css', 'templates', 'pictures']);
