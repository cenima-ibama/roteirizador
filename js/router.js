var app = angular.module('app', ['ngRoute', 'leaflet-directive']);

app.run(function ($rootScope, $http) {

    // token para autenticação no django
    $http.defaults.headers.common.Authorization = 'Token 7cf6f95ca0fdb275a703618ed0916853a59ddbed';

    // Receive emitted message and broadcast it. Event names must be distinct or browser will blow up!
    $rootScope.$on('handleEmit', function (event, args) {
        $rootScope.$broadcast('handleBroadcast', args);
    });
});

app.config(function ($routeProvider) {
    //configure Route Provider
    $routeProvider.
            when('/rota', {
                templateUrl: 'views/rota.html',
            }).
            when('/', {
                templateUrl: 'views/init.html',
                controller: 'routerCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
});


