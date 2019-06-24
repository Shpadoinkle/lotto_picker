module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                files: {
                    'src/App.css': 'src/style.less'
                }
            }
        },
        watch: {
            files: ['src/style.less'],
            tasks: ['less']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less']);
};