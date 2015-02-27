'use strict';

/**
 * @ngdoc function
 * @name routesClientApp.controller:AerialRouteCtrl
 * @description
 * # AerialroutectrlCtrl
 * Controller of the routesClientApp
 */

angular.module('routesClientApp')
  .controller('AerialRouteCtrl', ['$scope', '$routeParams', '$compile', 'RestApi',
    function ($scope, $routeParams, $compile, RestApi) {
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

      $scope.setOrigin = function(airportId) {
        $scope.origin = airportId;
      };

      $scope.setDestination = function(airportId) {
        $scope.destination = airportId;
      };

      $scope.resetRoute = function() {
        $scope.origin = $scope.destination = '';
      };

      RestApi.query({type:'aerial-routes', authCode:$routeParams.authCode},
        function success(data) {
          // origin airport
          L.circleMarker(data.geometry.coordinates[0].reverse(),
            {weight: 1, opacity: 0.8, color: 'green'}
          ).setRadius(7)
          .bindPopup('Aeroporto de Origem')
          .addTo(map).openPopup();
          // destination airport
          L.circleMarker(data.geometry.coordinates[1].reverse(),
            {weight: 1, opacity: 0.8, color: 'red'}
          ).setRadius(7)
          .bindPopup('Aeroporto de Destino')
          .addTo(map);
          $scope.routeExists = true;
          $scope.message = 'Rota com código de autorização: ' + $routeParams.authCode;
          $scope.class = 'success';
        },
        function error() {
          RestApi.query({type:'airports'}, function (data) {
            $scope.airports = L.geoJson(data, {
              pointToLayer: function(feature, latlng) {
                var popupTpl = '<div markerpopup></div>';
                var popupScope = $scope.$new();
                popupScope.name = feature.properties.name;
                popupScope.id = feature.id;
                return L.circleMarker(latlng, {weight: 1, opacity: 0.8})
                  .setRadius(5)
                  .bindPopup($compile(angular.element(popupTpl))(popupScope)[0]);
              },
            });
            $scope.airports.addTo(map);
          });
        });
    }
  ]);
