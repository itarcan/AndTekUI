module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Variables
    dirs: {
      bower: 'bower_components',
      css: 'assets/css',
      fonts: 'assets/fonts',
      js: 'assets/js',
      images: 'assets/img',
      icons: 'assets/icons'
    },

    // SCSS
    sass: {
      dev: {
        options: {
          style: 'expanded',
          loadPath: '.'
        },
        files: {
          '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.scss'
        }
      },
      build: {
        options: {
          style: 'compressed',
          loadPath: '.'
        },
        files: {
          '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.scss'
        }
      }
    },

    // CSS autoprefixer
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        files: {
          '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.css'
        }
      }
    },

    // Copy
    copy: {
      main: {
        files: [
          { expand: true, cwd: '<%= dirs.bower %>/framework7/dist/css/', src: [ 'framework7.ios.css' ], dest: '<%= dirs.css %>/framework7', rename: function(dest) { return dest + '/framework7.ios.scss'; } },
          { expand: true, cwd: '<%= dirs.bower %>/framework7/dist/css/', src: [ 'framework7.ios.rtl.css' ], dest: '<%= dirs.css %>/framework7', rename: function(dest) { return dest + '/framework7.ios.rtl.scss'; } },
          { expand: true, cwd: '<%= dirs.bower %>/framework7/dist/css/', src: [ 'framework7.ios.colors.css' ], dest: '<%= dirs.css %>/framework7', rename: function(dest) { return dest + '/framework7.ios.colors.scss'; } },
          { expand: true, cwd: '<%= dirs.bower %>/framework7/dist/img/', src: [ '**' ], dest: '<%= dirs.images %>' },
          { expand: true, cwd: '<%= dirs.bower %>/fontawesome/fonts/', src: [ '**' ], dest: '<%= dirs.fonts %>' },
          { expand: true, cwd: '<%= dirs.bower %>/modernizr/', src: [ 'modernizr.js' ], dest: '<%= dirs.js %>', rename: function(dest) { return dest + '/modernizr.js'; } }
        ]
      }
    },

    // Concat
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          '<%= dirs.bower %>/jquery/dist/jquery.js',
          '<%= dirs.bower %>/framework7/dist/js/framework7.js',
          '<%= dirs.bower %>/console-log-viewer/index.js',
          '<%= dirs.js %>/*.js',
          '!<%= dirs.js %>/modernizr.js',
          '!<%= dirs.js %>/build.js'
        ],
        dest: '<%= dirs.js %>/build.js',
      },
    },

    // Imagemin
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%= dirs.images %>',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= dirs.images %>'
        }]
      }
    },

    // HTMLhint
    htmlhint: {
      html: {
        options: {
          'tag-pair': true
        },
        src: ['*.html']
      }
    },

    // JShint
    jshint: {
      all: [
        'Gruntfile.js',
        '<%= dirs.js %>/*.js',
        '!<%= dirs.js %>/modernizr.js',
        '!<%= dirs.js %>/build.js'
      ]
    },

    // Uglify
    uglify: {
      all: {
        files: {
          '<%= dirs.js %>/build.js': ['<%= dirs.js %>/build.js'],
          '<%= dirs.js %>/modernizr.js': ['<%= dirs.bower %>/modernizr/modernizr.js']
        }
      }
    },

    // Watch
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['<%= dirs.css %>/*.scss'],
        tasks: ['sass:dev', 'autoprefixer']
      },
      images: {
        files: ['<%= dirs.images %>/*.{png,jpg,gif}'],
        tasks: ['imagemin']
      },
      html: {
        files: ['*.html'],
        tasks: ['htmlhint']
      },
      scripts: {
        files: ['Gruntfile.js', '<%= dirs.js %>/*.js'],
        tasks: ['jshint', 'concat'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask('default', ['sass:build', 'autoprefixer', 'concat', 'uglify', 'imagemin']);
  grunt.registerTask('default', ['copy', 'sass:build', 'autoprefixer', 'concat', 'uglify']);
  grunt.registerTask('dev', ['watch']);
};
