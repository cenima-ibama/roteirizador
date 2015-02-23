'use strict';

/**
 * @ngdoc function
 * @name routesClientApp.controller:AerialRouteCtrl
 * @description
 * # AerialroutectrlCtrl
 * Controller of the routesClientApp
 */

angular.module('routesClientApp')
  .controller('AerialRouteCtrl', ['$scope', 'RestApi',
    function ($scope, RestApi) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      L.Icon.Default.imagePath = 'images';
      var map = L.map('map').setView([-35, -58], 4);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      $scope.origin = '';
      $scope.destination = '';

      RestApi.query({type:'airports'}, function (data) {
        $scope.airports = L.geoJson(data, {
          pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {weight: 1, opacity: 0.8})
              .setRadius(5)
              .bindPopup(feature.properties.name);
          },
        });
        $scope.airports.addTo(map);
      });
    }
  ]);
