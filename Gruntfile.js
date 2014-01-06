'use strict';

module.exports = function (grunt) {
    // Project configuration
    grunt.initConfig({
        watch: {
            reload: {
                options: {
                    livereload: true
                },
                files: 'src/Leapcopter/**/*.js',
                tasks: []
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task
    grunt.registerTask('default', ['watch']);
};
