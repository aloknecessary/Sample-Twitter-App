(function() {
    angular.module('TimeWaste')
        .controller('SignupController', [
            '$scope', '$state', '$http', '$window', function($scope, $state, $http, $window) {
                $scope.saving = false;
                $scope.createUser = function() {
                    // console.log($scope.newUser);
                    $scope.saving = true;
                    $http.post('api/user/signup', $scope.newUser)
                        .success(function(resp) {
                            console.log('created user with email ' + resp);
                            $scope.saving = false;
                            $window.alert('created user with email ' + resp);
                            $window.location.href = "/";
                        })
                        .error(function(error) {
                            console.log(error);
                            $scope.saving = false;
                            $window.alert('Oops! something went wrong...');
                        });
                };
            }
        ]);
}());
