'use strict';

// Tabs service provides shared variables about tabs through the whole application.
angular.
  module('core.tabs').
  factory('Tabs', ['$resource',
    function($resource) {
      var tabs = function() {
        self = this;
        self.curr = {langNo: 0, tabId: 0};
        self.tabs = $resource('tabs/menus.json').
          query(function() {
            self.curr.langNo = 0;
            self.curr.tabId = self.tabs[0].tabs[0].id;
          });

        self.getTab = function(tabs) {
          var currTab = tabs.filter(function(tab) {return tab.id === self.curr.tabId});
          if (currTab) {
            return currTab[0];
          } else {
            return tabs[0];
          }
        };
      };
      return new tabs();
    }
  ]);
