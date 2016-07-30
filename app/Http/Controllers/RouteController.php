<?php namespace App\Http\Controllers;

use App\Http\Requests;

use App\Route;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class RouteController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$user = JWTAuth::parseToken()->authenticate();
		$content = Route::where('user_id', '=', $user->id)->get();
		return response()->success($content);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param Request $request
	 * @return Response
	 */
	public function store(Request $request)
	{
		$user = JWTAuth::parseToken()->authenticate();
		$route = Route::create(array(
			"user_id" => $user->id,
			"name" => $request->input("name"),
			"origin_place_id" => $request->input("origin_place_id"),
			"origin_place_name" => $request->input("origin_place_name"),
			"destination_place_id" => $request->input("destination_place_id"),
			"destination_place_name" => $request->input("destination_place_name"),
			"travel_mode" => $request->input("travel_mode"),
			"total" => $request->input("total")
		));
		return response()->success($route);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}
}
