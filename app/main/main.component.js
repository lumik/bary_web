'use strict';

// Register `main` component, along with its associated controller and template
angular.
  module('main').
  component('main', {
    template: function() {
        return '<div ng-include="$ctrl.getContentUrl()"></div>'; },
    controller: ['$routeParams', '$location', 'Tabs', function MainController($routeParams, $location, Tabs) {
        // set this to variable for future use in callbacks
        var self = this;

        // public variables
        self.tabs = Tabs.tabs;
        self.curr = Tabs.curr;

        // method, which constructs path to html file with content
        self.getContentUrl = function() {
          var lang = $routeParams.lang;
          var slug = $routeParams.slug;

          // finds the required language
          var currLang = self.tabs.filter(function(tab) {return tab.lang === lang});
          // test for undefined
          if (currLang[0]) {
            self.curr.langNo = self.tabs.indexOf(currLang[0]);

            // finds the requred tab
            var currTab = self.tabs[self.curr.langNo].tabs.filter(function(tab) {return tab.slug === slug});

            // test for undefined
            if (currTab[0]) {
              self.curr.tabId = currTab[0].id;
              return '/tabs/' + lang + '/' + slug + '.html'
            } else { // the tab was not found

              // try to go back to the previous path
              currTab = self.tabs[self.curr.langNo].tabs.filter(function(tab) {return tab.id === self.curr.tabId});

              // test for undefined
              if (currTab) {
                $location.url(lang + '/' + currTab[0].slug)
              } else { // if the previous path does not exist, this shouldn't happen
                self.curr.langNo = 0;
                self.curr.tabId = self.tabs[0].tabs[0].id;
                $location.url(self.tabs[0].lang + '/' + self.tabs[0].tabs[0].slug)
              }
              return null
            }
          } else { // the language was not found
            // if there are any tabs defined
            if (self.tabs.length > 0) {
              var langNo = 0;
              var tabNo = 0;
              // try to find required slug in different languages
              for (var i = 0; i < self.tabs.length; i++) {
                var tab = self.tabs[i].tabs.filter(function(tab) {return tab.slug === slug});
                if (tab[0]) {
                  langNo = i;
                  tabNo = self.tabs[i].tabs.indexOf(tab[0]);
                  break;
                }
              }
              self.curr.langNo = langNo;
              self.curr.tabId = self.tabs[langNo].tabs[tabNo].id;

                  $location.url(self.tabs[langNo].lang + '/' + self.tabs[langNo].tabs[tabNo].slug)
              return '/tabs/' + self.tabs[langNo].lang + '/' + self.tabs[langNo].tabs[tabNo].slug + '.html';
            } else { // if there aren't any tabs defined yet
              return null;
            }
          }
        }
    }]
  });
