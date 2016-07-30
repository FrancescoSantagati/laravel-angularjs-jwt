angular.module('MainCtrl', [])
    .controller('MainController', function($rootScope, $scope, $timeout) {

    $rootScope.isDataLoading = false;
    $rootScope.selected = 0;
    $rootScope.sections = [
        {
            "title": "Home",
            "url": "#/home"
        },
        {
            "title": "Profilo",
            "url": "#/profile"
        }
    ];

    $scope.showInfo = false;
    $scope.showError = false;
    
    $scope.infoMessage = "";
    $scope.errorMessage = "";

    $rootScope.isSelected = function(index) {
        return $scope.selected == index;
    };

    $rootScope.setSelected = function(index) {
        $scope.selected = index;
    };

    $rootScope.showInfo = function(infoMessage) {
        $scope.infoMessage = infoMessage;
        $scope.showInfo = true;
        $timeout(function () {
            $scope.showInfo = false; 
        }, 3000);
    };

    $rootScope.showError = function(errorMessage) {
        $scope.errorMessage = errorMessage;
        $scope.showError = true;
        $timeout(function () {
            $scope.showError = false;
        }, 3000);
    };
});