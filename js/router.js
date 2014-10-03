var app = angular.module('app', ['ngRoute', 'leaflet-directive']);

app.config(function ($routeProvider) {

    //configure Route Provider
    $routeProvider.
            when('/', {
                templateUrl: 'views/login.html',
                controller: LoginCtrl
            }).
            when('/main', {
                templateUrl: 'views/main.html',
                controller: mapController
            }).
            when('/map', {
                controller: mapController,
                templateUrl: 'views/map.html'
            }).
            when('/login', {
                controller: LoginCtrl,
                templateUrl: 'views/login.html'
            }).
            when('/logout', {
                controller: LoginCtrl,
            }).
            when('/rota', {
                controller: MapCtrl,
                templateUrl: 'views/rota.html'

            })
            .
            otherwise({
                redirectTo: '/'
            });
});

app.directive('sap', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function (scope, element, attrs) {

            var map = L.map(attrs.id, {
                center: [-15.810527, -47.894107],
                zoom: 13
            });

            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18
            }).addTo(map);

            arrayPoints = [];

            map.on('click', function (e) {

                if (arrayPoints.length < 2) 
                    arrayPoints.push(e.latlng);            

                if (arrayPoints.length == 1)
                {
                    //Adiciona o primeiro ponto no mapa.
                    routing = L.Routing.control({waypoints: e.latlng});

                    routing.addTo(map);

                    //Ocultar a descrição da rota.
                    //$(".leaflet-routing-container").hide();
                }

                if (arrayPoints.length == 2) {

                    //Remover o ponto (temporário) criado anteriormente.
                    routing.removeFrom(map);

                    //Criar o controle de rotas.
                    routing = L.Routing.control({waypoints: arrayPoints});

                    //Quando o cálculo de rota iniciar.....
                    $(routing).on('routingstart', function (wps) {
                        alert("ROTA CALCULANDO....");
                    });

                    // //Quando o cálculo de rota iniciar.....
                    $(routing).on('routesfound', function (p, r) {
                        alert("ROTA ENCONTRADA");
                    });

                    // //Quando o cálculo de rota iniciar.....
                    $(routing).on('routingerror', function (err) {
                        alert("ROTA ERROR");
                    });

                    routing.addTo(map);

                    //Ocultar a descrição da rota.
                    //$(".leaflet-routing-container").hide();

                }
                ;


            });


        }
    };
});

function MapCtrl($scope) {

}