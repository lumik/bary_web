'use strict';

angular.module('spApp').controller('AppCtrl', ['Tabs', function(Tabs) {
  var self = this;
  self.languages = [];
  self.tabs = Tabs.tabs;
  self.curr = Tabs.curr;
  self.getTab = Tabs.getTab;
/*  self.tabs = $resource('tabs/menus.json').
        query(function() {
          self.currLangNo = 0;
          self.currTabId = self.tabs[0].tabs[0].id;
        });

  self.getTab = function(tabs) {
    var currTab = tabs.filter(function(tab) {return tab.id === self.currTabId});
    if (currTab) {
      return currTab[0];
    } else {
      return tabs[0];
    }
  }; */
}]);
