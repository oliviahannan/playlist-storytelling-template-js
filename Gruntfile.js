module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		advSettings: grunt.file.readYAML('data/advancedSettings.yml'),

		jshint: {
			files: ['source/app/javascript/**/*.js'],
			options: {jshintrc: '.jshintrc'}
		},

		clean: {

			build: ['build/app/javascript/*'],
			jsLib: ['build/lib'],
			buildTools: ['build/resources/buildTools']

		},

		uglify: {
		},

		concat: {
			options: {
				separator: ';'
			},
			libIE: {
				src: ['source/lib/oldIE/**/*.js'],
				dest: 'build/app/javascript/oldIE.min.js'
			}
		},

		copy: {
			map: {
				files: [
					{
						expand: true,
						flatten: true,
						cwd: '',
						src: ['source/lib/**/*.map'],
						dest: 'build/app/javascript/'
					}
				]
			},
		},

		requirejs: {
			viewer: {
				options: {
					baseUrl: "source",
					paths: {
						'dojo': 'empty:',
						'esri': 'empty:',
						'dijit': 'empty:',
						'dojox': 'empty:',
						'storymaps': 'app/javascript',
						'lib': 'lib'
					},
					name: 'resources/buildTools/config/ConfigViewer',
					out: 'build/app/javascript/<%= advSettings.appIdentifier %>-viewer.min.js'
				}
			}
		}

	});

	// Load plugins.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task(s).
	grunt.registerTask('default', [

		'jshint',
		'clean:build',

		// Concat external libraries
		'concat:libIE',

		/*
		* Minify project JS using require.js
		* - require.js output a .js for with only the viewer and a .js with viewer and builder
		* - concat those .js with lib's JS
		* - perform production mode replacement in JS files
		*/
		'requirejs',
		'copy',
		'clean:jsLib',
		'clean:buildTools'

	]);

};