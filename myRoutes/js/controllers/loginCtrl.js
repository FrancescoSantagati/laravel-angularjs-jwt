angular.module('LoginCtrl',[])
    .controller('LoginController', function($rootScope, $scope, $auth, $state){

        $rootScope.isDataLoading = false;
        
        $scope.loginData = {
            username: "",
            password: ""
        };

        $scope.error = "";
        
        $scope.loginSubmit = function(){
            $rootScope.isDataLoading = true;

            $auth.login($scope.loginData)
                .then(function() {
                    $state.go('home', {});
                })
                .catch(function(response) {
                    // Handle errors here, such as displaying a notification
                    // for invalid email and/or password.
                    $rootScope.isDataLoading = false;
                    $scope.error = response.data.description;
                });
        };
        
        $scope.goToRegister = function() {
            $state.go('register', {});
        };
    });