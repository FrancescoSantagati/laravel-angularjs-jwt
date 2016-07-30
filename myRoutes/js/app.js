/**
 * Created by Francesco on 23/04/2016.
 */
(function() {
    'use strict';

    angular
        .module('myRoutesApp', [
            'ui.router',
            'satellizer',

            // Directives
            'ngAnimate',

            // Controllers
            'MainCtrl',
            'LoginCtrl',
            'RegisterCtrl',
            'HomeCtrl',
            'ProfileCtrl',

            // Services
            'AuthSrvc',
            'UserSrvc',
            'RouteSrvc'

        ])
        .run(function($rootScope, $auth, $state) {

            // Forza gli utenti non autenticati a passare dal login
            $rootScope.$on( '$stateChangeStart', function(e, toState  , toParams, fromState, fromParams) {
                var isLogin = toState.name === "login";
                if(isLogin){
                    return; // no need to redirect
                }

                if(!$auth.isAuthenticated()
                    && toState.name !== "login"
                    && toState.name !== "register") {

                    e.preventDefault(); // stop current execution
                    $state.go('login'); // go to login
                }
            });

        })
        .config(function($stateProvider, $urlRouterProvider, $authProvider) {

            // Satellizer configuration that specifies which API
            // route the JWT should be retrieved from
            $authProvider.loginUrl = '/myRoutes/api/auth/authenticate';

            // Redirect to the auth state if any other states
            // are requested other than users
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'templates/home.html',
                    controller: 'HomeController'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'templates/login.html',
                    controller: 'LoginController'
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'templates/register.html',
                    controller: 'RegisterController'
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'templates/profile.html',
                    controller: 'ProfileController'
                });
        });
})();