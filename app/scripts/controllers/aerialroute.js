'use strict';

/**
 * @ngdoc function
 * @name routesClientApp.controller:AerialRouteCtrl
 * @description
 * # AerialroutectrlCtrl
 * Controller of the routesClientApp
 */

angular.module('routesClientApp')
  .controller('AerialRouteCtrl', ['$scope', 'AirportApi',
    function ($scope, AirportApi) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      var map = L.map('map').setView([-12, -52], 5);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      $scope.origin = '';

      AirportApi.query({name:$scope.origin}, function (data) {
        $scope.airports = L.geoJson(data, {
          pointToLayer: function(feature, latlng) {
            return L.marker(latlng);
          },
        });
        $scope.airports.addTo(map);
      });
    }
  ]);
