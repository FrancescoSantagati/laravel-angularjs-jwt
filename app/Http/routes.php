<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function() {
    return view('index');
});

// Satellizer default authenticate method
Route::post('api/auth/authenticate', 'AuthController@authenticate');
Route::post('api/auth/user', 'Auth\AuthController@register');

// API Autenticate
Route::group(array('prefix' => 'api', 'middleware' => 'jwt.auth'), function() {

    Route::resource('user', 'UserController', array('only' => array('index')));
    Route::resource('route', 'RouteController', array('only' => array('index', 'store', 'show', 'destroy')));
    
});