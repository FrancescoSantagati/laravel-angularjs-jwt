<?php namespace App\Exceptions;

use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Session\TokenMismatchException;
use Illuminate\View\View;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class Handler extends ExceptionHandler {

	/**
	 * A list of the exception types that should not be reported.
	 *
	 * @var array
	 */
	protected $dontReport = [
		'Symfony\Component\HttpKernel\Exception\HttpException'
	];

	/**
	 * Report or log an exception.
	 *
	 * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
	 *
	 * @param  \Exception  $e
	 * @return void
	 */
	public function report(Exception $e)
	{
		return parent::report($e);
	}

	/**
	 * Render an exception into an HTTP response.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Exception  $e
	 * @return \Illuminate\Http\Response
	 */
	public function render($request, Exception $e)
	{
		if($e instanceof NotFoundHttpException) {
			return view('index');
		}
		else if($e instanceof QueryException) {
			return response()->error("400", "Bad Request", "Invalid parameters");
		}
		else if($e instanceof TokenExpiredException) {
			return response()->error('401', "Token expired", $e->getStatusCode());

		} else if($e instanceof TokenInvalidException) {
			return response()->error("401", "Token invalid", $e->getStatusCode());

		} else if($e instanceof JWTException) {
			return response()->error("401", "Unauthorized", $e->getStatusCode());
		}

		return parent::render($request, $e);
	}

}
