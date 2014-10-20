var app = angular.module('app', ['ngRoute', 'leaflet-directive']);

app.config(function ($routeProvider) {
    //configure Route Provider
    $routeProvider.
        when('/rota', {
            templateUrl: 'views/rota.html',
            controller: 'routerCtrl'
        }).
        when('/', {
            templateUrl: 'views/init.html',
            controller: 'routerCtrl'
        }).

        otherwise({
            redirectTo: '/'
        });
});
