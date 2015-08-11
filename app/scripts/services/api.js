'use strict';

/**
 * @ngdoc service
 * @name routesClientApp.apiconnect
 * @description
 * # apiconnect
 * Service in the routesClientApp.
 */

 var baseUrl = 'http://10.1.8.55:8000';
 var token = 'Token 767fcc3443ca22f3780c29c20bb88f3da2038cf7';

angular.module('routesClientApp')
  .factory('RestApi', ['$resource', function ($resource) {
    return $resource(baseUrl + '/api/:type/', {},
      {
        query: {
          method:'GET',
          headers: {'Authorization':token},
          params:{authCode:'', format:'json'},
          isArray:false
        },
        getRoute: {
          url: baseUrl + '/api/:type/:authCode/',
          method:'GET',
          headers: {'Authorization':token},
          params:{authCode:'', format:'json'},
          isArray:false
        },
        save: {
          method:'POST',
          headers: {'Authorization':token,
            'Content-Type': 'application/json'}
          },
      },
      {stripTrailingSlashes: false}
    );
  }]);
