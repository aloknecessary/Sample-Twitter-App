(function () {
    angular.module('TimeWaste')
        .controller('NavigationController', ['$scope', '$rootScope', '$state', '$http', '$window',
        function ($scope, $rootScope, $state, $http, $window) {
            
            if (localStorage['user-data']) {
                $rootScope.userLoggedIn = true;
                var user = JSON.parse(localStorage['user-data']);
                $scope.userName = user.username === "" ? user.email : user.username;
            } else {
                $rootScope.userLoggedIn = false;
            }
            
            // USER LOG-IN
            
            $scope.login = function () {
                // console.log($scope.uLogin);
                $http.post('api/user/login', $scope.uLogin)
                        .success(function (resp) {
                    if (resp === "invalid request") {
                        console.log('Invalid user data');
                        $window.alert(resp);
                        return false;
                    }
                    localStorage.setItem('user-data', JSON.stringify(resp));
                    console.log('logged in');
                    $rootScope.userLoggedIn = true;
                    var user = JSON.parse(localStorage['user-data']);
                    $scope.userName = user.username === "" ? user.email : user.username;
                }).error(function (error) {
                    console.error(error);
                });
            };
            
            // USER LOG-OUT
            
            $scope.logout = function () {
                localStorage.clear();
                $scope.userLoggedIn = false;
                $window.location.href = "/";
            };
            
            // RELOAD PAGE
            
            $scope.navigateHome = function () {
                $window.location.href = "/";
            };
        }
    ]);
}());
