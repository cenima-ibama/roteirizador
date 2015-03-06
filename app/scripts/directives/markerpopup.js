'use strict';

/**
 * @ngdoc directive
 * @name routesClientApp.directive:markerpopup
 * @description
 * # markerpopup
 */
angular.module('routesClientApp')
  .directive('markerpopup', function () {
    return {templateUrl: 'views/marker-popup.html',};
  });
