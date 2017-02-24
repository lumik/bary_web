'use strict';

angular.
  module('spApp').
  config(['$locationProvider', '$routeProvider', '$animateProvider',
    function($locationProvider, $routeProvider, $animateProvider) {
      $locationProvider.hashPrefix('!');

      // restrict animations to only expandable-block classes
      $animateProvider.classNameFilter(/expandable-block/);

      $routeProvider.
        otherwise({redirectTo: '/'});
    }
  ]);
