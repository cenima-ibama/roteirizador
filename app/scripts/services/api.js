'use strict';

/**
 * @ngdoc service
 * @name routesClientApp.apiconnect
 * @description
 * # apiconnect
 * Service in the routesClientApp.
 */
angular.module('routesClientApp')
  .factory('RestApi', ['$resource', function ($resource) {
    return $resource('http://localhost:8000/api/:type/:authCode', {},
      {
        query: {
          method:'GET',
          headers: {'Authorization':'Token 54a327ae2741a50d629a4fd390142e72426a7ad3'},
          params:{authCode:'', format:'json'},
          isArray:false
        },
        save: {
          method:'POST',
          headers: {'Authorization':'Token 54a327ae2741a50d629a4fd390142e72426a7ad3'},
          params:{authCode:'', format:'json'}
          },
      }
    );
  }]);
