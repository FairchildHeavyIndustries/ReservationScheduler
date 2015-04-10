(function(angular) {
  "use strict";

  var providerModule = angular.module('frsApp.provider', ['firebase', 'firebase.utils', 'firebase.auth', 'ngRoute']);

  providerModule.controller('ProviderController', ['$scope', 'fbutil', 'user', '$routeParams', '$firebaseObject', '$location',
    function ProviderController($scope, fbutil, user, $routeParams, $firebaseObject, $location) {
      var providersRef;
      var userRef = fbutil.ref('users', user.uid);
      if (!!$routeParams.providerId) {
        providersRef = fbutil.ref('providers', $routeParams.providerId);
        $scope.provider = $firebaseObject(providersRef);
        $scope.modifyMode = true;
      }

      $scope.createProvider = function(provider) {
        providersRef = fbutil.ref('providers');
        var newRef = providersRef.push();
        newRef.set($scope.provider, function(error) {
          if (error) {
            $scope.error = "Record_could_not_be_saved";
          }
          else {
            newRef.child('users/' + user.uid).set(true);
            userRef.child('providers/' + newRef.key()).set(true);
            $location.path('/home');
          }
        });

      }

      $scope.updateProvider = function(provider) {
        $scope.provider.$save().then(function(addedProviderRef) {
          $scope.message = "Record_has_been_saved";
        });
      }
    }
  ]);

  providerModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.whenAuthenticated('/provider/update/:providerId', {
        templateUrl: 'provider/provider.html',
        controller: 'ProviderController'
      }),
      $routeProvider.whenAuthenticated('/provider/create', {
        templateUrl: 'provider/provider.html',
        controller: 'ProviderController'
      })
  }]);

})(angular);