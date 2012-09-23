/*
 * grunt-contrib-stylus
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Eric Woroshow, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-contrib-stylus/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'tasks/*.js', '<config:nodeunit.tasks>']
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    stylus: {
      compile: {
        files: {
          'tmp/stylus.css': ['test/fixtures/stylus.styl'],
          'tmp/concat.css': ['test/fixtures/stylus.styl', 'test/fixtures/stylus2.styl'],
          'tmp/individual/*.css': ['test/fixtures/*.styl', 'test/fixtures/level2/*.styl']
        },
        options: {
          paths: ['test/fixtures/include'],
          compress: true
        }
      },
      flatten: {
        files: {
          'tmp/individual_flatten/*.css': ['test/fixtures/*.styl', 'test/fixtures/level2/*.styl']
        },
        options: {
          paths: ['test/fixtures/include'],
          compress: true,
          flatten: true
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tasks: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // The clean plugin helps in testing.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.renameTask('test', 'nodeunit');
  grunt.registerTask('test', 'clean stylus nodeunit');

  // By default, lint and run all tests.
  grunt.registerTask('default', 'lint test');
};