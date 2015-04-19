'use strict';

// Declare app level module which depends on filters, and services
angular.module('frsApp', [
    'frsApp.config',
    'frsApp.security',
    'frsApp.navMenu',
    'frsApp.home',
    'frsApp.account',
    'frsApp.login',
    'frsApp.provider',
    'frsApp.schedule',
    'frsApp.countries'
  ])

  .run(['$rootScope', 'Auth', function($rootScope, Auth) {
    // track status of authentication
    Auth.$onAuth(function(user) {
      $rootScope.loggedIn = !!user;
    });
  }]);
