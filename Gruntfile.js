module.exports = function( grunt ) {
	require( 'matchdep' ).filterDev( [ 'grunt-*' ] ).forEach( grunt.loadNpmTasks );

	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		browserify: {
			dev: {
				options: {
					browserifyOptions: {
						debug: true
					},
					// The watch task will do this instead.
					// keepAlive: true,
					watch: true
				},
				files: {
					'js/bundle.dev.js': [ 'js/main.js' ]
				}
			},
			build: {
				files: {
					'js/bundle.js': [ 'js/main.js' ]
				}
			}
		},
		compress: {
			options: {
				mode: 'gzip',
				level: 9
			},
			js: {
				files: {
					'js/bundle.min.js.gz': [ 'js/bundle.min.js' ]
				}
			},
			css: {
				files: {
					'css/bundle.min.css.gz': [ 'css/bundle.min.css' ]
				}
			}
		},
		cssmin: {
			build: {
				files: {
					'css/bundle.min.css': [ 'css/bundle.css' ]
				}
			}
		},
		env: {
			dev: {
				NODE_ENV: 'development'
			},
			build: {
				NODE_ENV: 'production'
			}
		},
		jshint: {
			options: grunt.file.readJSON( '.jshintrc' ),
			grunt: {
				src: [ 'Gruntfile.js' ],
				options: {
					node: true
				}
			},
			cjs: {
				src: [ 'js/**/*js', '!js/*.js', '!js/components/tinymce/theme.js' ],
				options: {
					browserify: true
				}
			}
		},
		jsvalidate:{
			build: {
				src: [ 'js/bundle.min.js' ]
			}
		},
		uglify: {
			// options: {
			// 	sourceMap: true
			// },
			build: {
				files: {
					'js/bundle.min.js': [ 'js/bundle.js' ]
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			js: {
				files: 'js/bundle.dev.js'
			},
			css: {
				files: 'css/**/*.css'
			},
			php: {
				files: [ 'plugin.php', 'WP-API/**/*.php' ]
			}
		}
	} );

	grunt.registerTask( 'default', [
		'env:dev',
		'browserify:dev',
		'watch'
	] );

	grunt.registerTask( 'build', [
		'env:build',
		'jshint',
		'browserify:build',
		'uglify:build',
		'jsvalidate:build',
		'cssmin:build',
		'compress'
	] );
};
