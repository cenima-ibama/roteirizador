
app.controller('routerCtrl', function ($scope, $http, $rootScope) {

    $scope.title = 'Sistema de Rotas';
    $scope.description = 'Compania registrada em nosso sistema inicialmente:'
    $scope.company = {
        "company":  1,    
        "states": ["PA","TO"],
        "geom": {
            "coordinates": "arrayPoints" 
        }
    }
    console.log($scope.company);
});


app.directive('sap', function ($rootScope, $http) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function ($scope, element, attrs) {

            var map = L.map(attrs.id, {
                center: [-12, -52],
                zoom: 5
            });

            $scope.rota = {};

            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18
            }).addTo(map);

            arrayPoints = [];

            map.on('click', function (e) {

                if (arrayPoints.length < 2)
                    arrayPoints.push(e.latlng);

                if (arrayPoints.length == 1){
                    routing = L.Routing.control({waypoints: e.latlng});
                    routing.addTo(map);
                }

                if (arrayPoints.length == 2) {

                    //Remover o ponto (temporário) criado anteriormente.
                    routing.removeFrom(map);

                    //Route Control
                    routing = L.Routing.control({waypoints: arrayPoints});

                    $(routing).on('routingstart', function (wps) {
                        console.log("Route Calc....");
                    });

                    $(routing).on('routesfound', function (p, r) {
                        console.log("******** Route found ********");

                        //  A ROTA COM TODAS AS COORDENADAS
                        var routering = [];
                        
                        routing._router.route(routing.getWaypoints(), function (err, rota) {
                        
                            var cord = [];
                            // $scope.rota = rota[0].coordinates;

                            for (i=0; i<rota[0].coordinates.length; ++i){
                                cord = [rota[0].coordinates[i][1],  rota[0].coordinates[i][0]];
                                routering.push(cord);
                            }

                            $scope.rota = routering;
                            $scope.alert = false;

                            console.log("******** saveRoute: start ********");

                            var request = $http({
                                method: "POST",
                                url: "http://10.1.8.55:8000/api/road-routes/",
                                data: {
                                    "geom": {"type": "LineString",  "coordinates": $scope.rota },
                                    "company": 1,
                                    "states": ["BA", "SE"]
                                },
                                headers: {'Content-Type': 'application/json'}
                            });

                            request.success(function (data, status, headers, config) {
                                console.log("******** saveRoute: success ********");
                                $scope.status = status;
                                $scope.data = data;
                                if ($scope.data == 1) {

                                } else {
                                    $scope.result = data;
                                }
                            });
                            request.error(function (data, status, headers, config) {
                                console.log("******** saveRoute: error ********");

                                $scope.data = data || "Request failed";
                                $scope.status = status;

                               $scope.alert = true; $scope.alertMSG = 'Erro ao salvar rota no servidor!';


                            });
                        });

                    });

                    $(routing).on('routingerror', function (err) {

                        console.log("******** Route ERROR! ********");
                        $scope.alert = true;
                        $scope.alertMSG = 'Rota não encontrada!';

                    });

                    routing.addTo(map);


                    // Ocultar a descrição da rota.
                    // $(".leaflet-routing-container").hide();

                };


            });
        }
    };
});