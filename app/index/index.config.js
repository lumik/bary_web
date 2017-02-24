'use strict';

angular.module('index').
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {
        template: '<index></index>'
      });
  }])
