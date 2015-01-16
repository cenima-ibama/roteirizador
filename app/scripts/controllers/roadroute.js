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

    var start_end = [];
    var route = L.Routing.control({routeWhileDragging: false});
    route.addTo(map);

    function onClick(e) {
      if (start_end.length < 2) {
        start_end.push(e.latlng);
        route.setWaypoints(start_end);
      }
    }

    map.addEventListener('click', onClick);
  });
