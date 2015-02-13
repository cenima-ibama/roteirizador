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
      $scope.added_airports = [];


      // if (map.getZoom() > 7) {
        RestApi.query({name:$scope.origin, type:'airports'}, function (data) {
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
      // }
    }
  ]);
