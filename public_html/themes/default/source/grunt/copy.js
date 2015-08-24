module.exports = {
    main: {
        files: [
            {expand: true, src: "**", cwd: 'bower_components/bootstrap/fonts', dest: "../assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/font-awesome/fonts', dest: "../assets/css/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/font-awesome/fonts', dest: "../assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/themify-icons/fonts', dest: "../assets/css/fonts"},
            {expand: true, src: "**", cwd: 'assets/i18n',    dest: "../assets/i18n"},
            {expand: true, src: "**", cwd: 'assets/images',     dest: "../assets/images"},
            {expand: true, src: "**", cwd: 'assets/js/config',      dest: "../assets/js/config"},
            {expand: true, src: "**", cwd: 'assets/js/directives',      dest: "../assets/js/directives"},
            {expand: true, src: "**", cwd: 'assets/js/controllers',      dest: "../assets/js/controllers"},
            {expand: true, src: "**", cwd: 'assets/js/filters',      dest: "../assets/js/filters"},
            {expand: true, src: "**", cwd: 'assets/js/services',      dest: "../assets/js/services"},
            {expand: true, src: "**", cwd: 'assets/js/templates',     dest: "../assets/js/templates"},
            {expand: true, src: "**", cwd: 'assets/views',     dest: "../assets/views"},
            {expand: true, src: "**", cwd: 'assets/css/themes',     dest: "../assets/css/themes"},
            {src: 'master/_layout.min.php', dest : '../layouts/default.php'}
        ]
    }
};
