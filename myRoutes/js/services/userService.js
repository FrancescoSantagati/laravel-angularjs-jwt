angular.module('UserSrvc', []).factory('User', function($http) {

    var userResource = 'api/user';

    return {

        /**
         * Get current logged user.
         * 
         * @returns {*}
         */
        get : function() {
            return $http.get(userResource);
        }
    }
});