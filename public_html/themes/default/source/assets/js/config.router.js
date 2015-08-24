'use strict';

/**
 * @ngdoc config
 * @name app.config:RouterConfig
 * @requires $stateProvider
 * @requires $urlRouterProvider
 * @requires $controllerProvider
 * @requires $compileProvider
 * @requires $filterProvider
 * @requires $provide
 * @requires $ocLazyLoadProvider
 * @requires JS_REQUIRES
 * @description
 * Manage UI routing for Front-End
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {
    /**
     * @ngdoc property
     * @name controller
     * @id app.config:RouterConfig#controller
     * @memberOf app.config:RouterConfig
     */
    app.controller = $controllerProvider.register;

    /**
     * @ngdoc property
     * @name directive
     * @id app.config:RouterConfig#directive
     * @memberOf app.config:RouterConfig
     */
    app.directive = $compileProvider.directive;

    /**
     * @ngdoc property
     * @name filter
     * @id app.config:RouterConfig#filter
     * @memberOf app.config:RouterConfig
     */
    app.filter = $filterProvider.register;

    /**
     * @ngdoc property
     * @name factory
     * @id app.config:RouterConfig#factory
     * @memberOf app.config:RouterConfig
     */
    app.factory = $provide.factory;

    /**
     * @ngdoc property
     * @name service
     * @id app.config:RouterConfig#service
     * @memberOf app.config:RouterConfig
     */
    app.service = $provide.service;

    /**
     * @ngdoc property
     * @name constant
     * @id app.config:RouterConfig#constant
     * @memberOf app.config:RouterConfig
     */
    app.constant = $provide.constant;

    /**
     * @ngdoc property
     * @name value
     * @id app.config:RouterConfig#value
     * @memberOf app.config:RouterConfig
     */
    app.value = $provide.value;

    /**
     * @ngdoc config
     * @name LazyLoadConfig
     * @id app.config:RouterConfig#LazyLoadConfig
     * @memberOf app.config:RouterConfig
     * @description
     * Configure LAZY MODULES
     */
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: jsRequires.modules
    });

    // APPLICATION ROUTES
    // -----------------------------------
    /**
     * @ngdoc config
     * @name otherwise
     * @id app.config:RouterConfig#otherwise
     * @memberOf app.config:RouterConfig
     * @description
     * For any unmatched url, redirect to /app/home
     */
    $urlRouterProvider.otherwise("/app/home");

    /**
     * @ngdoc abstract-state
     * @name app
     * @id app.config:RouterConfig#app
     * @memberOf app.config:RouterConfig
     * @description
     * Main Abstract path for app
     *
     * Resolve url: `/app`
     */
    $stateProvider.state('app', {
        url: "/app",
        templateUrl: app.viewsUrl + "app.html",
        resolve: loadSequence('oitozero.ngSweetAlert', 'CountriesSrv', 'sweet-alert', 'moment', 'angularMoment', 'angularMomentHijri', 'moment-ar'),
        abstract: true
    })

    /**
     * @ngdoc state
     * @name app.home
     * @id app.config:RouterConfig#app.home
     * @memberOf app.config:RouterConfig
     * @description
     * app.home page
     *
     * Resolve url: `/home`
     */
    .state('app.home', {
        url: "/home",
        templateUrl: app.viewsUrl + "home/overview.html",
        resolve: loadSequence('HomeCtrl'),
        title: 'OneNet Demo Application',
        ncyBreadcrumb: {
            label: 'OneNet Demo Application'
        }
    })


    /**
     * @ngdoc state
     * @name app.contact
     * @id app.config:RouterConfig#app.contact
     * @memberOf app.config:RouterConfig
     * @description
     * app.home page
     *
     * Resolve url: `/contact`
     */
    .state('app.contact', {
        url: "/contact",
        templateUrl: app.viewsUrl + "contact/form.html",
        resolve: loadSequence('ContactCtrl'),
        title: 'OneNet Contact Form',
        ncyBreadcrumb: {
            label: 'OneNet Contact Form'
        }
    })

    /**
     * @ngdoc state
     * @name app.contact.list
     * @id app.config:RouterConfig#app.contact.list
     * @memberOf app.config:RouterConfig
     * @description
     * app.contact.list page
     *
     * Resolve url: `/contact/list`
     */
    .state('app.contact-list', {
        url: "/contact-list",
        templateUrl: app.viewsUrl + "contact/list.html",
        resolve: loadSequence('ContactCtrl'),
        controller: 'ContactListCtrl',
        title: 'List of messages',
        ncyBreadcrumb: {
            label: 'List of messages'
        }
    })

    /**
     * @ngdoc state
     * @name contact-list.item
     * @id app.config:RouterConfig#contact-list.item
     * @memberOf app.config:RouterConfig
     * @description
     * contact-list.item
     */
    .state('app.contact-list.item', {
        url: '/items/:itemID',
        templateUrl: app.viewsUrl + "contact/item.html",
        controller: 'ViewContactItemCrtl'
    })

    /**
     * @ngdoc state
     * @name app.accounts.create-fb
     * @id app.config:RouterConfig#app.accounts.create-fb
     * @memberOf app.config:RouterConfig
     * @description
     * app.accounts.create-fb page
     *
     * Resolve url: `/accounts/create-fb`
     */
    .state('app.accounts.create-fb', {
        url: "/accounts/create-fb",
        templateUrl: "assets/views/accounts/create-fb.html",
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'ui.mask', 'touchspin-plugin', 'CreateFbAccCtrl'),
        title: 'Add new Facebook accounts',
        ncyBreadcrumb: {
            label: 'Add new Facebook accounts'
        },
        controller: function($scope, $state, $stateParams){
            //-- Go to first wizard step
            if($state.is('app.accounts.create-fb')){
                $state.go('app.accounts.create-fb.connect-to-page');
            }
        }
    })

    /**
     * @ngdoc state
     * @name app.accounts.create-fb.connect-to-page
     * @id app.config:RouterConfig#app.accounts.create-fb.connect-to-page
     * @memberOf app.config:RouterConfig
     * @description
     * app.accounts.create-fb.connect-to-page page
     *
     * Resolve url: `/connect-to-page/:action`
     * Dynamic URL by `actions` parameter
     */
    .state('app.accounts.create-fb.connect-to-page', {
        url: '/connect-to-page/{action}?',
        title: 'Connect to facebook page',
        ncyBreadcrumb: {
            label: 'Connect to facebook page'
        },
        views: {
            'connect-to-page': {
                templateUrl: function ($stateParams){
                    if(!$stateParams.action) return false;
                    return 'assets/views/accounts/connect-to-page/' + $stateParams.action + '.html';
                },
                controller: function($scope, $state, $stateParams){
                    //-- Go to default if there are no action
                    if(!$stateParams.action){
                        $state.go('app.accounts.create-fb.connect-to-page', {
                            action: 'page-status'
                        });
                    }
                }
            }
        }
    })

    /**
     * @ngdoc state
     * @name fb-login
     * @id app.config:RouterConfig#fb-login
     * @memberOf app.config:RouterConfig
     * @description
     * fb-login page
     */
     .state('app.fb-login', {
        url: "/faMain Abstract path for appcebook/login",
        templateUrl: "assets/views/facebook/login.html",
        resolve: loadSequence('FacebookLoginCtrl'),
        title: 'Facebook Login',
        ncyBreadcrumb: {
            label: 'Facebook Login'
        }
    })

    /**
     * @ngdoc state
     * @name fb-select-page
     * @id app.config:RouterConfig#fb-select-page
     * @memberOf app.config:RouterConfig
     * @description
     * fb-select-page
     */
     .state('app.fb-select-page', {
        url: "/facebook/select-page",
        templateUrl: "assets/views/facebook/select-page.html",
        resolve: loadSequence('FacebookSelectPageCtrl'),
        title: 'Facebook select page to manage',
        ncyBreadcrumb: {
            label: 'Facebook select page to manage'
        }
    })

    /**
     * @ngdoc state
     * @name fb-dashboard
     * @id app.config:RouterConfig#fb-dashboard
     * @memberOf app.config:RouterConfig
     * @description
     * fb-dashboard
     */
    .state('app.fb-dashboard', {
        url: "/facebook/fb-dashboard",
        templateUrl: "assets/views/facebook/fb-dashboard.html",
        resolve: loadSequence('truncate', 'htmlToPlaintext', 'jquery-sparkline', 'FacebookDashboardCtrl'),
        title: 'Facebook Dashboard',
        ncyBreadcrumb: {
            label: 'Facebook Dashboard'
        }
    })

    /**
     * @ngdoc state
     * @name fb-dashboard.post
     * @id app.config:RouterConfig#fb-dashboard.post
     * @memberOf app.config:RouterConfig
     * @description
     * fb-dashboard.post
     */
    .state('app.fb-dashboard.post', {
        url: '/posts/:postID',
        templateUrl: "assets/views/facebook/fb-view-post.html",
        controller: 'ViewFbPostCrtl'
    }).state('app.dashboard', {
        url: "/dashboard",
        templateUrl: "assets/views/dashboard.html",
        resolve: loadSequence('jquery-sparkline', 'dashboardCtrl'),
        title: 'Dashboard',
        ncyBreadcrumb: {
            label: 'Dashboard'
        }
    })

    /**
     * @ngdoc abstract-state
     * @name login
     * @id app.config:RouterConfig#login
     * @memberOf app.config:RouterConfig
     * @description
     * login
     */
    .state('login', {
        url: '/login',
        template: '<div ui-view class="fade-in-right-big smooth"></div>',
        abstract: true
    });


    /**
     * @ngdoc function
     * @name loadSequence
     * @id app.config:RouterConfig#loadSequence
     * @memberOf app.config:RouterConfig
     * @description
     * Generates a resolve object previously configured in constant.JS_REQUIRES
     * `(config.constant.js)`
     */
    function loadSequence() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q',
			function ($ocLL, $q) {
			    var promise = $q.when(1);
			    for (var i = 0, len = _args.length; i < len; i++) {
			        promise = promiseThen(_args[i]);
			    }
			    return promise;

			    function promiseThen(_arg) {
			        if (typeof _arg == 'function')
			            return promise.then(_arg);
			        else
			            return promise.then(function () {
			                var nowLoad = requiredData(_arg);
			                if (!nowLoad)
			                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
			                return $ocLL.load(nowLoad);
			            });
			    }

			    function requiredData(name) {
			        if (jsRequires.modules)
			            for (var m in jsRequires.modules)
			                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
			                    return jsRequires.modules[m];
			        return jsRequires.scripts && jsRequires.scripts[name];
			    }
			}]
        };
    }
}]);