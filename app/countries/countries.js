(function(angular) {
    "use strict";
    var countryModule = angular.module("frsApp.countries", ['firebase.utils']);
    countryModule.factory("CountryService", ['fbutil',
        function(fbutil) {
            var CountryServiceInstance = {
                ref: function() {
                    return fbutil.ref('countries');
                },

                byCode: function(code) {
                    return this.ref().orderByKey().equalTo(code);
                }
            };
            return CountryServiceInstance;
        }
    ]);
})(angular);