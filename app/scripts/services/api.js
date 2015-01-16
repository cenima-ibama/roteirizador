'use strict';

/**
 * @ngdoc service
 * @name routesClientApp.apiconnect
 * @description
 * # apiconnect
 * Service in the routesClientApp.
 */
angular.module('routesClientApp')
  .factory('AirportApi', ['$resource', function ($resource) {
    return $resource('http://localhost:8000/api/airports/', {}, {
      query: {method:'GET', params:{format:'json'}, isArray:false}
    });
  }]);
