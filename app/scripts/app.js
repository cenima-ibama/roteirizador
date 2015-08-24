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
      .when('/road-route/:authCode', {
        redirectTo: function (routeParams) {
          return '/road-routes/' + routeParams.authCode;
        }
      })
      .when('/road-routes/:authCode/:states', {
        templateUrl: 'views/road-map.html',
        controller: 'RoadRouteCtrl'
      })
      .when('/road-route/:authCode/:states', {
        redirectTo: function (routeParams) {
          return '/road-routes/' + routeParams.authCode + '/' + routeParams.states;
        }
      })
      .when('/aerial-routes/:authCode', {
        templateUrl: 'views/aerial-aquatic-map.html',
        controller: 'AerialAquaticRoutesCtrl'
      })
      .when('/aerial-route/:authCode', {
        redirectTo: function (routeParams) {
          return '/aerial-routes/' + routeParams.authCode;
        }
      })
      .when('/aerial-routes/:authCode/:ids', {
        templateUrl: 'views/aerial-aquatic-map.html',
        controller: 'AerialAquaticRoutesCtrl'
      })
      .when('/aerial-route/:authCode/:ids', {
        redirectTo: function (routeParams) {
          return '/aerial-routes/' + routeParams.authCode + '/' + routeParams.ids;
        }
      })
      .when('/sea-routes/:authCode', {
        templateUrl: 'views/aerial-aquatic-map.html',
        controller: 'AerialAquaticRoutesCtrl'
      })
      .when('/sea-route/:authCode', {
        redirectTo: function (routeParams) {
          return '/sea-routes/' + routeParams.authCode;
        }
      })
      .when('/sea-routes/:authCode/:ids', {
        templateUrl: 'views/aerial-aquatic-map.html',
        controller: 'AerialAquaticRoutesCtrl'
      })
      .when('/sea-route/:authCode/:ids', {
        redirectTo: function (routeParams) {
          return '/sea-routes/' + routeParams.authCode + '/' + routeParams.ids;
        }
      })
      .when('/river-routes/:authCode', {
        templateUrl: 'views/aerial-aquatic-map.html',
        controller: 'AerialAquaticRoutesCtrl'
      })
      .when('/river-route/:authCode', {
        redirectTo: function (routeParams) {
          return '/river-routes/' + routeParams.authCode;
        }
      })
      .when('/river-routes/:authCode/:ids', {
        templateUrl: 'views/aerial-aquatic-map.html',
        controller: 'AerialAquaticRoutesCtrl'
      })
      .when('/river-route/:authCode/:ids', {
        redirectTo: function (routeParams) {
          return '/river-routes/' + routeParams.authCode + '/' + routeParams.ids;
        }
      })
      .when('/rail-routes/', {
        templateUrl: 'views/rail-map.html',
        controller: 'MainCtrl'
      })
      .when('/rail-route/', {
        redirectTo: function (routeParams) {
          return '/rail-routes/';
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
