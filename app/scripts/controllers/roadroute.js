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

    L.Icon.Default.imagePath = 'images';
    var map = L.map('map').setView([-35, -58], 4);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

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

    $scope.clear_markers = function() {
      $scope.startEnd = [];
      $scope.route.setWaypoints($scope.startEnd);
    }
});
