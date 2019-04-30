(function() {
    angular.module('TimeWaste')
        .controller('SignupController', [
            '$scope', '$state', '$http', '$window', function($scope, $state, $http, $window) {
                $scope.saving = false;
                $scope.createUser = function() {
                    // console.log($scope.newUser);
                    $scope.saving = true;
                    $http.post('api/user/signup', $scope.newUser)
                        .then(function(resp) {
                            console.log('created user with email ' + resp.data);
                            $scope.saving = false;
                            $window.alert('created user with email ' + resp.data);
                            $window.location.href = "/";
                        }, function(error) {
                            console.log(error);
                            $scope.saving = false;
                            $window.alert('Oops! something went wrong...');
                        });
                };
            }
        ]);
}());
