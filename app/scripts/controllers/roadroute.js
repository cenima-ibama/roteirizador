'use strict';

/**
 * @ngdoc function
 * @name routesClientApp.controller:RoadRouteCtrl
 * @description
 * # RoadRouteCtrl
 * Controller of the routesClientApp
 */
angular.module('routesClientApp')
  .controller('RoadRouteCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var map = L.map('map').setView([-12, -52], 5);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    $scope.startEnd = [];
    $scope.markers = L.layerGroup();
    $scope.markers.addTo(map);

    function onClick(e) {
      if ($scope.startEnd.length < 2) {
        $scope.startEnd.push(e.latlng);
        L.marker(e.latlng).addTo($scope.markers);

        if ($scope.startEnd.length === 2) {
          map.removeLayer($scope.markers);
          $scope.route = L.Routing.control({
              waypoints: $scope.startEnd,
              routeWhileDragging: true
            });
          $scope.route.addTo(map);
        }
      }
    }

    map.on('click', onClick);
  });
