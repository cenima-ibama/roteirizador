var app = angular.module('app', ['ngRoute', 'leaflet-directive']);

app.config(function ($routeProvider) {

    //configure Route Provider
    $routeProvider.
            when('/', {
                templateUrl: 'views/rota.html',
                controller: LoginCtrl
            }).
            when('/rota', {
                controller: MapCtrl,
                templateUrl: 'views/rota.html'

            }).
            otherwise({
                redirectTo: '/'
            });
});
