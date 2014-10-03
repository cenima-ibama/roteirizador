function mapController($scope){
 		$scope.center= 
        {
          lat: -12,
          lng: -52,
          zoom: 4
        },
        $scope.layers=
        {
            baselayers:
            {
                osm:
                {
                    name: "OpenStreetMap",
                    url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    type: "xyz",
                    reuseTiles: false,
                    scrollWheelZoom: true,                                
                    layerParams: {},
                    
                        layerOptions:{
                            attribution: 'Desenvolvido com <a href="http://www.hexgis.com/hexgis-hash5/">Hexgis Hash5</a>. map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        }
                }
            }
        }
};





function SearchCtrl($scope, $http) {

    $scope.months = ['JANEIRO', 'FEVEREIRO', 'MARCO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];
    $scope.years = ['2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];
    $scope.locals = ['terra_indigena', 'unidade_conservacao', 'assentamento' ];
    $scope.url = '//' + window.location.hostname + '/3D/server/search.php'; // The url of our search local

    $scope.search = function() {

        $scope.download = false;
        $scope.loading = true;
        $scope.errorMSG = false;
       
        var request = $http({
            method: "post",
            url:$scope.url,
            data: {
                month: $scope.month,
                year: $scope.year
                // local: $scope.local
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        request.
        success(function(data, status) {
            $scope.status = status;
            $scope.data = data;
            if ($scope.data == 1){
                $scope.errorMSG = true;
                $scope.loading = false;
                $scope.download = false;
            } else {
            $scope.result = data;
            $scope.download = true;
            $scope.loading = false;
            }
        })
        request.
        error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;         
        });
    };

};

   
