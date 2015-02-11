module.exports = function (grunt) {
  require('time-grunt')(grunt);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: '',
        tasks: ['uglify'],
        opptions: {
          debounceDelay: 1000
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - <%= pkg.version %> */',
        preserveComments: 'some'
      },
      all: {
        files: {
          'dist/ParallaxGap.min.js': [
            'src/polyfills/*.js',
            'src/ParallaxGap.js'
          ]
        }
      }
    },

    jshint: {
      options: {
        nonew: true,
        jquery: true,
        validthis: true,
        curly: true,
        unused: true,
        noarg: true,
        loopfunc: true,
        forin: true,
        noempty: true,
        undef: true,
        bitwise: true,
        browser: true,
        devel: true,
        predef: ['module', 'require']
      },
      all: ['Gruntfile.js', 'src/*.js']
    },

    jscs: {
      src: ['Gruntfile.js', 'src/*.js'],
      options: {
        config: '.jscs.json'
      }
    },

    clean: ['dist']
  });

  grunt.registerTask('default', ['jshint', 'jscs', 'clean', 'uglify']);
};
