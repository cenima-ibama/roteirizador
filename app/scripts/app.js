'use strict';

/**
 * @ngdoc overview
 * @name routesClientApp
 * @description
 * # routesClientApp
 *
 * Main module of the application.
 */
angular
  .module('routesClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/road-route/:authCode', {
        templateUrl: 'views/road-map.html',
        controller: 'RoadRouteCtrl'
      })
      .when('/road-route/:authCode/:states', {
        templateUrl: 'views/road-map.html',
        controller: 'RoadRouteCtrl'
      })
      .when('/aerial-route/:authCode', {
        templateUrl: 'views/aerial-map.html',
        controller: 'AerialRouteCtrl'
      })
      .when('/aerial-route/:authCode/:states', {
        templateUrl: 'views/aerial-map.html',
        controller: 'AerialRouteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
