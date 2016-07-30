<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Route;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller {

    /**
     * Display the specified resource.
     *
     * @return Response
     */
    public function index()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $user->routes = Route::where('user_id', '=', $user->id)->get();
        return response()->success($user);
    }
}
