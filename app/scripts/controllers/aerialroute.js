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

      $scope.originLayer = L.layerGroup().addTo(map);
      $scope.destinationLayer = L.layerGroup().addTo(map);

      $scope.setOrigin = function(airportId, name, latLng) {
        $scope.origin = airportId;
        $('#origin').val(name);
        $scope.originLayer.clearLayers();
        L.marker(latLng).addTo($scope.originLayer);
      };

      $scope.setDestination = function(airportId, name, latLng) {
        $scope.destination = airportId;
        $('#destination').val(name);
        $scope.destinationLayer.clearLayers();
        L.marker(latLng).addTo($scope.destinationLayer);
      };

      $scope.resetRoute = function() {
        $scope.origin = $scope.destination = '';
        $scope.originLayer.clearLayers();
        $scope.destinationLayer.clearLayers();
        $('#origin').val('');
        $('#destination').val('');
      };

      $scope.sendRoute = function() {
        if ($scope.origin  && $scope.destination) {
          RestApi.save({type: 'aerial-routes'},
            {
              'auth_code': $routeParams.authCode,
              'states': $routeParams.states.split(','),
              'origin': $scope.origin,
              'destination': $scope.destination
            },
            function success() {
              $scope.routeExists = true;
              $scope.message = 'Rota registrada com sucesso. ' +
                'Código de autorização: ' + $routeParams.authCode;
              $scope.class = 'success';
            },
            function error() {
              $scope.error = true;
              $scope.message = 'A rota não está dentro dos estados permitidos. ' +
                'Trace novamente.';
              $scope.class = 'danger';
            }
          )
        }
        else {
          $('#popoverNoRoute').popover('show');
        }
      };

      RestApi.query({type:'aerial-routes', authCode:$routeParams.authCode},
        function success(data) {
          // add origin airport to map
          L.circleMarker(data.geometry.coordinates[0].reverse(),
            {weight: 1, opacity: 0.8, color: 'green'}
          ).setRadius(7)
          .bindPopup('Aeroporto de Origem')
          .addTo(map).openPopup();

          // add destination airport to map
          L.circleMarker(data.geometry.coordinates[1].reverse(),
            {weight: 1, opacity: 0.8, color: 'red'}
          ).setRadius(7)
          .bindPopup('Aeroporto de Destino')
          .addTo(map);

          $scope.routeExists = true;
          $scope.message = 'Rota com código de autorização: ' + $routeParams.authCode +
            '. ' + data.properties.origin_name + ' → ' + data.properties.destination_name;
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
                popupScope.latLng = feature.geometry.coordinates.reverse();
                return L.circleMarker(latlng, {weight: 1, opacity: 0.8})
                  .setRadius(5)
                  .bindPopup($compile(angular.element(popupTpl))(popupScope)[0]);
              },
            });

            $scope.class = 'info';
            $scope.airportList = data.features.map(
              function(i) {
                return {value: i.id,
                  label: i.properties.name,
                  coordinates: i.geometry.coordinates
                  };
              }
            );
            $('#origin').autocomplete({
              minLength: 4,
              source: $scope.airportList,
               select: function(event, ui) {
                 $scope.setOrigin(ui.item.value, ui.item.label, ui.item.coordinates);
                 return false;
               }
            });
            $('#destination').autocomplete({
              minLength: 4,
              source: $scope.airportList,
               select: function(event, ui) {
                 $scope.setDestination(ui.item.value, ui.item.label, ui.item.coordinates);
                 return false;
               }
            });
            $scope.airports.addTo(map);
          });
        });
    }
  ]);
