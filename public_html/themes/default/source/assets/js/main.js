/**
 * @ngdoc class
 * @name app
 * @id app
 * @requires one-net
 * @param {string} carl is awesome
 * @property {string} dave is cool
 * @description
 * Main GetSocial module
 * Depended on `clip-two` module
 * @todo please add project dependencies to parent module `one-net`
 */
var app = angular.module('OneNetApp', ['one-net']);

/**
 * @ngdoc run
 * @name app:main
 * @memberOf app
 * @requires $rootScope
 * @requires $state
 * @requires $stateParams
 * @description On app run event
 * This will be sets a default scope values
 */
app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    // URLs
    $rootScope.baseUrl   = app.baseUrl;
    $rootScope.sourceUrl = app.sourceUrl;
    $rootScope.jsUrl     = app.jsUrl;
    $rootScope.viewsUrl  = app.viewsUrl;

    // Set some reference to access them from any scope
    $rootScope.$state       = $state;
    $rootScope.$stateParams = $stateParams;

    // GLOBAL APP SCOPE
    // set below basic information
    $rootScope.app = {
        name: 'OneNet App',
        author: 'Hatem Ismail',
        description: 'Just testing task!',
        version: '1.0',
        year: ((new Date()).getFullYear()),
        isMobile: (function () {
            var check = false;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                check = true;
            };
            return check;
        })()
    };
}]);

/**
 * @ngdoc config
 * @name app:translate
 * @memberOf app
 * @description
 * This will be sets a translate configuration
 */
app.config(['$translateProvider', function ($translateProvider) {
    // prefix and suffix information  is required to specify a pattern
    // You can simply use the static-files loader with this pattern:
    $translateProvider.useStaticFilesLoader({
        prefix: 'themes/default/assets/i18n/',
        suffix: '.json'
    });

    // Since you've now registered more then one translation table, angular-translate has to know which one to use.
    // This is where preferredLanguage(langKey) comes in.
    $translateProvider.preferredLanguage('ar_EG');

    // Store the language in the local storage
    $translateProvider.useLocalStorage();
}]);

/**
 * @ngdoc config
 * @name app:RestangularProvider
 * @memberOf app
 * @description Configure
 * This will be sets default REST configuration
 */
app.config(['RestangularProvider', function(RestangularProvider) {
    //-- Base URL
    RestangularProvider.setBaseUrl(GS_VARS.PUBLIC_URL+'/api/v1.0');

    //-- Default Headers
    //##-> Send XSRF
    RestangularProvider.setDefaultHeaders({
        'X-XSRF-TOKEN': GS_VARS._TOKEN
    });
}]);

/**
 * @ngdoc config
 * @name app:Restangular
 * @memberOf app
 * @description
 * This will be sets REST configuration with scope default values
 */
app.run(["$rootScope", "Restangular", function($rootScope, Restangular) {
    $rootScope.xhr_count = 0;
    Restangular.addRequestInterceptor(function(element) {
        $rootScope.xhr_count++;
        $rootScope.xhr = ($rootScope.xhr_count > 0);
        return element;
    });
    Restangular.addResponseInterceptor(function(data) {
        $rootScope.xhr_count--;
        $rootScope.xhr = ($rootScope.xhr_count > 0);
        return data;
    });
    //-- Apply
    $rootScope.$watch('xhr', function() {
        if(!$rootScope.$$phase) $rootScope.$apply();
    });
}]);