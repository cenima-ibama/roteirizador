'use strict';

/**
 * @ngdoc function
 * @name routesClientApp.controller:AerialRouteCtrl
 * @description
 * # AerialAquaticsRouteCtrl
 * Controller of the routesClientApp
 */

angular.module('routesClientApp')
  .controller('AerialAquaticRoutesCtrl', ['$scope', '$location', '$route', '$routeParams', '$compile', 'RestApi',
    function ($scope, $location, $route, $routeParams, $compile, RestApi) {

      $scope.routeType = $location.path().split('/')[1];

      if ($scope.routeType === 'aerial-routes') {
        $scope.placeType = 'airports';
        $scope.placeTypeName = 'Aeroporto';
      } else if ($scope.routeType === 'river-routes' || $scope.routeType === 'sea-routes') {
        $scope.placeType = 'shipping-places';
        $scope.placeTypeName = 'Local';
      }

      L.Icon.Default.imagePath = 'images';
      var map = L.map('map').setView([-35, -58], 4);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      $scope.originLayer = L.layerGroup().addTo(map);
      $scope.destinationLayer = L.layerGroup().addTo(map);

      $scope.showPlace = function(geom, isOrigin) {
        var popupMessage, color;
        if (isOrigin === true) {
          popupMessage = $scope.placeTypeName + ' de Origem';
          color = 'green';
        } else {
          popupMessage = $scope.placeTypeName + ' de Destino';
          color = 'red';
        }

        if (geom.type === 'Point') {
          return L.circleMarker(geom.coordinates.reverse(),
            {weight: 1, opacity: 0.8, color: color}
          ).setRadius(7)
          .bindPopup(popupMessage)
          .addTo(map);
        } else {
          var coordinates = geom.coordinates.map(
            function(coordinate) {
              return coordinate.reverse();
            }
          );
          return L.polygon(coordinates, {weight: 1, opacity: 0.8, color: color}
          ).bindPopup(popupMessage)
          .addTo(map);
        }
      };

      $scope.setOrigin = function(id, name, latLng) {
        $scope.origin = id;
        $scope.origin_name = name;
        $('#origin').val(name);
        $scope.originLayer.clearLayers();
        L.marker(latLng).addTo($scope.originLayer);
      };

      $scope.setDestination = function(id, name, latLng) {
        $scope.destination = id;
        $scope.destination_name = name;
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
        if ($scope.origin && $scope.destination) {
          RestApi.save({type:$scope.routeType},
            {
              'auth_code': $routeParams.authCode,
              'origin': $scope.origin,
              'destination': $scope.destination
            },
            function success() {
              $scope.routeExists = true;
              $scope.class = 'success';
              $route.reload();
            },
            function error() {
              $scope.error = true;
              $scope.class = 'danger';
              $scope.errorMessage = 'Não foi possível enviar a rota. ' +
                'Tente novamente.';
              $('#popoverNoRoute').popover('show');
            }
          );
        }
        else {
          $scope.errorMessage = 'Trace uma rota válida';
          $('#popoverNoRoute').popover('show');
        }
      };

      RestApi.getRoute({type:$scope.routeType, authCode:$routeParams.authCode},
        function success(data) {
          // add origin place to map and open popup
          $scope.originPlace = $scope.showPlace(data.geometry.geometries[0], true);
          $scope.originPlace.openPopup();

          // add destination place to map
          $scope.destinationPlace = $scope.showPlace(data.geometry.geometries[1], false);

          $scope.routeExists = true;
          $scope.class = 'success';
          $scope.authCode = $routeParams.authCode;
          $scope.origin_name = data.properties.origin_name;
          $scope.destination_name = data.properties.destination_name;
        },
        function error() {
          RestApi.query({type:$scope.placeType, ids: $routeParams.ids}, function (data) {
            $scope.places = L.geoJson(data, {
              onEachFeature: function(feature) {
                var popupTpl = '<div markerpopup></div>';
                var popupScope = $scope.$new();
                popupScope.name = feature.properties.name;
                popupScope.id = feature.id;

                popupScope.latLng = L.geoJson(feature).getBounds().getCenter();

                if (feature.geometry.type === 'Point') {
                  L.circleMarker(popupScope.latLng, {weight: 1, opacity: 0.8})
                    .bindPopup($compile(angular.element(popupTpl))(popupScope)[0])
                    .setRadius(5)
                    .addTo(map);
                } else {
                  L.geoJson(feature)
                    .bindPopup($compile(angular.element(popupTpl))(popupScope)[0])
                    .addTo(map);
                }
              }
            });
            // $scope.places2 = L.geoJson(data);

            $scope.class = 'info';
            $scope.placeList = data.features.map(
              function(i) {
                return {value: i.id,
                  label: i.properties.name,
                  coordinates: L.geoJson(i.geometry).getBounds().getCenter(),
                  };
              }
            );
            $('#origin').autocomplete({
              minLength: 4,
              source: $scope.placeList,
               select: function(event, ui) {
                 $scope.setOrigin(ui.item.value, ui.item.label, ui.item.coordinates);
                 return false;
               }
            });
            $('#destination').autocomplete({
              minLength: 4,
              source: $scope.placeList,
               select: function(event, ui) {
                 $scope.setDestination(ui.item.value, ui.item.label, ui.item.coordinates);
                 return false;
               }
            });
          });
        });
    }
  ]);
