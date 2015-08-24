/**
 * Watch changes configuration
 */
module.exports = {
    scripts: {
        files: [
            'assets/**/*.js',
            'assets/**/*.json'
        ],
        tasks: [
            'compass',
            'clean',
            'copy',
            'concat',
            'cssmin',
            'uglify'
        ],
        options: {
            spawn: false,
            interrupt:true
        }
    },
    content: {
        files: [
            'assets/views/**/*.php',
            'assets/views/**/*.html',
            'assets/js/templates/**/*.html'
        ],
        tasks: [
            'copy'
        ],
        options: {
            spawn: false,
            interrupt:true
        }
    },
    css: {
        files: ['master/**/*.scss'],
        tasks: [
            'compass',
            'clean',
            'copy',
            'concat',
            'cssmin',
            'uglify'
        ],
        options: {
            spawn: false,
            interrupt:true
        }
    },
    images: {
        files: ['**/*.{png,jpg,gif}'],
        tasks: [
            'copy'
        ],
        options: {
            spawn: false,
            interrupt:true
        }
    }
};