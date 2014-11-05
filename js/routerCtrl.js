
app.controller('routerCtrl', function ($scope, $http, $rootScope) {

    /*
     $http.get("brasil-states.geojson").success(function (data, status) {
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
     */
});


app.controller('coorinatesCtrl', ['$scope', function ($scope, $http, $location, $routeParams, $rootScope) {


    }]);


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

                if (arrayPoints.length == 1)
                {
                    //Adiciona o primeiro ponto no mapa.
                    startpoint = '-13,-42';
                    endpoint = '-12,-42';

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
                        console.log("Route Calc....");
                    });

                    //Quando o cálculo de rota iniciar.....
                    $(routing).on('routesfound', function (p, r) {
                        console.log("******** Route finded ********");

                        //  A ROTA COM TODAS AS COORDENADAS
                        routing._router.route(routing.getWaypoints(), function (err, rota) {

                            $scope.rota = rota[0].coordinates;

                            //alert(rota[0].coordinates);

                            console.log("******** saveRoute: start ********");
                            //console.log($scope.rota);
                            //var rota_coords =  '{"coordinates":' + $scope.rota + ', "type": "LineString"}';
                            //var rotaJson = '{"geom": {"coordinates":' + $scope.rota + ', "type": "LineString"}, "company": 1}'
                            //console.log(rotaJson);

// --------------------------------------------------------------------------------------------
                            /*
                             // SEGUNDA OPÇÃO DO AJAX
                             $urlWfs = 'http://10.1.8.55:8000/api/road-routes/';
                             $request = $urlWfs + '&bbox=' + bbox;
                             console.log('url do request: ' + $request);
                             
                             $.ajax({
                             url: $request,
                             type: 'post',
                             dataType: 'jsonp',
                             jsonpCallback: 'parseResponse',
                             success: function (data) {
                             $data = data.features;
                             console.log('Dados a serem passados ao popup: ');
                             console.log(data.features);
                             },
                             error: function () {
                             console.log('Ajax error!')
                             }
                             });
                             */
// --------------------------------------------------------------------------------------------


                            var request = $http({
                                method: "post",
                                url: "http://10.1.8.55:8000/api/road-routes/",
                                data: {
                                    "geom": {"type": "LineString",
                                        "coordinates": $scope.rota},
                                    "company": 1
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
                            });


// --------------------------------------------------------------------------------------------

                        });

                    });

                    // //Quando o cálculo de rota iniciar.....
                    $(routing).on('routingerror', function (err) {

                        console.log("******** Route ERROR! ********");
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