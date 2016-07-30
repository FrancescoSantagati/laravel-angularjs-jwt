angular.module('RouteSrvc', []).factory('Route', function($http) {

    var routeResource = 'api/route';

    return {

        /**
         * Get current logged user.
         * 
         * @returns {*}
         */
        get : function() {
            return $http.get(routeResource);
        },

        /**
         * Store a user route.
         * 
         * @param route
         * @returns {*}
         */
        store : function(route) {
            return $http.post(routeResource, route);
        },

        /**
         * Delete a user route.
         * 
         * @param routeId
         * @returns {*}
         */
        destroy : function(routeId) {
            return $http.delete(routeResource + '/' + routeId);
        }
    }
});