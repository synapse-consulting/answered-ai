<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Dedoc\Scramble\Scramble;
use Illuminate\Routing\Route;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Response;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    }

    public function boot(): void
    {
        Scramble::configure()
            ->routes(function (Route $route) {
                return Str::startsWith($route->uri, 'api/');
            });

        Response::macro('success', function ($data = null, string $message = 'Success', int $status = 200) {
            return response()->json([
                'status'  => 'success',
                'message' => $message,
                'data'    => $data,
            ], $status);
        });

        Response::macro('error', function (string $message = 'Something went wrong', int $status = 400, $errors = null) {
            return response()->json([
                'status'  => 'error',
                'message' => $message,
                'errors'  => $errors,
            ], $status);
        });
    }
}
