'use strict';
/**
 * @ngdoc controller
 * @name app.controller:ContactCtrl
 * @requires $scope
 * @requires $window
 * @requires $Restangular
 * @requires $state
 * @requires $timeout
 * @requires SweetAlert
 * @requires CountriesSrv
 * @description
 * ContactUS Controller
 * Manage contact form via Back-End API
 */
app.controller('ContactCtrl', ["$scope","$window", "Restangular", "$state", "$timeout", "SweetAlert", "CountriesSrv",
    function ($scope, $window, Restangular, $state, $timeout, SweetAlert, CountriesSrv) {
        /**
         * Pre Data Object
         * @type {{counties, first_name: string, last_name: string, email: string, country_code: string, message: string}}
         */
        $scope.contact_data = {
            //-- Lists
            countries: CountriesSrv.GetList(),

            //-- Elements
            first_name: "",
            last_name: "",
            email: "",
            country_code: "",
            message: ""
        };

        /**
         * Save reset object
         * @type {{counties, first_name: string, last_name: string, email: string, country_code: string, message: string}|*}
         */
        $scope.master = $scope.contact_data;

        /**
         * Form Actions Object
         * @type {{submit: Function, reset: Function}}
         */
        $scope.form = {
            submit: function (form) {
                var firstError = null;
                if (form.$invalid) {
                    var field = null, firstError = null;
                    for (field in form) {
                        if (field[0] != '$') {
                            if (firstError === null && !form[field].$valid) {
                                firstError = form[field].$name;
                            }

                            if (form[field].$pristine) {
                                form[field].$dirty = true;
                            }
                        }
                    }

                    angular.element('.ng-invalid[name=' + firstError + ']').focus();
                    SweetAlert.swal("لا يمكن ارسال البيانات لان هناك اخطاء في ادخال البيانات!", "الأخطاء معلمة باللون الأحمر!", "error");
                    return;
                } else {
                    /**
                     * Start submit data
                     */
                    //-- Prepare data
                    var data_to_send = angular.copy($scope.contact_data);
                    delete data_to_send.countries;//-- Delete list of countries

                    //-- Push API
                    Restangular.all('contact-us/push').post({
                        data: data_to_send
                    }).then(function(res) {
                        if(res.done){
                            //-- Push Alert
                            SweetAlert.swal(
                                {
                                    title: "حسنا!",
                                    text: "تم ارسال رسالتك بنجاح وسيتم الرد على رسالتك في اقرب وقت ممكن, شكراَ لك!",
                                    type: 'success',
                                    showCancelButton: false,
                                    confirmButtonText: 'حسناً!',
                                    closeOnConfirm: true
                                },
                                function () {
                                    //-- Redirect to home
                                    $state.go('app.home');
                                }
                            );
                        }else{
                            SweetAlert.swal("حدث خطأ اثناء ارسال البيانات!", "يرجى المحاولة لاحقا, او اتصل بخدمة العملاء!", "error");
                        }
                    });
                }
            },
            reset: function (form) {
                $scope.contact_data = angular.copy($scope.master);
                form.$setPristine(true);
            }
        };
    }
]);




/**
 * @ngdoc controller
 * @name app.controller:ContactListCtrl
 * @requires $scope
 * @requires $window
 * @requires $Restangular
 * @requires $state
 * @requires CountriesSrv
 * @requires SweetAlert
 * @description
 * ContactListCtrl Controller
 * Manage contact list
 */
app.controller('ContactListCtrl', ["$scope","$window", "Restangular", "$state", "SweetAlert", "CountriesSrv", "amMoment",
    function ($scope, $window, Restangular, $state, SweetAlert, CountriesSrv, amMoment) {
        /**
         * Pre List Object
         * @type {Array}
         */
        $scope.contact_list = [];

        /**
         * Get Data by Back-End API
         */
        Restangular.all('contact-us/get-list').getList().then(function(res) {
            $scope.contact_list = res;
            if(!$scope.$$phase) $scope.$apply();
        });

        /**
         * On select
         */

    }
]);


/**
 * @ngdoc controller
 * @name app.controller:ContactListCtrl
 * @requires $scope
 * @requires $stateParams
 * @requires $state
 * @requires CountriesSrv
 * @description
 * ContactListCtrl Controller
 * Manage contact list
 */
app.controller('ViewContactItemCrtl', ['$scope', '$stateParams', '$state', 'CountriesSrv', function ($scope, $stateParams, $state, CountriesSrv) {
    /**
     * Get data
     */
    var index = $stateParams.itemID;
    if(!$scope.contact_list.length){
        $state.go('app.contact-list');
    }else{
        $scope.selectedItem = $scope.contact_list[index];
        $scope.selectedItem.country = CountriesSrv.GetByCode($scope.selectedItem.country_code);
    }
}]);