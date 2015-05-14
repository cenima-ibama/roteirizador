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
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/road-routes/:authCode', {
        templateUrl: 'views/road-map.html',
        controller: 'RoadRouteCtrl'
      })
      .when('/road-routes/:authCode/:states', {
        templateUrl: 'views/road-map.html',
        controller: 'RoadRouteCtrl'
      })
      .when('/aerial-routes/:authCode', {
        templateUrl: 'views/aerial-aquatic-map.html',
        controller: 'AerialAquaticRoutesCtrl'
      })
      .when('/aerial-routes/:authCode/:ids', {
        templateUrl: 'views/aerial-aquatic-map.html',
        controller: 'AerialAquaticRoutesCtrl'
      })
      .when('/sea-routes/:authCode', {
        templateUrl: 'views/aerial-aquatic-map.html',
        controller: 'AerialAquaticRoutesCtrl'
      })
      .when('/sea-routes/:authCode/:ids', {
        templateUrl: 'views/aerial-aquatic-map.html',
        controller: 'AerialAquaticRoutesCtrl'
      })
      .when('/river-routes/:authCode', {
        templateUrl: 'views/aerial-aquatic-map.html',
        controller: 'AerialAquaticRoutesCtrl'
      })
      .when('/river-routes/:authCode/:ids', {
        templateUrl: 'views/aerial-aquatic-map.html',
        controller: 'AerialAquaticRoutesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
