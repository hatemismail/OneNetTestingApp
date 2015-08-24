/**
 * Pre Grunt Configuration
 * @param grunt
 */
module.exports = function(grunt) {
	var gtx = require('gruntfile-gtx').wrap(grunt);

    gtx.loadAuto();

    var gruntConfig = require('./grunt');
    gruntConfig.package = require('./package.json');

    gtx.config(gruntConfig);

    /**
     * Minimal Build for app
     */
    gtx.alias('build:app',
        [
            'compass',
            'clean',
            'copy',
            'concat',
            'cssmin',
            'uglify'
        ]
    );

    gtx.alias('release',
        [
            'bower-install-simple',
            'build:dev',
            'bump-commit'
        ]
    );

    gtx.finalise();

    grunt.registerTask('kill', function() {
        process.exit(1);
    });
};
