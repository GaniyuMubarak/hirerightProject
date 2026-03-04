<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\JobListing;
use App\Models\User;
use App\Notifications\ApplicationStatusNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class JobApplicationController extends Controller
{
    /**
     * Get all applications for employer's company
     * Route name: igetAllApplications (from routes/api.php line 212)
     */
    public function igetAllApplications(Request $request)
    {
        try {
            $user = $request->user();
            
            // Check if user has company
            if (!$user->company_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Company profile not found. Please create a company first.'
                ], 404);
            }
            
            // Get all applications for this company's jobs
            $applications = JobApplication::whereHas('job', function($query) use ($user) {
                    $query->where('company_id', $user->company_id);
                })
                ->with([
                    'user:id,first_name,last_name,email,phone,title,profile_image',
                    'job:id,title,location,employment_type,experience_level'
                ])
                ->orderBy('created_at', 'desc')
                ->paginate(20);
            
            return response()->json([
                'status' => 'success',
                'data' => $applications
            ], 200);
            
        } catch (\Exception $e) {
            Log::error('Error fetching applications: ' . $e->getMessage(), [
                'user_id' => $request->user()->id,
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch applications',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get applications for specific job
     */
    public function getApplicationsForJob(Request $request, $jobId)
    {
        try {
            $user = $request->user();
            
            // Verify job belongs to user's company
            $job = JobListing::where('id', $jobId)
                ->where('company_id', $user->company_id)
                ->first();
                
            if (!$job) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Job not found or access denied'
                ], 404);
            }

            $applications = JobApplication::where('job_id', $jobId)
                ->with([
                    'user:id,first_name,last_name,email,phone',
                    'job:id,title'
                ])
                ->when($request->filled('status'), function($query) use ($request) {
                    $query->where('status', $request->status);
                })
                ->orderBy('created_at', 'desc')
                ->paginate(20);

            return response()->json([
                'status' => 'success',
                'data' => $applications
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error fetching job applications: ' . $e->getMessage());
            
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve applications'
            ], 500);
        }
    }

    /**
     * Get candidates for specific job
     */
    public function getCandidatesForJob(Request $request, $jobId)
    {
        try {
            $user = $request->user();

            // Verify job belongs to user's company
            $job = JobListing::where('id', $jobId)
                ->where('company_id', $user->company_id)
                ->first();
                
            if (!$job) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Job not found or access denied'
                ], 404);
            }

            $applications = JobApplication::where('job_id', $jobId)
                ->with(['user:id,first_name,last_name,email,phone,title'])
                ->when($request->filled('status'), function($query) use ($request) {
                    $query->where('status', $request->status);
                })
                ->orderBy('created_at', 'desc')
                ->paginate(20);

            $candidates = $applications->map(function ($application) {
                return [
                    'id' => $application->user->id,
                    'name' => $application->user->first_name . ' ' . $application->user->last_name,
                    'email' => $application->user->email,
                    'phone' => $application->user->phone,
                    'title' => $application->user->title,
                    'application_status' => $application->status,
                    'applied_at' => $application->created_at->format('Y-m-d H:i:s'),
                ];
            });

            return response()->json([
                'status' => 'success',
                'data' => [
                    'candidates' => $candidates,
                    'pagination' => [
                        'total' => $applications->total(),
                        'per_page' => $applications->perPage(),
                        'current_page' => $applications->currentPage(),
                        'last_page' => $applications->lastPage(),
                    ]
                ]
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error fetching candidates for job: ' . $e->getMessage());
            
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve candidates for the job',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get all candidates for company
     */
    public function getAllCandidatesForCompany(Request $request)
    {
        try {
            $user = $request->user();
            
            if (!$user->company_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Company profile not found'
                ], 404);
            }

            // Get unique candidates who applied to company jobs
            $candidates = User::where('app_role', 'candidate')
                ->whereHas('jobApplications', function($query) use ($user) {
                    $query->whereHas('job', function($jobQuery) use ($user) {
                        $jobQuery->where('company_id', $user->company_id);
                    });
                })
                ->with([
                    'jobApplications' => function($query) use ($user) {
                        $query->whereHas('job', function($jobQuery) use ($user) {
                            $jobQuery->where('company_id', $user->company_id);
                        })->with('job:id,title');
                    }
                ])
                ->paginate(20);

            return response()->json([
                'status' => 'success',
                'data' => [
                    'candidates' => $candidates->items(),
                    'pagination' => [
                        'total' => $candidates->total(),
                        'per_page' => $candidates->perPage(),
                        'current_page' => $candidates->currentPage(),
                        'last_page' => $candidates->lastPage(),
                    ]
                ]
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error fetching company candidates: ' . $e->getMessage());
            
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve candidates',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Update application status (shortlist, reject, etc.)
     */
    // public function updateStatus(Request $request, $id)
    // {
    //     try {
    //         $user = $request->user();
            
    //         // Find application and verify access
    //         $application = JobApplication::whereHas('job', function($query) use ($user) {
    //                 $query->where('company_id', $user->company_id);
    //             })
    //             ->findOrFail($id);

    //         $validator = Validator::make($request->all(), [
    //             'status' => ['required', Rule::in([
    //                 'pending',
    //                 'shortlisted',
    //                 'interview',
    //                 'hired',
    //                 'rejected'
    //             ])],
    //             'rejection_reason' => 'nullable|string|max:1000',
    //             'notes' => 'nullable|string|max:1000'
    //         ]);

    //         if ($validator->fails()) {
    //             return response()->json([
    //                 'status' => 'error',
    //                 'message' => 'Validation failed',
    //                 'errors' => $validator->errors()
    //             ], 422);
    //         }

    //         // Update application
    //         $application->update([
    //             'status' => $request->status,
    //             'rejection_reason' => $request->rejection_reason,
    //             'reviewed_at' => now(),
    //             'reviewed_by' => $user->id
    //         ]);

    //         // Send notification to candidate
    //         try {
    //             $application->user->notify(
    //                 new ApplicationStatusNotification($application->load('job'), $request->status)
    //             );
    //         } catch (\Exception $e) {
    //             Log::error('Failed to send status notification: ' . $e->getMessage());
    //             // Don't fail the request if email fails
    //         }

    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'Application status updated successfully',
    //             'application' => $application->load(['user:id,first_name,last_name', 'job:id,title'])
    //         ]);
            
    //     } catch (\Exception $e) {
    //         Log::error('Error updating application status: ' . $e->getMessage());
            
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'Failed to update application status',
    //             'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
    //         ], 500);
    //     }
    // }
    public function updateStatus(Request $request, $id)
{
    try {
        $user = $request->user();
        
        // Find application and verify access
        $application = JobApplication::whereHas('job', function($query) use ($user) {
                $query->where('company_id', $user->company_id);
            })
            ->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status' => ['required', Rule::in([
                'applied',
                'under_review',
                'shortlisted',
                'interview_scheduled',
                'test_invited',
                'test_completed',
                'offered',
                'hired',
                'rejected',
                'withdrawn'
            ])],
            'rejection_reason' => 'nullable|string|max:1000',
            'notes' => 'nullable|string|max:1000'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Update application
        $application->update([
            'status' => $request->status,
            'rejection_reason' => $request->rejection_reason,
            'reviewed_at' => now(),
            'reviewed_by' => $user->id
        ]);

        // Send notification to candidate
        try {
            $application->user->notify(
                new ApplicationStatusNotification($application->load('job'), $request->status)
            );
        } catch (\Exception $e) {
            Log::error('Failed to send status notification: ' . $e->getMessage());
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Application status updated successfully',
            'application' => $application->load(['user:id,first_name,last_name,email', 'job:id,title'])
        ]);
        
    } catch (\Exception $e) {
        Log::error('Error updating application status: ' . $e->getMessage());
        
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to update application status',
            'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
        ], 500);
    }
}

    /**
     * View application details
     */
    public function show($id)
    {
        try {
            $user = Auth::user();
            
            $application = JobApplication::whereHas('job', function($query) use ($user) {
                    $query->where('company_id', $user->company_id);
                })
                ->with([
                    'job:id,title,location,employment_type',
                    'user:id,first_name,last_name,email,phone,bio,title,resume'
                ])
                ->findOrFail($id);

            return response()->json([
                'status' => 'success',
                'data' => [
                    'id' => $application->id,
                    'job' => [
                        'id' => $application->job->id,
                        'title' => $application->job->title,
                        'location' => $application->job->location,
                    ],
                    'candidate' => [
                        'id' => $application->user->id,
                        'name' => $application->user->first_name . ' ' . $application->user->last_name,
                        'email' => $application->user->email,
                        'phone' => $application->user->phone,
                        'bio' => $application->user->bio,
                        'title' => $application->user->title,
                        'resume' => $application->user->resume,
                    ],
                    'status' => $application->status,
                    'applied_at' => $application->created_at->format('Y-m-d H:i:s'),
                    'reviewed_at' => $application->reviewed_at?->format('Y-m-d H:i:s'),
                    'rejection_reason' => $application->rejection_reason,
                ]
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error fetching application: ' . $e->getMessage());
            
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve application details',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}