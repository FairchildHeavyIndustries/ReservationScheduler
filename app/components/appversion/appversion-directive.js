'use strict';

/* Directives */


angular.module('frsApp')

  .directive('appVersion', ['version', function(version) {
    return function(scope, elm) {
      elm.text(version);
    };
  }]);
