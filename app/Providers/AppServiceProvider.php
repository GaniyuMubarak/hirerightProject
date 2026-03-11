<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Debug\ExceptionHandler;
use App\Exceptions\Handler;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(ExceptionHandler::class, Handler::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Too many attempt for password reset
        RateLimiter::for('password-reset', function (Request $request) {
            $email = $request->input('email');

            return Limit::perHour(3)
                ->by($email ?: $request->ip())
                ->response(function (Request $request, array $headers) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Too many password reset attempts. Please try again later.',
                        'retry_after' => $headers['Retry-After'] ?? 3600
                    ], 429);
                });
        });

        // Login Throttle: 5 attempts per email+IP every 15 minutes
        RateLimiter::for('login', function (Request $request) {
            $email = (string) $request->email;
            return Limit::perMinutes(15, 5)
                ->by($email . $request->ip())
                ->response(function (Request $request, array $headers) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Too many login attempts. Please try again in 15 minutes.',
                        'retry_after' => $headers['Retry-After'] ?? 900
                    ], 429);
                });
        });

        // Register Throttle: 3 registrations per hour per IP
        RateLimiter::for('registration', function (Request $request) {
            return Limit::perHour(3)
                ->by($request->ip())
                ->response(function (Request $request, array $headers) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Account creation limit reached. Please try again later.',
                        'retry_after' => $headers['Retry-After'] ?? 3600
                    ], 429);
                });
        });

        Gate::define('employer', function (User $user) {
            // Log::info("---- 'Can' called. User Role:   " . $user->app_role);
            if ($user->app_role !== 'employer') {
                throw new AuthorizationException('This endpoint is restricted to employer accounts only.');
            }
            return true;
        });

        Gate::define('candidate', function (User $user) {
            //Log::info("---- 'Can' called. User Role:   " . $user->app_role);
            if ($user->app_role !== 'candidate') {
                throw new AuthorizationException('This endpoint is restricted to candidate accounts only.');
            }
            return true;
        });

        Gate::define('admin', function (User $user) {
            //Log::info("---- 'Can' called. User Role:   " . $user->app_role);
            if ($user->app_role !== 'admin') {
                throw new AuthorizationException('This endpoint is restricted to admin accounts only.');
            }
            return true;
        });

    }
}
