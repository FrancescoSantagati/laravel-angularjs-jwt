<?php namespace App\Http\Controllers;

use App\Http\Requests;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller {

	public function authenticate(Request $request)
	{
		$credentials = $request->only('username', 'password');

		try {
			// verify the credentials and create a token for the user
			if (! $token = JWTAuth::attempt($credentials)) {
				return response()->error(401, 'Credenziali non valide', array());
			}
		} catch (JWTException $e) {
			// something went wrong
			return response()->error(500, 'Impossibile autenticarsi', array());
		}

		// if no errors are encountered we can return a JWT
		return response()->json(compact('token'));
	}
}
