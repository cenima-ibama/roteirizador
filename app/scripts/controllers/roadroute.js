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

      RestApi.query({type:'road-routes', authCode:$routeParams.authCode},
        function success(data) {
          $scope.route = L.geoJson(data);
          $scope.route.addTo(map);
          $scope.routeExists = true;
        },
        function error(data) {
          $scope.startEnd = [];
          $scope.route = L.Routing.control({
            routeWhileDragging: true
          });
          $scope.route.addTo(map);

          function onClick(e) {
            if ($scope.startEnd.length < 2) {
              $scope.startEnd.push(e.latlng);
              $scope.route.setWaypoints($scope.startEnd);
            }
          }
          map.on('click', onClick);

          $scope.clearMarkers = function() {
            $scope.startEnd = [];
            $scope.route.setWaypoints($scope.startEnd);
          };

          $scope.sendRoute = function() {
            if ($scope.route._routes[0].coordinates) {
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
                function success(data) {
                  alert('Dados enviados com sucesso!');
                },
                function success(status) {
                  alert('Não foi possível salvar a rota');
                  }
              );
            }
            else {
              alert('A rota ainda não foi traçada');
            }
          };
        });
    }
  ]);
