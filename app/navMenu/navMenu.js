(function(angular) {
  "use strict";

  var navMenuModule = angular.module('frsApp.navMenu', ['firebase.auth']);

  navMenuModule.controller('navMenuController',['$scope', 'Auth', 
    function navMenuController($scope, Auth) {

      $scope.logout = function(){
        Auth.$unauth();
      };
  }]);


})(angular);

