

app.controller('routerCtrl', function($scope, $http, $rootScope){


    $http.get("brasil-states.geojson").success(function(data, status) {
        angular.extend($scope, {
            geojson: {
                data: data,
                style: {
                    fillColor: "green",
                    weight: 2,
                    opacity: 1,

                    dashArray: '3',
                    fillOpacity: 0.7
                }
            }
        });
    });

});


app.directive('sap', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function (scope, element, attrs) {

            var map = L.map(attrs.id, {
                center: [-12, -52],
                zoom: 5
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
                    console.log(routing.options.waypoints);

                    //Quando o cálculo de rota iniciar.....
                    $(routing).on('routingstart', function (wps) {
                        console.log("Route Calc....");
                    });

                    // //Quando o cálculo de rota iniciar.....
                    $(routing).on('routesfound', function (p, r) {
                        console.log("Route finded");
                    });

                    // //Quando o cálculo de rota iniciar.....
                    $(routing).on('routingerror', function (err) {
                        console.log("Route ERROR!");
                    });

                    routing.addTo(map);

                    //Ocultar a descrição da rota.
                    //$(".leaflet-routing-container").hide();

                };


            });


        }
    };
});
