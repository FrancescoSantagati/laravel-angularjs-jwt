angular.module('ProfileCtrl', [])
    .controller('ProfileController', function($rootScope, $scope, $http, $auth, $state, User, Route) {

        $rootScope.setSelected(1);
        $scope.title = "Profilo";

        $scope.user = undefined;
        $scope.error = "";
        $rootScope.isDataLoading = true;

        User.get().then(
            function(data) {
                $scope.user = data.data.message;
            },
            function(error) {
                $scope.error = error;
            }
        ).finally(function() {
            $rootScope.isDataLoading = false;
        });

        $scope.userEdit = function() {

            User.edit($scope.user)
                .then(
                    function(data) {
                        // $scope.user = data.user;
                    },
                    function(error) {
                        $scope.error = error;
                    }
                )
                .finally(function() {
                    $rootScope.isDataLoading = false;
                });
        };

        $scope.logout = function() {
            $auth.logout();

            $auth.logout().then(function() {
                $state.go('login', {});
            });
        };
    });