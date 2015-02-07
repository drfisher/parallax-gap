module.exports = function (grunt) {
	require('time-grunt')(grunt);
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');

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

		clean: ['dist']
	});
	grunt.registerTask('default', ['clean', 'uglify']);
};
