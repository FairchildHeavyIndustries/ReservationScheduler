(function(angular) {
  "use strict";

  var providerModule = angular.module('frsApp.provider', ['firebase', 'firebase.utils', 'firebase.auth', 'ngRoute']);

  providerModule.controller('ProviderController', ['$scope', 'fbutil', 'Auth', '$routeParams', '$firebaseObject', '$location',
    function ProviderController($scope, fbutil, Auth, $routeParams, $firebaseObject, $location) {
      var isModify = !!$routeParams.providerId;
      $scope.modifyMode = isModify;
      var providersRef = isModify ? fbutil.ref('providers', $routeParams.providerId) : fbutil.ref('providers');

      var userRef = fbutil.ref('users', Auth.$getAuth().uid);
      $scope.provider = isModify ? $firebaseObject(providersRef) : null;

      $scope.createProvider = function() {

        var newRef = providersRef.push();
        newRef.set($scope.provider, function(error) {
          if (error) {
            $scope.error = "Record_could_not_be_saved";
          }
          else {
            newRef.child('users/' + Auth.$getAuth().uid).set(true);
            userRef.child('providers/' + newRef.key()).set(true);
            $location.path('/home');
          }
        });

      }

      $scope.updateProvider = function() {
        $scope.provider.$save().then(function(addedProviderRef) {
          $scope.message = "Record_has_been_saved";
        });
      }
    }
  ]);

  providerModule.factory('ProviderService', ['fbutil', '$firebaseObject', '$firebaseArray',
    function(fbutil, $firebaseObject, $firebaseArray) {
      var ProviderServiceInstance = {
        get: function(providerId) {
          if (providerId)
            return fbutil.ref('providers', providerId);
          else
            return fbutil.ref('providers');
        }
      }
      return ProviderServiceInstance;
    }
  ])

  providerModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/provider/update/:providerId', {
        templateUrl: 'provider/provider.html',
        controller: 'ProviderController'
      }),
      $routeProvider.when('/provider/create', {
        templateUrl: 'provider/provider.html',
        controller: 'ProviderController'
      })
  }]);

})(angular);