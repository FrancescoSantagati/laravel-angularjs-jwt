<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <!--
        Francesco Santagati, matr. 764731
        Bus watch è un sito per la consultazione degli orari degli autobus e delle linee.
        Questo file è l'index della single-page application.
    -->

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <title>MyRoutes</title>

    <!-- LIBRARIES -->
    <link rel="stylesheet" href="{{ asset('/libs/css/bootstrap.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('/libs/css/font-awesome.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('/css/common.css') }}" />
    <link rel="stylesheet" href="{{ asset('/css/animations.css') }}" />
    <link rel="stylesheet" href="{{ asset('/css/home.css') }}" />
    <link rel="stylesheet" href="{{ asset('/css/profile.css') }}" />

    <!-- FONTS-->
    <link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>

    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_XiSd38pMX4pGt3kFwTVimCsrMxsQzYQ&libraries=places"></script>

    <script type="text/javascript" src="{{ asset('/libs/js/jquery-2.2.3.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/libs/js/bootstrap.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/libs/js/angular.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/libs/js/angular-animate.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/libs/js/angular-ui-router.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/libs/js/satellizer.js') }}"></script>

    <!-- SCRIPTS -->
    <script type="text/javascript" src="{{ asset('/js/utils/base64.js') }}"></script>

    <!-- ANGULAR -->
    <script type="text/javascript" src="{{ asset('/js/controllers/mainCtrl.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/js/controllers/loginCtrl.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/js/controllers/registerCtrl.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/js/controllers/homeCtrl.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/js/controllers/profileCtrl.js') }}"></script>

    <script type="text/javascript" src="{{ asset('/js/services/authService.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/js/services/userService.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/js/services/routeService.js') }}"></script>

    <script type="text/javascript" src="{{ asset('/js/app.js') }}"></script>
</head>

<body data-ng-app="myRoutesApp" data-ng-controller="MainController">

<div class="wrap">

    <div data-ng-include="'templates/header.html'"></div>

    <div class="container">
        
        <div id="loader" data-ng-show="isDataLoading" class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>

        <div data-ui-view class="main-content" data-ng-show="!isDataLoading"></div>
    </div>

</div>

<div data-ng-include="'templates/footer.html'"></div>

</body>
</html>
