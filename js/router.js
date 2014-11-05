var app = angular.module('app', ['ngRoute', 'leaflet-directive']);

app.run(function ($rootScope, $http) {

    // token para autenticação no django
    $http.defaults.headers.common.Authorization = 'Token 5bd57a94571e6348e0ec3a45b05bdd5a717f3c08';



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
                controller: 'coorinatesCtrl'
            }).
            when('/', {
                templateUrl: 'views/init.html',
                controller: 'routerCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
});


