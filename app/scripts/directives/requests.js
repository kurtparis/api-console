'use strict';

(function() {
  RAML.Directives.requests = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/requests.tmpl.html',
      link: function($scope) {
        var displayed = {};
        $scope.displayed = function(contentType) {
          return displayed[contentType];
        };

        $scope.prepareView = function(name) {
          displayed[name] = true;
        };
      }
    };
  };
})();
