<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Models\JobAlert;
use App\Models\JobApplication;
use App\Models\SavedJob;
use App\Models\User;
use App\Services\CandidateService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage; // ← ADD THIS IMPORT
use Illuminate\Support\Facades\DB;        // ✅ REQUIRED
use Illuminate\Support\Facades\Log;       // ✅ REQUIRED
use Illuminate\Validation\Rule;

class CandidateController extends Controller

{
    protected $candidateService;

    public function __construct(CandidateService $candidateService)
    {
        $this->candidateService = $candidateService;
    }

    public function dashboard(Request $request)
    {
        try {
            $userId = Auth::id();
            $appliedJobs = JobApplication::where('user_id', $userId)->count();
            $savedJobs = SavedJob::where('user_id', $userId)->count();
            $jobAlerts = JobAlert::where('user_id', $userId)->count();

            return response()->json([
                'status' => 'success',
                'data' => [
                    'applied_jobs' => $appliedJobs,
                    'saved_jobs' => $savedJobs,
                    'job_alerts' => $jobAlerts,
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve dashboard stats',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function getProfile()
    {
        try {
            $profileData = $this->candidateService->getProfileData();
            return response()->json([
                'status' => 'success',
                'data' => $profileData
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve profile data',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

//     public function storeProfile(Request $request)
// {
//     try {

//          $user = $request->user();
        
//         // ✅ DEFINE THE VARIABLE
//         $isFirstTimeSetup = empty($user->bio) && empty($user->phone); // Or your logic
        
//         $validator = Validator::make($request->all(), [
//             // Images
//             'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
//             'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            
//             // Documents 
//             'resume' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
//             'cover_letter_file' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
//             'portfolio' => 'nullable|file|mimes:pdf,doc,docx,zip|max:10240',
            
//             // Education validation
//             'education' => 'array',
//             'education.*.institution' => 'required|string|max:255',
//             'education.*.degree' => 'required|string|max:255',
//             'education.*.field_of_study' => 'required|string|max:255',
//             'education.*.location' => 'nullable|string|max:255',
//             'education.*.start_date' => 'required|date|before_or_equal:today',
//             'education.*.end_date' => 'nullable|date|before_or_equal:today',
//             'education.*.is_current' => 'boolean',
//             'education.*.activities' => 'nullable|string|max:2000',
//             'education.*.description' => 'nullable|string|max:2000',

//             // Experience validation
//             'experiences' => 'array',
//             'experiences.*.company_name' => 'required|string|max:255',
//             'experiences.*.job_title' => 'required|string|max:255',
//             'experiences.*.description' => 'nullable|string|max:5000',
//             'experiences.*.location' => 'nullable|string|max:255',
//             'experiences.*.employment_type' => ['required', Rule::in(['full_time', 'part_time', 'self_employed', 'freelance', 'contract', 'internship'])],
//             'experiences.*.start_date' => 'required|date|before_or_equal:today',
//             'experiences.*.end_date' => 'nullable|date|before_or_equal:today',
//             'experiences.*.is_current' => 'boolean',

//             // Certification validation
//             'certifications' => 'array',
//             'certifications.*.name' => 'required|string|max:255',
//             'certifications.*.organization' => 'required|string|max:255',
//             'certifications.*.issue_date' => 'required|date|before_or_equal:today',
//             'certifications.*.expiration_date' => 'nullable|date|after:certifications.*.issue_date',
//             'certifications.*.has_expiry' => 'boolean',
//         ]);

//         if ($validator->fails()) {
//             // ✅ FIXED: Just return validation errors, no logging with undefined variables
//             return response()->json([
//                 'status' => 'error',
//                 'message' => 'Validation failed',
//                 'errors' => $validator->errors()
//             ], 422);
//         }

//         // Handle file uploads
//         $userId = Auth::id();
//         $user = User::findOrFail($userId);

//         // Handle images
//         if ($request->hasFile('profile_image')) {
//             if ($user->profile_image && Storage::disk('public')->exists($user->profile_image)) {
//                 Storage::disk('public')->delete($user->profile_image);
//             }
//             $path = $request->file('profile_image')->store('profile_images', 'public');
//             $user->profile_image = $path;
//         }

//         if ($request->hasFile('cover_image')) {
//             if ($user->cover_image && Storage::disk('public')->exists($user->cover_image)) {
//                 Storage::disk('public')->delete($user->cover_image);
//             }
//             $path = $request->file('cover_image')->store('cover_images', 'public');
//             $user->cover_image = $path;
//         }

//         // Handle documents
//         if ($request->hasFile('resume')) {
//             if ($user->resume && Storage::disk('public')->exists($user->resume)) {
//                 Storage::disk('public')->delete($user->resume);
//             }
//             $path = $request->file('resume')->store('resumes', 'public');
//             $user->resume = $path;
//         }

//         if ($request->hasFile('cover_letter_file')) {
//             if ($user->cover_letter_file && Storage::disk('public')->exists($user->cover_letter_file)) {
//                 Storage::disk('public')->delete($user->cover_letter_file);
//             }
//             $path = $request->file('cover_letter_file')->store('cover_letters', 'public');
//             $user->cover_letter_file = $path;
//         }

//         if ($request->hasFile('portfolio')) {
//             if ($user->portfolio && Storage::disk('public')->exists($user->portfolio)) {
//                 Storage::disk('public')->delete($user->portfolio);
//             }
//             $path = $request->file('portfolio')->store('portfolios', 'public');
//             $user->portfolio = $path;
//         }

//         // Update other user fields
//         $user->bio = $request->bio ?? $user->bio;
//         $user->title = $request->title ?? $user->title;
//         $user->phone = $request->phone ?? $user->phone;
//         $user->address = $request->address ?? $user->address;
//         $user->save();

//         // Store profile data (education, experience, certifications)
//         $profileData = $this->candidateService->storeProfileData($request->all());

//          //  Send welcome email on first profile completion
//         if ($isFirstTimeSetup && ($request->bio || $request->title)) {
//             $user->notify(new \App\Notifications\WelcomeNotification($user));
//         }

//         return response()->json([
//             'status' => 'success',
//             'message' => 'Profile data stored successfully',
//             'data' => $profileData
//         ], 201);
        
//     } catch (\Exception $e) {
//         // ✅ FIXED: Now $e is available here in the catch block
//         \Log::error('Profile store error', [
//             'user_id' => Auth::id(),
//             'error' => $e->getMessage(),
//             'trace' => $e->getTraceAsString()
//         ]);
        
//         return response()->json([
//             'status' => 'error',
//             'message' => 'Failed to store profile data',
//             'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
//         ], 500);
//     }
// }

public function storeProfile(Request $request)
{
    try {
        $user = $request->user();
        
        // ✅ DEFINE THE VARIABLE
        $isFirstTimeSetup = empty($user->bio) && empty($user->phone); // Or your logic
        
        // Validation rules
        $validator = Validator::make($request->all(), [
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'bio' => 'nullable|string',
            'title' => 'nullable|string|max:255',
            'website' => 'nullable|url',
            'portfolio_url' => 'nullable|url',
            
            // Files
            'profile_image' => 'nullable|file|mimes:jpg,jpeg,png|max:5120',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
            
            // Education
            'education' => 'nullable|array',
            'education.*.institution' => 'required|string',
            'education.*.degree' => 'required|string',
            'education.*.field_of_study' => 'required|string',
            'education.*.start_date' => 'required|date',
            'education.*.end_date' => 'nullable|date',
            'education.*.is_current' => 'boolean',
            
            // Experience
            'experiences' => 'nullable|array',
            'experiences.*.company_name' => 'required|string',
            'experiences.*.job_title' => 'required|string',
            'experiences.*.description' => 'nullable|string',
            'experiences.*.employment_type' => 'required|in:full_time,part_time,contract,internship,freelance',
            'experiences.*.start_date' => 'required|date',
            'experiences.*.end_date' => 'nullable|date',
            'experiences.*.is_current' => 'boolean',
            
            // Certifications
            'certifications' => 'nullable|array',
            'certifications.*.name' => 'required|string',
            'certifications.*.organization' => 'required|string',
            'certifications.*.issue_date' => 'required|date',
            'certifications.*.expiration_date' => 'nullable|date',
            'certifications.*.has_expiry' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();

        // Update user profile
        $userData = $request->only([
            'first_name', 'last_name', 'phone', 'address', 
            'bio', 'title', 'website', 'portfolio_url'
        ]);

        // Handle file uploads
        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('profile_images', 'public');
            $userData['profile_image'] = $path;
        }

        if ($request->hasFile('resume')) {
            $path = $request->file('resume')->store('resumes', 'public');
            $userData['resume'] = $path;
        }

        $user->update($userData);

        // Handle education
        if ($request->has('education')) {
            // Delete existing education
            $user->education()->delete();
            
            foreach ($request->education as $edu) {
                $user->education()->create([
                    'institution' => $edu['institution'],
                    'degree' => $edu['degree'],
                    'field_of_study' => $edu['field_of_study'],
                    'start_date' => $edu['start_date'],
                    'end_date' => $edu['end_date'] ?? null,
                    'is_current' => $edu['is_current'] ?? false,
                ]);
            }
        }

        // Handle experiences
        if ($request->has('experiences')) {
            // Delete existing experiences
            $user->experiences()->delete();
            
            foreach ($request->experiences as $exp) {
                $user->experiences()->create([
                    'company_name' => $exp['company_name'],
                    'job_title' => $exp['job_title'],
                    'description' => $exp['description'] ?? null,
                    'employment_type' => $exp['employment_type'],
                    'start_date' => $exp['start_date'],
                    'end_date' => $exp['end_date'] ?? null,
                    'is_current' => $exp['is_current'] ?? false,
                ]);
            }
        }

        // Handle certifications
        if ($request->has('certifications')) {
            // Delete existing certifications
            $user->certifications()->delete();
            
            foreach ($request->certifications as $cert) {
                $user->certifications()->create([
                    'name' => $cert['name'],
                    'organization' => $cert['organization'],
                    'issue_date' => $cert['issue_date'],
                    'expiration_date' => $cert['expiration_date'] ?? null,
                    'has_expiry' => $cert['has_expiry'] ?? false,
                ]);
            }
        }

        DB::commit();

        // Reload relationships
        $user->load(['education', 'experiences', 'certifications']);

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'address' => $user->address,
                    'bio' => $user->bio,
                    'title' => $user->title,
                    'profile_image_url' => $user->profile_image ? asset('storage/' . $user->profile_image) : null,
                    'resume_url' => $user->resume ? asset('storage/' . $user->resume) : null,
                    'portfolio_url' => $user->portfolio_url,
                ],
                'education' => $user->education,
                'experiences' => $user->experiences,
                'certifications' => $user->certifications,
            ]
        ], 200);

    } catch (\Exception $e) {
        DB::rollBack();
        
        Log::error('Error storing candidate profile', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);

        return response()->json([
            'status' => 'error',
            'message' => 'Failed to store profile data',
            'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
        ], 500);
    }
}
}