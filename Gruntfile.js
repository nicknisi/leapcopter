'use strict';

module.exports = function (grunt) {
    // Project configuration
    grunt.initConfig({
        watch: {
            client: {
                options: {
                    livereload: true
                },
                files: 'src/Leapcopter/client/**/*.js',
                tasks: []
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task
    grunt.registerTask('default', ['watch']);
};
