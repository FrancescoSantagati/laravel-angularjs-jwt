angular.module('AuthSrvc', []).factory('Auth', function($http) {

    var userResource = 'api/auth/user';

    return {

        /**
         * Register new user.
         * 
         * @param userData
         * @returns {*}
         */
        register : function(userData) {
            return $http({
                method: 'POST',
                url: userResource,
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data: $.param(userData)
            });
        }
    }
});