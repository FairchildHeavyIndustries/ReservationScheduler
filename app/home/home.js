(function(angular) {
  "use strict";

  var homeModule = angular.module('frsApp.home', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute', 'frsApp.provider']);

  homeModule.controller('HomeCtrl', ['$scope', 'fbutil', 'user', '$firebaseObject', 'ProviderService',
    function HomeCtrl($scope, fbutil, user, $firebaseObject, ProviderService) {
      var providersRef = ProviderService.get();

      $scope.providers = [];
      if (user) {
        var profileRef = fbutil.ref('users', user.uid)
        
        $scope.profile = $firebaseObject(profileRef);
        $scope.profile.$loaded().then(function() {
          angular.forEach($scope.profile.providers, function(value, key) {
            providersRef.child(key).once("value", function(providerData) {

              $scope.providers.push({
                key: key,
                name: providerData.child('name').val()
              });
              if (!$scope.$$phase) $scope.$apply()
            })
          })
        })
      }
    }
  ]);

  homeModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl',
      resolve: {
        // forces the page to wait for this promise to resolve before controller is loaded
        // the controller can then inject `user` as a dependency. This could also be done
        // in the controller, but this makes things cleaner (controller doesn't need to worry
        // about auth status or timing of accessing data or displaying elements)
        user: ['Auth', function(Auth) {
          return Auth.$waitForAuth();
        }]
      }
    });
  }]);

})(angular);
