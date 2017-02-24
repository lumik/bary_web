'use strict';

angular.module('core.showmore').
  directive('showMore', ['$compile', function($compile) {
    function link(scope, elm, attrs) {
      // initialize variables
      scope.showed = false;
      var speed = 500; // px/s
      
      // build showmore block
      elm.addClass('expandable-block expandable-block--collapsed');
      var headerElm = angular.element(elm.children()[0]);
      var expandableElm = angular.element(elm.children()[1]);
      headerElm.append('<span class="expandable-block__more" ng-show="!showed"> ' + attrs.more +
                            '</span><span class="expandable-block__less" ng-show="showed"> ' + attrs.less + '</span>');
      headerElm.attr('ng-click', 'showed = toggleShow()')
      expandableElm.attr('ng-show', 'showed')
      headerElm.addClass('expandable-block__header');
      expandableElm.addClass("expandable-block__content");

      // update DOM
      $compile(elm.contents())(scope);

      // setup inline css for animation
      expandableElm.css({
        'overflow': 'hidden',
        'transition-property': 'height',
        'transition-timing-function': 'linear',
        'height': '0px',
      });

      scope.toggleShow = function() {
        // extract javascript HTML object from jqLite
        var el = expandableElm[0];

        if(!scope.showed) { // showing showmore content
          // storing current properties
          var el_style      = window.getComputedStyle(el),
              // el_display    = el_style.display,
              el_position   = el_style.position,
              el_visibility = el_style.visibility,
              el_height     = el_style.height;

          // setting new, dummy properties to measure the height of the object
          el.style.position   = 'absolute';
          el.style.visibility = 'hidden';
          // el.style.display    = 'block';
          el.style.height     = 'auto';

          // it requires update of DOM, so we have to wait
          setTimeout(function(){
            var y = el.clientHeight; // measure the height

            el.style.transitionDuration = y / speed + 's'; // setup the animation speed

            // restore properties of the object
            el.style.height     = el_height;
            // el.style.display    = el_display;
            el.style.position   = el_position;
            el.style.visibility = el_visibility;

            // wait for DOM update
            setTimeout(function() {
              el.style.height = y + 'px'; // trigger the animation
            }, 20);
          }, 20);
        } else {
          el.style.transitionDuration = el.clientHeight / speed + 's';
          el.style.height = '0px';
        }
        return !scope.showed;
      }
    };
    return {
      scope: {},
      link: link
    };
  }]);
