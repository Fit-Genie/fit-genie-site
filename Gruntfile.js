'use strict';
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-concurrent');
  require('load-grunt-tasks')(grunt);


  var allJavascriptFilePaths = ['app/js/**/*.js', 'models/**/*.js', 'routes/**/*/js', 'server.js'];


  grunt.initConfig({
    clean: {
      dev: {
        src: ['build/']
      },
      dist: {
        src: ['dist/']
      }
    },
    copy: {
      dev: {
        expand: true,
        cwd: 'app/',
        src: ['*.html', 'css/*.css', 'views/*.html', 'img/*','fonts/*'],
        dest: 'build/',
        filter: 'isFile'
      }
    },
    sass: {
        dist: {
            options: {
                style: 'compressed'
            },
            files: {
                'app/css/main.css': 'app/sass/main.scss'
            }
        }
    },
    jscs: {
      src: allJavascriptFilePaths,
      options: {
        config: '.jscsrc'
      }
    },
    jshint: {
      all: allJavascriptFilePaths,
      options: {
        jshintrc: true
      }
    },
    browserify: {
      dev: {
        options: {
          transform: ['debowerify'],
          debug: true
        },
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      },
      angulartest: {
        options: {
          transform: ['debowerify'],
          debug: true
        },
        src: ['test/angular/**/*.js'],
        dest: 'test/angular-testbundle.js'
      }
    },
    simplemocha: {
      all: {
        src: ['test/mocha/api/**/*.js']
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: [ 'PhantomJS' ]
      }
    },
    express: {
      dev: {
        options: {
          port: 3000,
          script: 'server.js',
          background: false
        }
      }
    },
    watch: {
      css: {
        files: ['app/sass/*.scss'],
        tasks: ['sass','build'],

      },
      angulartest: {
        files: ['app/js/**/*.js', 'app/index.html', 'app/views/**/*.html'],
        tasks: ['browserify:angulartest', 'karma:unit'],
        options: {
          spawn: false
        }
      },
      express: {
        files: ['app/js/**/*.js', 'app/index.html', 'app/views/**/*.html', 'server.js', 'models/*.js', 'routes/*.js'],
        tasks: ['buildtest', 'express:dev'],
        options: {
          spawn: true
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/bundle.js': ['build/bundle.js']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'app/index.html'
        }
      }
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/css/',
          src: ['*.css'],
          dest: 'dist/css/'
        }]
      }
    },
    concurrent: {
        watching: {
            tasks: ['watch:express', 'watch:css', 'express:dev'],
            options: {
                logConcurrentOutput: true
            }
        }
    }
  });
  grunt.registerTask('style', ['jshint', 'jscs']);
  grunt.registerTask('build', ['clean:dev', 'sass' , 'browserify:dev', 'copy:dev']);
  // testing
  grunt.registerTask('angulartest', ['browserify:angulartest', 'karma:unit']);
  grunt.registerTask('angulartestwatch', ['test', 'watch:angulartest']);
  grunt.registerTask('test', ['style','angulartestwatch', 'simplemocha']);
  grunt.registerTask('buildtest', ['test', 'build']);
  grunt.registerTask('default', ['build','concurrent:watching']);


  // get ready for deploy
  grunt.registerTask('shrink', ['browserify:dev', 'uglify', 'htmlmin:dist', 'cssmin:dist']);
  grunt.registerTask('production', ['clean:dist', 'shrink']);


};
