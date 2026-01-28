<?php
/*
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Jobs\SendOtpEmailJob;

class AuthController extends Controller
{

    // Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        
        $user = User::where('email', $request->email)->first();
        
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid email or password.'], 401);
        }
        
        // Update login count and last seen
        $user->update([
            'last_seen' => now(),
            'login_count' => $user->login_count + 1,
        ]);
        
        // ✅ Load company relationship if user is an employer
        if ($user->app_role === 'employer') {
            $user->load('company');
        }
        
        // Create token using Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;
        
        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'phone' => $user->phone,
                'app_role' => $user->app_role,
                'email_verified' => (bool) $user->email_verified_at,
                'email_verified_at' => $user->email_verified_at,
                'last_seen' => $user->last_seen,
                'login_count' => $user->login_count,
                // ✅ Include company data if employer
                'company' => $user->app_role === 'employer' && $user->company ? [
                    'id' => $user->company->id,
                    'name' => $user->company->name,
                    'email' => $user->company->email,
                ] : null,
            ],
        ]);
    }

    // User registration
    // Only customers can register. The rest have to be invited.
   public function register(Request $request)
{
    $validator = Validator::make($request->all(), [
        'first_name' => 'required|string',
        'last_name' => 'required|string',
        'email' => 'required|string|email|unique:users',
        'password' => 'required|string|confirmed',
        'app_role' => 'required|in:admin,candidate,employer',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $otp = rand(100000, 999999);
    
    $user = User::create([
        'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'email' => $request->email,
        'phone' => $request->phone,
        'signup_strategy' => 'form',
        'password' => Hash::make($request->password),
        'app_role' => $request->app_role,
        'email_verified' => true,  // ← AUTO-VERIFY
        'email_verified_at' => now(),  // ← SET VERIFIED DATE
        'email_otp' => Hash::make($otp),
        'phone_otp' => Hash::make(rand(100000, 999999)),
        'email_otp_expiry' => now()->addMinutes(10),
        'phone_otp_expiry' => now()->addMinutes(10),
    ]);

    // COMMENT OUT EMAIL SENDING FOR NOW
    // SendOtpEmailJob::dispatch($user, $otp);

    // Create token using Sanctum
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user' => [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'phone' => $user->phone,
            'app_role' => $user->app_role,
            'email_verified' => (bool) $user->email_verified_at,
            'email_verified_at' => $user->email_verified_at,
            // ✅ No company yet for new registrations
            'company' => null,
        ],
        'message' => 'Registration successful. You can now proceed to onboarding.'
    ]);
}

    // Email OTP validation
    public function validateEmailOtp(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'otp' => 'required|string',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['message' => 'User not found.'], 404);
    }

    // Already verified?
    if ($user->email_verified === true) {
        return response()->json(['message' => 'Email already verified.'], 200);
    }

    // OTP or expiry validation
    if (!Hash::check($request->otp, $user->email_otp) || $user->email_otp_expiry < now()) {
        return response()->json(['message' => 'Invalid or expired OTP.'], 422);
    }

    // Update user email status
    $user->update([
        'email_verified' => true,
        'email_verified_at' => now(),
        'email_otp' => null,
        'email_otp_expiry' => null,
    ]);

    // ✅ Load company if employer
    if ($user->app_role === 'employer') {
        $user->load('company');
    }

    // Issue new fresh token
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Email verified successfully.',
        'token' => $token,
        'user' => [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'phone' => $user->phone,
            'app_role' => $user->app_role,
            'email_verified' => (bool) $user->email_verified_at,
            'email_verified_at' => $user->email_verified_at,
            'company' => $user->app_role === 'employer' && $user->company ? [
                'id' => $user->company->id,
                'name' => $user->company->name,
                'email' => $user->company->email,
            ] : null,
        ]
    ]);
}


    // Phone OTP validation
    public function validatePhoneOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'otp' => 'required|string',
        ]);

        $user = User::where('phone', $request->phone)->first();
        if (!$user || !Hash::check($request->otp, $user->phone_otp) || $user->phone_otp_expiry < now()) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 422);
        }

        $user->update(['phone_verified' => true, 'phone_otp' => null, 'phone_otp_expiry' => null]);

        return response()->json(['message' => 'Phone verified successfully.']);
    }

    // Password reset request (sending OTP)
    public function requestPasswordReset(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }
        // Generate and hash OTP
        $otp = rand(100000, 999999);
        $user->update([
            'password_otp' => Hash::make($otp),
            'password_otp_expiry' => now()->addMinutes(30),
        ]);
        // Send OTP to email asynchronously
        SendOtpEmailJob::dispatch($user, $otp);
        return response()->json(['message' => 'OTP sent to your email.']);
    }

    // Validate Password OTP and Reset Password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string',
            'password' => 'required|string|confirmed',
        ]);
        $user = User::where('email', $request->email)->first();
        // Validate OTP
        if (!$user || !Hash::check($request->otp, $user->password_otp) || $user->password_otp_expiry < now()) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 422);
        }
        // Update password and clear OTP
        $user->update([
            'password' => Hash::make($request->password),
            'password_otp' => null, // Clear OTP
            'password_otp_expiry' => null, // Clear OTP expiry
        ]);
        return response()->json(['message' => 'Password reset successfully.']);
    }

    public function resendOtp(Request $request)
    {
        $request->validate([
            'type' => 'required|in:email,phone', // Specify whether to resend email or phone OTP
            'email' => 'required_if:type,email|email',
            'phone' => 'required_if:type,phone|string',
        ]);

        $otp = rand(100000, 999999);
        $user = null;

        // Fetch user by email or phone
        if ($request->type == 'email') {
            $user = User::where('email', $request->email)->first();
            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404);
            }
            // Update OTP for email
            $user->update([
                'email_otp' => Hash::make($otp),
                'email_otp_expiry' => now()->addMinutes(10),
            ]);

            // Dispatch the OTP email
            SendOtpEmailJob::dispatch($user, $otp);

            return response()->json(['message' => 'Email OTP sent successfully.']);
        } else {
            $user = User::where('phone', $request->phone)->first();
            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404);
            }
            // Update OTP for phone
            $user->update([
                'phone_otp' => Hash::make($otp),
                'phone_otp_expiry' => now()->addMinutes(10),
            ]);

            // Here you can trigger the SMS service to send OTP
            // SendOtpSmsJob::dispatch($user, $otp); // Example for SMS

            return response()->json(['message' => 'Phone OTP sent successfully.']);
        }
    }

    public function logout(Request $request)
    {
        // Delete the current access token
        $request->user()->currentAccessToken()->delete();
        
        return response()->json(['message' => 'Logged out successfully.']);
    }
}

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Jobs\SendOtpEmailJob;

class AuthController extends Controller
{

    // Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        
        $user = User::where('email', $request->email)->first();
        
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid email or password.'], 401);
        }
        
        // Update login count and last seen
        $user->update([
            'last_seen' => now(),
            'login_count' => $user->login_count + 1,
        ]);
        
        // Create token using Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;
        
        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    // User registration
    // Only customers can register. The rest have to be invited.
   public function register(Request $request)
{
    $validator = Validator::make($request->all(), [
        'first_name' => 'required|string',
        'last_name' => 'required|string',
        'email' => 'required|string|email|unique:users',
        'password' => 'required|string|confirmed',
        'app_role' => 'required|in:admin,candidate,employer',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $otp = rand(100000, 999999);
    
    $user = User::create([
        'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'email' => $request->email,
        'phone' => $request->phone,
        'signup_strategy' => 'form',
        'password' => Hash::make($request->password),
        'app_role' => $request->app_role,
        'email_verified' => true,  // ← AUTO-VERIFY
        'email_verified_at' => now(),  // ← SET VERIFIED DATE
        'email_otp' => Hash::make($otp),
        'phone_otp' => Hash::make(rand(100000, 999999)),
        'email_otp_expiry' => now()->addMinutes(10),
        'phone_otp_expiry' => now()->addMinutes(10),
    ]);

    // COMMENT OUT EMAIL SENDING FOR NOW
    // SendOtpEmailJob::dispatch($user, $otp);

    // Create token using Sanctum
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user' => $user,
        'message' => 'Registration successful. You can now proceed to onboarding.' // ← UPDATED MESSAGE
    ]);
}
    // Email OTP validation
    public function validateEmailOtp(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'otp' => 'required|string',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['message' => 'User not found.'], 404);
    }

    // Already verified?
    if ($user->email_verified === true) {
        return response()->json(['message' => 'Email already verified.'], 200);
    }

    // OTP or expiry validation
    if (!Hash::check($request->otp, $user->email_otp) || $user->email_otp_expiry < now()) {
        return response()->json(['message' => 'Invalid or expired OTP.'], 422);
    }

    // Update user email status
    $user->update([
        'email_verified' => true,
        'email_verified_at' => now(),
        'email_otp' => null,
        'email_otp_expiry' => null,
    ]);

    // Issue new fresh token
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Email verified successfully.',
        'token' => $token,
        'user' => $user
    ]);
}


    // Phone OTP validation
    public function validatePhoneOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'otp' => 'required|string',
        ]);

        $user = User::where('phone', $request->phone)->first();
        if (!$user || !Hash::check($request->otp, $user->phone_otp) || $user->phone_otp_expiry < now()) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 422);
        }

        $user->update(['phone_verified' => true, 'phone_otp' => null, 'phone_otp_expiry' => null]);

        return response()->json(['message' => 'Phone verified successfully.']);
    }

    // Password reset request (sending OTP)
    public function requestPasswordReset(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }
        // Generate and hash OTP
        $otp = rand(100000, 999999);
        $user->update([
            'password_otp' => Hash::make($otp),
            'password_otp_expiry' => now()->addMinutes(30),
        ]);
        // Send OTP to email asynchronously
        SendOtpEmailJob::dispatch($user, $otp);
        return response()->json(['message' => 'OTP sent to your email.']);
    }

    // Validate Password OTP and Reset Password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string',
            'password' => 'required|string|confirmed',
        ]);
        $user = User::where('email', $request->email)->first();
        // Validate OTP
        if (!$user || !Hash::check($request->otp, $user->password_otp) || $user->password_otp_expiry < now()) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 422);
        }
        // Update password and clear OTP
        $user->update([
            'password' => Hash::make($request->password),
            'password_otp' => null, // Clear OTP
            'password_otp_expiry' => null, // Clear OTP expiry
        ]);
        return response()->json(['message' => 'Password reset successfully.']);
    }

    public function resendOtp(Request $request)
    {
        $request->validate([
            'type' => 'required|in:email,phone', // Specify whether to resend email or phone OTP
            'email' => 'required_if:type,email|email',
            'phone' => 'required_if:type,phone|string',
        ]);

        $otp = rand(100000, 999999);
        $user = null;

        // Fetch user by email or phone
        if ($request->type == 'email') {
            $user = User::where('email', $request->email)->first();
            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404);
            }
            // Update OTP for email
            $user->update([
                'email_otp' => Hash::make($otp),
                'email_otp_expiry' => now()->addMinutes(10),
            ]);

            // Dispatch the OTP email
            SendOtpEmailJob::dispatch($user, $otp);

            return response()->json(['message' => 'Email OTP sent successfully.']);
        } else {
            $user = User::where('phone', $request->phone)->first();
            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404);
            }
            // Update OTP for phone
            $user->update([
                'phone_otp' => Hash::make($otp),
                'phone_otp_expiry' => now()->addMinutes(10),
            ]);

            // Here you can trigger the SMS service to send OTP
            // SendOtpSmsJob::dispatch($user, $otp); // Example for SMS

            return response()->json(['message' => 'Phone OTP sent successfully.']);
        }
    }

    public function logout(Request $request)
    {
        // Delete the current access token
        $request->user()->currentAccessToken()->delete();
        
        return response()->json(['message' => 'Logged out successfully.']);
    }
}
*/



namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Jobs\SendOtpEmailJob;

class AuthController extends Controller
{

    // Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        
        $user = User::where('email', $request->email)->first();
        
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid email or password.'], 401);
        }
        
        // Update login count and last seen
        $user->update([
            'last_seen' => now(),
            'login_count' => $user->login_count + 1,
        ]);
        
        // ✅ Load company relationship if user is an employer
        if ($user->app_role === 'employer') {
            $user->load('company');
        }
        
        // Create token using Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;
        
        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'phone' => $user->phone,
                'app_role' => $user->app_role,
                'email_verified' => (bool) $user->email_verified_at,
                'email_verified_at' => $user->email_verified_at,
                'last_seen' => $user->last_seen,
                'login_count' => $user->login_count,
                // ✅ Include company data if employer
                'company' => $user->app_role === 'employer' && $user->company ? [
                    'id' => $user->company->id,
                    'name' => $user->company->name,
                    'email' => $user->company->email,
                ] : null,
            ],
        ]);
    }

    // User registration
    // Only customers can register. The rest have to be invited.
   public function register(Request $request)
{
    $validator = Validator::make($request->all(), [
        'first_name' => 'required|string',
        'last_name' => 'required|string',
        'email' => 'required|string|email|unique:users',
        'password' => 'required|string|confirmed',
        'app_role' => 'required|in:admin,candidate,employer',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $otp = rand(100000, 999999);
    
    $user = User::create([
        'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'email' => $request->email,
        'phone' => $request->phone,
        'signup_strategy' => 'form',
        'password' => Hash::make($request->password),
        'app_role' => $request->app_role,
        'email_verified' => true,  // ← AUTO-VERIFY
        'email_verified_at' => now(),  // ← SET VERIFIED DATE
        'email_otp' => Hash::make($otp),
        'phone_otp' => Hash::make(rand(100000, 999999)),
        'email_otp_expiry' => now()->addMinutes(10),
        'phone_otp_expiry' => now()->addMinutes(10),
    ]);

    // COMMENT OUT EMAIL SENDING FOR NOW
    // SendOtpEmailJob::dispatch($user, $otp);

    // Create token using Sanctum
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user' => [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'phone' => $user->phone,
            'app_role' => $user->app_role,
            'email_verified' => (bool) $user->email_verified_at,
            'email_verified_at' => $user->email_verified_at,
            // ✅ No company yet for new registrations
            'company' => null,
        ],
        'message' => 'Registration successful. You can now proceed to onboarding.'
    ]);
}

    // Email OTP validation
    public function validateEmailOtp(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'otp' => 'required|string',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['message' => 'User not found.'], 404);
    }

    // Already verified?
    if ($user->email_verified === true) {
        return response()->json(['message' => 'Email already verified.'], 200);
    }

    // OTP or expiry validation
    if (!Hash::check($request->otp, $user->email_otp) || $user->email_otp_expiry < now()) {
        return response()->json(['message' => 'Invalid or expired OTP.'], 422);
    }

    // Update user email status
    $user->update([
        'email_verified' => true,
        'email_verified_at' => now(),
        'email_otp' => null,
        'email_otp_expiry' => null,
    ]);

    // ✅ Load company if employer
    if ($user->app_role === 'employer') {
        $user->load('company');
    }

    // Issue new fresh token
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Email verified successfully.',
        'token' => $token,
        'user' => [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'phone' => $user->phone,
            'app_role' => $user->app_role,
            'email_verified' => (bool) $user->email_verified_at,
            'email_verified_at' => $user->email_verified_at,
            'company' => $user->app_role === 'employer' && $user->company ? [
                'id' => $user->company->id,
                'name' => $user->company->name,
                'email' => $user->company->email,
            ] : null,
        ]
    ]);
}


    // Phone OTP validation
    public function validatePhoneOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'otp' => 'required|string',
        ]);

        $user = User::where('phone', $request->phone)->first();
        if (!$user || !Hash::check($request->otp, $user->phone_otp) || $user->phone_otp_expiry < now()) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 422);
        }

        $user->update(['phone_verified' => true, 'phone_otp' => null, 'phone_otp_expiry' => null]);

        return response()->json(['message' => 'Phone verified successfully.']);
    }

    // Password reset request (sending OTP)
    public function requestPasswordReset(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }
        // Generate and hash OTP
        $otp = rand(100000, 999999);
        $user->update([
            'password_otp' => Hash::make($otp),
            'password_otp_expiry' => now()->addMinutes(30),
        ]);
        // Send OTP to email asynchronously
        SendOtpEmailJob::dispatch($user, $otp);
        return response()->json(['message' => 'OTP sent to your email.']);
    }

    // Validate Password OTP and Reset Password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string',
            'password' => 'required|string|confirmed',
        ]);
        $user = User::where('email', $request->email)->first();
        // Validate OTP
        if (!$user || !Hash::check($request->otp, $user->password_otp) || $user->password_otp_expiry < now()) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 422);
        }
        // Update password and clear OTP
        $user->update([
            'password' => Hash::make($request->password),
            'password_otp' => null, // Clear OTP
            'password_otp_expiry' => null, // Clear OTP expiry
        ]);
        return response()->json(['message' => 'Password reset successfully.']);
    }

    public function resendOtp(Request $request)
    {
        $request->validate([
            'type' => 'required|in:email,phone', // Specify whether to resend email or phone OTP
            'email' => 'required_if:type,email|email',
            'phone' => 'required_if:type,phone|string',
        ]);

        $otp = rand(100000, 999999);
        $user = null;

        // Fetch user by email or phone
        if ($request->type == 'email') {
            $user = User::where('email', $request->email)->first();
            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404);
            }
            // Update OTP for email
            $user->update([
                'email_otp' => Hash::make($otp),
                'email_otp_expiry' => now()->addMinutes(10),
            ]);

            // Dispatch the OTP email
            SendOtpEmailJob::dispatch($user, $otp);

            return response()->json(['message' => 'Email OTP sent successfully.']);
        } else {
            $user = User::where('phone', $request->phone)->first();
            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404);
            }
            // Update OTP for phone
            $user->update([
                'phone_otp' => Hash::make($otp),
                'phone_otp_expiry' => now()->addMinutes(10),
            ]);

            // Here you can trigger the SMS service to send OTP
            // SendOtpSmsJob::dispatch($user, $otp); // Example for SMS

            return response()->json(['message' => 'Phone OTP sent successfully.']);
        }
    }

    public function logout(Request $request)
    {
        // Delete the current access token
        $request->user()->currentAccessToken()->delete();
        
        return response()->json(['message' => 'Logged out successfully.']);
    }
}