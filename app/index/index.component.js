'use strict';

// Register `index` component, along with its associated controller and template
angular.
  module('index').
  component('index', {
    template: function() {
        return '<div ng-include="$ctrl.getContentUrl()"></div>'; },
    controller: ['$routeParams', '$location', 'Tabs', function MainController($routeParams, $location, Tabs) {
        // set this to variable for possible use in callbacks
        var self = this;

        // set public variables
        self.tabs = Tabs.tabs;
        self.curr = Tabs.curr;

        // function, which returns path to html file with content
        self.getContentUrl = function() {
          self.curr.langNo = 0;
          if (self.tabs.length > 0) {
            self.curr.tabId = self.tabs[0].tabs[0].id;
            return '/tabs/' + self.tabs[0].lang + '/' + self.tabs[0].tabs[0].slug + '.html';
          } else {
            return null;
          }
        }
    }]
  });
