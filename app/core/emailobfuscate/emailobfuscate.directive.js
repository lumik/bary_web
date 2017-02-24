'use strict';

angular.module('core.emailobfuscate').
  directive('emailObfuscate', function(version) {
    return function(scope, elm, attrs) {
      var validEmailAddress = attrs.email.replace("--mailto--","").replace("--","@").replace("--",".").replace("--","");
      elm.text(validEmailAddress);
      elm.attr('href', 'mailto:' + validEmailAddress);
    };
  });
