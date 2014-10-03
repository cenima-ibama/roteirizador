app.run(function (authentication, $rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function (evt) {
        if (!authentication.isAuthenticated) {
            $location.url("/login");
        }
        evt.preventDefault();
    });
});


function LoginCtrl($scope, $http, $location, authentication, $routeParams, $rootScope) {
    $scope.url = '//' + window.location.hostname + '/3D/server/login.php';
    $rootScope.loggedIn = 'false';

    $scope.login = function () {
        $scope.msgs = [];
        var request = $http({
            method: "post",
            url: $scope.url,
            data: {
                username: $scope.username,
                password: $scope.password
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

        });
        request.
                success(function (data, status) {
                    $scope.status = data;
                    $scope.data = data;
                    $scope.result = data;

                    if ($scope.data.msg === 'true') {
                        $rootScope.loggedIn = 'true';
                        console.log($scope.loggedIn);

                        authentication.isAuthenticated = true;
                        authentication.user = {name: $scope.username};
                        $location.url("/rota");
                    } else {
                        $scope.loginError = "Usuario ou senha invalidos!";
                        $location.url("/login");
                    }
                    ;

                })

        request.
                error(function (data, status) {
                    $scope.data = data || "request failed";
                    $scope.status = status;
                });

    };

    $scope.logout = function () {
        authentication.isAuthenticated = false;
        $rootScope.loggedIn = 'false';
        console.log($scope.loggedIn);
        $location.url("/login");
    }


}
;


app.factory('authentication', function () {
    return {
        isAuthenticated: false,
        user: null
    }


});