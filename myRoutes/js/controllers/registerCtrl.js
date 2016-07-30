angular.module('RegisterCtrl',[])
    .controller('RegisterController', function($rootScope, $scope, $state, Auth) {

        $rootScope.isDataLoading = false;

        $scope.registerData = {
            email: "",
            username: "",
            password: "",
            password_confirmation: "",
            firstname: "",
            lastname: ""
        };

        $scope.errors = {
            email: [],
            username: [],
            password: []
        };

        $scope.register = function() {
            $rootScope.isDataLoading = true;
            $scope.resetErrors();

            Auth.register($scope.registerData)
                .then(
                    function(data) {
                        $rootScope.showInfo("Accedi con le credenziali con cui ti sei registrato.")
                        $state.go('login', {});
                    },
                    function(error) {
                        if(error.data.message.email) {
                            for(var i = 0; i < error.data.message.email.length; i++) {
                                $scope.errors.email.push(error.data.message.email[i]);
                            }
                        }

                        if(error.data.message.username) {
                            for(var i = 0; i < error.data.message.username.length; i++) {
                                $scope.errors.username.push(error.data.message.username[i]);
                            }
                        }

                        if(error.data.message.password) {
                            for(var i = 0; i < error.data.message.password.length; i++) {
                                $scope.errors.password.push(error.data.message.password[i]);
                            }
                        }
                    }
                )
                .finally(function() {
                    $rootScope.isDataLoading = false;
                });
        };

        $scope.resetErrors = function() {
            $scope.errors.email = [];
            $scope.errors.username = [];
            $scope.errors.password = [];
        }
    });