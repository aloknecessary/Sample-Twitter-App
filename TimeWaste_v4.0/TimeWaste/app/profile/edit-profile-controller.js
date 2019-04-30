(function() {
    angular.module('TimeWaste')
        .controller('EditProfileController', ['Upload', '$scope', '$state', '$http',
        function (Upload, $scope, $state, $http) {

            $scope.user = JSON.parse(localStorage['user-data']) || undefined;
            
            $scope.$watch(function () {
                return $scope.file;
            }, function() {
                $scope.upload($scope.file);
            });

            $scope.upload = function(file) {
                if (file) {
                    Upload.upload({
                        url: '/api/profile/edit',
                        method: 'POST',
                        data: { userId: $scope.user.id },
                        file: file
                    }).progress(function(evt) {
                        console.log('uploading..');
                    }).success(function(data) {
                        console.log('completed..');
                        $scope.getUserImage();
                    }).error(function(error) {
                        console.log(error);
                    });
                }
            };

            $scope.updateUserName = function() {
                var request = {
                    userId: $scope.user.id,
                    userName: $scope.user.username
                };
                $http.put('/api/profile/updateUsername', request).then(function(resp) {
                    console.log("Success");
                    var editedInfo = JSON.parse(localStorage['user-data']);
                    editedInfo.username = $scope.user.username;
                    localStorage.setItem('user-data', JSON.stringify(editedInfo));
                }, function(error) {
                    console.log(error);
                });
            };

            $scope.updateUserBio = function () {
                var request = {
                    userId: $scope.user.id,
                    userBio: $scope.user.biography
                };
                $http.put('/api/profile/updateUserbio', request).then(function (resp) {
                    console.log("Success");
                    var editedInfo = JSON.parse(localStorage['user-data']);
                    editedInfo.biography = $scope.user.biography;
                    localStorage.setItem('user-data', JSON.stringify(editedInfo));
                }, function (error) {
                    console.log(error);
                });
            };

            $scope.server = "http://localhost:3200";
            
            $scope.btnText = "Upload Image";

            $scope.getUserImage = function () {
                
                $http.get('/api/profile/getUserImage?userId=' + $scope.user.id).then(function (resp) {
                    $scope.path = $scope.server + resp.data.imgUrl;
                    if (resp.data.imgUrl.indexOf('/uploads') >= 0) {
                        $scope.btnText = "Change Image";
                    }
                }, function (error) {
                    console.log(error);
                });
            };
            
            $scope.getUserImage();

        }]);

}());