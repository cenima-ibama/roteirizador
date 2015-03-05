'use strict';

/**
 * @ngdoc service
 * @name routesClientApp.apiconnect
 * @description
 * # apiconnect
 * Service in the routesClientApp.
 */

 var baseUrl = 'http://localhost:8000';
 var token = 'Token 54a327ae2741a50d629a4fd390142e72426a7ad3';

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
            'Content-Type': 'application/json'},
          params:{authCode:''}
          },
      },
      {stripTrailingSlashes: false}
    );
  }]);
