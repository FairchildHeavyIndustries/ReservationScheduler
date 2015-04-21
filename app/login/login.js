"use strict";
angular.module('frsApp.login', ['firebase.utils', 'firebase.auth', 'ngRoute', 'frsApp.countries'])

.controller('LoginCtrl', ['$scope', 'Auth', '$location', 'fbutil', 'APPNAME', 'CountryService',
      function($scope, Auth, $location, fbutil, APPNAME, countries) {
        $scope.email = null;
        $scope.pass = null;
        $scope.confirm = null;
        $scope.createMode = false;

        $scope.countries = [];
        $scope.account = {
          country: "",
          users: []
        };

        countries.ref().on('child_added', function(snapshot) {
          $scope.countries.push({
            code: snapshot.key(),
            name: snapshot.child('name').val()
          });
          $scope.$apply();
        });

        $scope.login = function(email, pass) {
          $scope.err = null;
          Auth.$authWithPassword({
              email: email,
              password: pass
            }, {
              rememberMe: true
            })
            .then(function( /* user */ ) {
              $location.path('/home');
            }, function(err) {
              $scope.err = errMessage(err);
            });
        };

        $scope.createAccount = function() {
          $scope.err = null;

          var email = $scope.email;
          var pass = $scope.pass;
          // create user credentials in Firebase auth system
          Auth.$createUser({
              email: email,
              password: pass
            })
            .then(function() {
              // authenticate so we have permission to write to Firebase
              return Auth.$authWithPassword({
                email: email,
                password: pass
              });
            })
            .then(function(user) {
              // create a user profile in our data store
              var usersRef = fbutil.ref('users', user.uid);
              usersRef.set({
                email: email,
                name: firstPartOfEmail(email),
                app: APPNAME
              }, function(error) {
                if (error) {
                  $scope.err = error;
                }
                else {
                  var accountsRef = fbutil.ref('accounts');
                  var newAccountRef = accountsRef.push($scope.account);
                  newAccountRef.child('users/' + Auth.$getAuth().uid).set(true, function(error) {
                    if (error) {
                      $scope.err = error;
                    } else {
                      $location.path("/account");
                    }
                  });
                }
              });
            });

        };

        function assertValidAccountProps() {
          if (!$scope.email) {
            $scope.err = 'Please enter an email address';
          }
          else if (!$scope.pass || !$scope.confirm) {
            $scope.err = 'Please enter a password';
          }
          else if ($scope.createMode && $scope.pass !== $scope.confirm) {
            $scope.err = 'Passwords do not match';
          }
          return !$scope.err;
        }

        function errMessage(err) {
          return angular.isObject(err) && err.code ? err.code : err + '';
        }

        function firstPartOfEmail(email) {
          return ucfirst(email.substr(0, email.indexOf('@')) || '');
        }

        function ucfirst(str) {
          // inspired by: http://kevin.vanzonneveld.net
          str += '';
          var f = str.charAt(0).toUpperCase();
          return f + str.substr(1);
        }
      }])
      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
          controller: 'LoginCtrl',
          templateUrl: 'login/login.html'
        });
        $routeProvider.when('/signup', {
          templateUrl: 'login/signup.html',
          controller: 'LoginCtrl'
        });
      }]);