'use strict';

/**
 * Config constant
 */
app.baseUrl   = GS_VARS.PUBLIC_URL+'/themes/default/';
app.sourceUrl = GS_VARS.PUBLIC_URL+'/themes/default/source/';
app.jsUrl     = GS_VARS.PUBLIC_URL+'/themes/default/assets/js/';
app.viewsUrl  = GS_VARS.PUBLIC_URL+'/themes/default/assets/views/';

/**
 * List of JS resources
 */
app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Controllers
        'HomeCtrl':    app.baseUrl+'assets/js/controllers/HomeCtrl.js',
        'ContactCtrl': app.baseUrl+'assets/js/controllers/ContactCtrl.js',

        //*** Services
        'CountriesSrv': app.baseUrl+'assets/js/services/CountriesSrv.js',

        //*** Filters
        //*** Directives
        //*** Plugins
        'sweet-alert': [
            app.baseUrl + 'source/bower_components/sweetalert/lib/sweet-alert.min.js',
            app.baseUrl + 'source/bower_components/sweetalert/lib/sweet-alert.css'
        ],
        'moment': [app.baseUrl+'source/bower_components/moment/min/moment.min.js'],
        'moment-ar': [app.baseUrl+'source/bower_components/moment/locale/ar-sa.js']
    },

    //*** angularJS Modules
    modules: [
        {
            name: 'oitozero.ngSweetAlert',
            files: [app.baseUrl+'source/bower_components/angular-sweetalert-promised/SweetAlert.min.js']
        },
        {
            name: 'truncate',
            files: [app.baseUrl+'source/bower_components/angular-truncate/src/truncate.js']
        },
        {
            name: 'angularMoment',
            files: [app.baseUrl+'source/bower_components/angular-moment/angular-moment.min.js']
        },
        {
            name: 'angularMomentHijri',
            files: [app.baseUrl+'source/bower_components/angular-moment-hijri/angular-moment-hijri.js']
        }
    ]
});