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

      L.Icon.Default.imagePath = 'images';

      var map = L.map('map').setView([-12, -52], 5);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      $scope.origin = '';
      $scope.added_airports = [];


      if (map.getZoom() > 7) {
        AirportApi.query({name:$scope.origin, in_bbox:map.getBounds()}, function (data) {
          $scope.airports = L.geoJson(data, {
            pointToLayer: function(feature, latlng) {
              if (feature.id.indexOf($scope.added_airports) === -1) {
                $scope.added_airports.push(feature.id);
                return L.marker(latlng);
              }
            },
          });
          $scope.airports.addTo(map);
        });
      }
    }
  ]);
