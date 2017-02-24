'use strict';

angular.module('main').
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/:lang/:slug', {
        template: '<main></main>'
      }).
      when('/:lang', {
        redirectTo: function(routeParams, path, search) {return '/' + routeParams.lang + '/0'}
      });
  }])
