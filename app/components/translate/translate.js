(function(angular){
    "use strict";
    var app = angular.module("frsApp");
    app.filter("translate", function() {
        return function(input) {
            input = input || '';
            return input.replace(/_/g , " ");
        };
    })
}) (angular);