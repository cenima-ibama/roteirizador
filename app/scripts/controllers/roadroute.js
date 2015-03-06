'use strict';

/**
 * @ngdoc function
 * @name routesClientApp.controller:RoadRouteCtrl
 * @description
 * # RoadRouteCtrl
 * Controller of the routesClientApp
 */
angular.module('routesClientApp')
  .controller('RoadRouteCtrl', ['$scope', '$routeParams', 'RestApi',
    function ($scope, $routeParams, RestApi) {
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

      RestApi.getRoute({type:'road-routes', authCode:$routeParams.authCode},
        function success(data) {
          $scope.route = L.geoJson(data);
          $scope.route.addTo(map);
          L.popup()
            .setLatLng(data.geometry.coordinates[0].reverse())
            .setContent('Início da rota')
            .openOn(map);
          $scope.routeExists = true;
          $scope.class = 'success';
          $scope.authCode = $routeParams.authCode;
          $scope.origin = data.properties.origin_name;
          $scope.destination = data.properties.destination_name;
        },
        function error() {
          $scope.startEnd = [];
          $scope.route = L.Routing.control({
            routeWhileDragging: true
          });
          $scope.route.addTo(map);
          $scope.message = 'Clique na cidade de origem e de destino para ' +
            'traçar a rota. Em seguida, clique em Gravar para enviar a rota.';
          $scope.class = 'info';

          function onClick(e) {
            if ($scope.startEnd.length < 2) {
              $scope.startEnd.push(e.latlng);
              $scope.route.setWaypoints($scope.startEnd);
            }
          }
          map.on('click', onClick);

          $scope.resetRoute = function() {
            $scope.startEnd = [];
            $scope.route.setWaypoints($scope.startEnd);
          };

          $scope.sendRoute = function() {
            if ($scope.route._routes && $scope.route._routes[0].coordinates) {
              var coordinates = $scope.route._routes[0].coordinates.map(
                function(coordinate) {
                  return coordinate.reverse();
                }
              );

              RestApi.save({type:'road-routes'},
                {
                  'auth_code': $routeParams.authCode,
                  'states': $routeParams.states.split(','),
                  'geom':{
                    'type': 'LineString',
                    'coordinates': coordinates
                  }
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
              );
            }
            else {
              $('#popoverNoRoute').popover('show');
            }
          };
        }
      );
    }
  ]);
