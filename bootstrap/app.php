<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
// --- MAKE SURE THESE THREE ARE PRESENT ---
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Middleware\HandleCors;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // We PREPEND Cors to ensure it runs before anything else crashes
        $middleware->prependToGroup('api', [
            HandleCors::class,
        ]);

        // ->withMiddleware(function (Middleware $middleware) {
        // // Explicitly define API middleware WITHOUT JWT auth globally
        // $middleware->group('api', [
        //     \Illuminate\Http\Middleware\HandleCors::class,
        //     \Illuminate\Routing\Middleware\SubstituteBindings::class,
        // ]);

        $middleware->statefulApi();

        // Register middleware aliases
        $middleware->alias([
            'auth:api' => \Tymon\JWTAuth\Http\Middleware\Authenticate::class,
            'role' => \App\Http\Middleware\CheckRole::class,
        ]);

        //CUSTOM RATE LIMITER FOR PASSWORD RESET
        // RateLimiter::for('password-reset', function (Request $request) {
        //     $email = $request->input('email');

        //     return Limit::perHour(3)
        //         ->by($email ?: $request->ip())
        //         ->response(function (Request $request, array $headers) {
        //             return response()->json([
        //                 'status' => 'error',
        //                 'message' => 'Too many password reset attempts. Please try again later.',
        //                 'retry_after' => $headers['Retry-After'] ?? 3600
        //             ], 429);
        //         });
        // });
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (\Illuminate\Auth\AuthenticationException $e, Request $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthenticated.',
                ], 401);
            }
        });
    })->create();
