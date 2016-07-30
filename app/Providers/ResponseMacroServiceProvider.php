<?php namespace App\Providers;

use Response;
use Illuminate\Support\ServiceProvider;

class ResponseMacroServiceProvider extends ServiceProvider {

    /**
     * Overwrite any vendor / package configuration.
     *
     * This service provider is intended to provide a convenient location for you
     * to overwrite any "vendor" or package configuration that you may want to
     * modify before the application handles the incoming request / command.
     *
     * @return void
     */
    public function register()
    {
        config([
            //
        ]);
    }

    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot()
    {
        Response::macro('success', function($content="")
        {
            $factory = app('Illuminate\Contracts\Routing\ResponseFactory');

            if (func_num_args() === 0) {
                return $factory;
            }

            $status = 200;
            $description = "Success";

            return $factory->make(
                array(
                    'status' => $status,
                    'description' => $description,
                    'message' => $content
                ),
                $status,
                array(
                    'Content-Type' => 'application/json'
                )
            );
        });


        Response::macro('error', function($status=400, $description="Internal server error", $errorArray="")
        {
            $factory = app('Illuminate\Contracts\Routing\ResponseFactory');

            if (func_num_args() === 0) {
                return $factory;
            }

            return $factory->make(
                array(
                    'status' => $status,
                    'description' => $description,
                    'message' => $errorArray
                ),
                $status,
                array(
                    'Content-Type' => 'application/json'
                )
            );
        });
    }
}