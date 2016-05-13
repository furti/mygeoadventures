var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  markdown = require('gulp-markdown'),
  nunjucksRender = require('gulp-nunjucks-render'),
  clientProject = ts.createProject('./src/client/tsconfig.json', {
    sortOutput: true
  }),
  serverProject = ts.createProject('./src/server/tsconfig.json', {
    sortOutput: true
  }),
  clientTarget = './target',
  serverTarget = './server',
  nunjucksOptions = {
    tags: {
      blockStart: '{%',
      blockEnd: '%}',
      variableStart: '&{',
      variableEnd: '}}',
      commentStart: '<#',
      commentEnd: '#>'
    }
  };

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
  './src/client/lib/angular_1_router.js',
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
    .pipe(gulp.dest(clientTarget));
});

gulp.task('ts', ['templates'], function() {
  var tsSources = clientProject.src()
    .pipe(nunjucksRender({
      ext: '.ts',
      path: ['./target/templates'],
      envOptions: nunjucksOptions
    }))
    .pipe(ts(clientProject)).js;


  return tsSources
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(clientTarget));
});

gulp.task('libcss', function() {
  return gulp.src([
      './node_modules/angular-material/angular-material.css',
      './src/client/style/material-icons.css'
    ])
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat('lib.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(clientTarget));
});

gulp.task('css', function() {
  return gulp.src([
      './src/client/style/**/*.css',
      '!./src/client/style/material-icons.css'
    ])
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(clientTarget));
});

gulp.task('font', function() {
  return gulp.src('./src/client/style/MaterialIcons-Regular.*')
    .pipe(gulp.dest(clientTarget));
});


gulp.task('pictures', function() {
  return gulp.src('./src/client/pictures/**/*')
    .pipe(gulp.dest(clientTarget + '/pictures'));
});

gulp.task('templates', ['markdown'], function() {
  return gulp.src('./src/client/**/*.html')
    .pipe(nunjucksRender({
      path: ['./target/content'],
      envOptions: nunjucksOptions
    }))
    .pipe(gulp.dest(clientTarget));
});

gulp.task('markdown', function() {
  return gulp.src('./src/client/content/**/*.md')
    .pipe(markdown({
      renderer: renderer
    }))
    .pipe(gulp.dest(clientTarget + '/content'));
});

gulp.task('projects', function() {
  gulp.src('./src/client/content/**/*.json')
    .pipe(gulp.dest(clientTarget + '/content'));
});

gulp.task('server', function() {
  var tsSources = serverProject.src()
    .pipe(ts(serverProject)).js;


  return tsSources
    .pipe(gulp.dest(serverTarget));
});

gulp.task('watch', ['ts', 'css', 'templates', 'projects', 'server'], function() {
  gulp.watch('./src/client/script/**.ts', ['ts']);
  gulp.watch('./src/client/style/**/*.css', ['css']);
  gulp.watch('./src/client/**/*.html', ['templates']);
  gulp.watch('./src/client/content/**/*.md', ['templates']);
  gulp.watch('./src/client/content/**/*.json', ['projects']);
  gulp.watch('./src/server/**.ts', ['server']);
});

gulp.task('build', ['libjs', 'ts', 'libcss', 'font', 'css', 'templates', 'pictures', 'projects', 'server']);
