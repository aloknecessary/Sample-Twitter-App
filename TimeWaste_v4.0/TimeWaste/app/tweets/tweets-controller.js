(function() {
    angular.module('TimeWaste')
        .controller('TweetsController', [
            '$scope', '$http', '$interval', function($scope, $http, $interval) {

                if (localStorage['user-data'] != undefined) {
                    $scope.user = JSON.parse(localStorage['user-data']);
                    //console.log($scope.user);
                }
                $scope.server = "http://localhost:3200";
                $scope.sendTweet = function(event) {
                    if (event.which === 13) {
                        var request = {
                            user: $scope.user.username || $scope.user.email,
                            userId: $scope.user.id,
                            userImage: $scope.user.image,
                            content: $scope.newTweet
                        };
                        if ($scope.user) {
                            request.following = angular.copy($scope.user.following);
                            request.following.push({ userId: $scope.user.id });
                        }
                        $http.post('/api/tweets/post', request).success(function(resp) {
                            console.log(resp);
                            $scope.tweets = resp;
                            $scope.newTweet = '';
                        }).error(function(error) {
                            console.log(error);
                        });
                    }
                };

                function getAllTweets(initial) {
                    var data = {};
                    if ($scope.user) {
                        data.following = angular.copy($scope.user.following);
                        data.following.push({ userId: $scope.user.id });
                    }
                    $http.post('/api/tweets/get', data).success(function(resp) {
                        if (initial) {
                            $scope.tweets = resp;
                        } else {
                            if (resp.length > $scope.tweets.length) {
                                $scope.incomingTweets = resp;
                            }
                        }
                    }).error(function() {

                    });
                };

                //Init
                getAllTweets(true);

                // Fetch tweets on time

                $interval(function() {
                    getAllTweets(false);
                    if ($scope.incomingTweets) {
                        $scope.difference = $scope.incomingTweets.length - $scope.tweets.length;
                    }

                }, 5000);

                $scope.setNewTweets = function() {
                    $scope.tweets = angular.copy($scope.incomingTweets);
                    $scope.incomingTweets = undefined;
                };
            }
        ]);
}());