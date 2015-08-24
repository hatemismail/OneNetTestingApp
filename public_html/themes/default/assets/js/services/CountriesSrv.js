'use strict';
/**
 * @ngdoc service
 * @name app.service:CountriesSrv
 * @description
 * Service for provide countries
 */
app.service('CountriesSrv', function(){
    /**
     * @ngdoc Object
     * @name loadSequence
     * @id CountriesSrv#list
     * @memberOf app.service:CountriesSrv
     * @description
     * List of available countries
     */
    this.list = [
        {
            'code': 'EG',
            'name': 'مصر'
        },
        {
            'code': 'SA',
            'name': 'المملكة العربية السعودية'
        },
        {
            'code': 'UK',
            'name': 'الممكلة المتحدة'
        }
    ];

    /**
     * @ngdoc Method
     * @name GetList
     * @id CountriesSrv#GetList
     * @memberOf app.service:CountriesSrv
     * @description
     * Get List of countries
     */
    this.GetList = function() {
        return this.list;
    };

    /**
     * @ngdoc Method
     * @name GetByCode
     * @id CountriesSrv#GetByCode
     * @memberOf app.service:CountriesSrv
     * @description
     * Get Country name by it's code
     */
    this.GetByCode = function(code){
        var item, index,
            name = false;
        for(index in this.list){
            item = this.list[index];
            if(code == item.code){
                name = item.name;
            }
        }
        return name;
    }
});
