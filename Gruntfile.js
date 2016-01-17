module.exports = function (grunt) {
    'use strict';
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);
    // measures the time each task takes
    require('time-grunt')(grunt);

    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;*/',
        // Task configuration
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        csslint: {
            strict: {
                options: {
                  import: 2
                },
            src: ['lib/**/*.css']
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                options: {
                    sourceMap: true
                    // sourceMapName: 'path/to/sourcemap.map'
                },
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }   
            }
        },
        jshint: {
            options: {
                // node: true,
                // curly: true,
                // eqeqeq: true,
                // immed: true,
                // latedef: true,
                // newcap: true,
                // noarg: true,
                // sub: true,
                // undef: true,
                // unused: true,
                // eqnull: true,
                // browser: true,
                globals: { jQuery: false },
                // boss: true
            },
            files: ['Gruntfile.js', 'lib/**/*.js'],
        },
        reload: {
          port: 35729
        },
        watch: {
            scripts: {
                options: {
                    livereload: true,
                    atBegin: true
                },
                files: ['<%= jshint.files %>', 'lib/**/*.css'],
                tasks: ['newer:jshint']
            },
        }
    });

    // Default task
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};

