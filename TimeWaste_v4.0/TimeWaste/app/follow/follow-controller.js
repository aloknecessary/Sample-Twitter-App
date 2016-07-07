(function () {
    angular.module('TimeWaste')
        .controller('FollowController', [
        '$scope', '$http', function ($scope, $http) {
            $http.get('/api/users/get').success(function (resp) {
                $scope.user = JSON.parse(localStorage['user-data']);
                $scope.users = resp;
                //console.log($scope.users);
            }).error(function (err) {
                console.log(err);
                $window.alert(err);
            });
            
            $scope.followUser = function (myId, followingId) {
                var request = {
                    myId: myId,
                    followId: followingId
                };
                $http.post('api/users/follow', request).success(function (resp) {
                    console.log("following " + followingId);
                    $scope.user.following.push({ userId: followingId });
                    localStorage.setItem('user-data', JSON.stringify($scope.user));
                    $scope.checkIsFollowing(followingId);
                }).error(function (err) {
                    console.log(err);
                    $window.alert(err);
                });
            };
            
            $scope.checkIsFollowing = function (id) {
                for (var i = 0, len = $scope.user.following.length; i < len; i++) {
                    if ($scope.user.following[i].userId === id) {
                        return true;
                    }
                }
            };

            $scope.unFollowUser = function (myId, unfollowId) {
                var request = {
                    myId: myId,
                    unfollowId: unfollowId
                };
                $http.post('api/users/unfollow', request)
                .success(function (resp) {
                        console.log(resp);
                        //var remainingFollows = [];
                        //$scope.user.following.filter(function(item) {
                        //    if (item.userId !== unfollowId) {
                        //        remainingFollows.push({ userId: item.userId });
                        //    }
                        //});
                    $scope.user.following = resp.remaingFollows;
                    localStorage.setItem('user-data', JSON.stringify($scope.user));
                    $scope.checkIsFollowing(unfollowId);
                })
                .error(function (err) {
                    console.log(err);
                    $window.alert(err);
                });
            };

        }
    ]);

}());