<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!$request->user()) {
            return response()->json([
                'message' => 'Unauthenticated.'
            ], 401);
        }

        if ($request->user()->app_role !== $role) {
            return response()->json([
                'message' => 'Unauthorized. This action requires ' . $role . ' role.',
                'your_role' => $request->user()->app_role
            ], 403);
        }

        return $next($request);
    }
}