(function () {
  'use strict';

  RAML.Security.oauth2 = function() {
    return {
      restrict: 'E',
      templateUrl: 'security/oauth2.tpl.html',
      replace: true,
      controller: ['$scope', function ($scope) {
        $scope.onChange = function () {
          $scope.$parent.context.forceRequest = false;
        };

        $scope.ownerOptionsEnabled = function () {
          return $scope.credentials.grant === 'owner';
        };

        $scope.isImplicitEnabled = function () {
          return $scope.credentials.grant === 'token';
        };
		
		$scope.applicationKeyOptionsEnabled = function () {
          return $scope.credentials.grant === 'application_key';
        };
        
        $scope.trustedCredentialsOptionsEnabled = function () {
         return $scope.credentials.grant === 'trusted_credentials';
       	};

        $scope.grants = [
          {
            label: 'Implicit',
            value: 'token'
          },
          {
            label: 'Authorization Code',
            value: 'code'
          },
          {
            label: 'Resource Owner Password Credentials',
            value: 'owner'
          },
          {
            label: 'API Access Token',
            value: 'application_key'
          },
          {
            label: 'Client Credentials',
            value: 'credentials'
          },
          {
              label: 'Trusted Client Credentials',
              value: 'trusted_credentials'
          }
        ];

        /* jshint camelcase: false */
        var authorizationGrants = $scope.$parent.securitySchemes.oauth_2_0.settings.authorizationGrants;

        $scope.scopes = $scope.$parent.securitySchemes.oauth_2_0.settings.scopes;
        $scope.credentials.scopes = {};

        if (authorizationGrants) {
          $scope.grants = $scope.grants.filter(function (el) {
            return authorizationGrants.indexOf(el.value) > -1;
          });
        }
        /* jshint camelcase: true */

        $scope.credentials.grant = $scope.grants[0].value;
      }]
    };
  };

  angular.module('RAML.Security')
    .directive('oauth2', RAML.Security.oauth2);
})();
