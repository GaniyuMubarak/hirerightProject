<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Explicitly define API middleware WITHOUT JWT auth globally
        $middleware->group('api', [
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);
                $middleware->statefulApi();

        
        // Register middleware aliases
        $middleware->alias([
            'auth:api' => \Tymon\JWTAuth\Http\Middleware\Authenticate::class,
            'role' => \App\Http\Middleware\CheckRole::class,  // ✅ ADD THIS LINE
        ]);

        // ✅ ADD CUSTOM RATE LIMITER
        RateLimiter::for('password-reset', function (Request $request) {
            $email = $request->input('email');
            
            return Limit::perHour(3) // 3 requests per hour
                ->by($email ?: $request->ip())
                ->response(function (Request $request, array $headers) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Too many password reset attempts. Please try again later.',
                        'retry_after' => $headers['Retry-After'] ?? 3600
                    ], 429);
                });
        });
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // ✅ FIX: Return JSON for API authentication errors instead of redirecting
        $exceptions->renderable(function (\Illuminate\Auth\AuthenticationException $e, Request $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthenticated.',
                    'error' => $e->getMessage()
                ], 401);
            }
        });
    })->create();