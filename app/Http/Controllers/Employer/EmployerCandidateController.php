<?php

namespace App\Http\Controllers\Employer;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EmployerCandidateController extends Controller
{
    /**
     * Get all candidates who applied to employer's jobs
     */
    public function index(Request $request)
    {
        try {
            $employer = $request->user();
            
            // Get employer's company
            if (!$employer->company_id) {
                return response()->json([
                    'message' => 'Company profile not found. Please create a company first.'
                ], 404);
            }

            $companyId = $employer->company_id;

            // Get all candidates who applied to this company's jobs
            $candidates = User::where('app_role', 'candidate')
                ->whereHas('jobApplications', function($query) use ($companyId) {
                    $query->whereHas('job', function($jobQuery) use ($companyId) {
                        $jobQuery->where('company_id', $companyId);
                    });
                })
                ->with([
                    'jobApplications' => function($query) use ($companyId) {
                        $query->whereHas('job', function($jobQuery) use ($companyId) {
                            $jobQuery->where('company_id', $companyId);
                        })->with('job:id,title,company_id');
                    }
                ])
                ->paginate(20);

            return response()->json([
                'message' => 'Candidates retrieved successfully',
                'candidates' => $candidates
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error fetching candidates: ' . $e->getMessage(), [
                'user_id' => $request->user()->id,
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Failed to fetch candidates',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get specific candidate profile
     */
    public function show(Request $request, $id)
    {
        try {
            $employer = $request->user();
            
            // Get employer's company
            if (!$employer->company_id) {
                return response()->json([
                    'message' => 'Company profile not found'
                ], 404);
            }

            $companyId = $employer->company_id;

            // Find candidate
            $candidate = User::where('id', $id)
                ->where('app_role', 'candidate')
                ->first();

            if (!$candidate) {
                return response()->json([
                    'message' => 'Candidate not found'
                ], 404);
            }

            // Check if candidate applied to any of this company's jobs
            $hasApplied = JobApplication::where('user_id', $id)
                ->whereHas('job', function($query) use ($companyId) {
                    $query->where('company_id', $companyId);
                })
                ->exists();

            if (!$hasApplied) {
                return response()->json([
                    'message' => 'Access denied. This candidate has not applied to any of your jobs.'
                ], 403);
            }

            // Load full candidate data
            $candidate->load([
                'jobApplications' => function($query) use ($companyId) {
                    $query->whereHas('job', function($jobQuery) use ($companyId) {
                        $jobQuery->where('company_id', $companyId);
                    })->with(['job:id,title,company_id', 'testResults']);
                }
            ]);

            return response()->json([
                'message' => 'Candidate profile retrieved successfully',
                'candidate' => [
                    'id' => $candidate->id,
                    'first_name' => $candidate->first_name,
                    'last_name' => $candidate->last_name,
                    'email' => $candidate->email,
                    'phone' => $candidate->phone,
                    'bio' => $candidate->bio,
                    'title' => $candidate->title,
                    'address' => $candidate->address,
                    'resume' => $candidate->resume,
                    'profile_image' => $candidate->profile_image,
                    'applications' => $candidate->jobApplications
                ]
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error fetching candidate: ' . $e->getMessage(), [
                'candidate_id' => $id,
                'user_id' => $request->user()->id,
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Failed to fetch candidate',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get candidate's resume
     */
    public function getResume(Request $request, $id)
    {
        try {
            $employer = $request->user();
            
            if (!$employer->company_id) {
                return response()->json([
                    'message' => 'Company profile not found'
                ], 404);
            }

            $companyId = $employer->company_id;

            // Check access
            $hasApplied = JobApplication::where('user_id', $id)
                ->whereHas('job', function($query) use ($companyId) {
                    $query->where('company_id', $companyId);
                })
                ->exists();

            if (!$hasApplied) {
                return response()->json([
                    'message' => 'Access denied'
                ], 403);
            }

            $candidate = User::find($id);
            
            if (!$candidate) {
                return response()->json([
                    'message' => 'Candidate not found'
                ], 404);
            }

            if (!$candidate->resume) {
                return response()->json([
                    'message' => 'Resume not uploaded'
                ], 404);
            }

            return response()->json([
                'message' => 'Resume retrieved successfully',
                'resume' => [
                    'filename' => basename($candidate->resume),
                    'file_url' => url('storage/' . $candidate->resume),
                    'uploaded_at' => $candidate->updated_at
                ]
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error fetching resume: ' . $e->getMessage(), [
                'candidate_id' => $id,
                'user_id' => $request->user()->id
            ]);
            
            return response()->json([
                'message' => 'Failed to fetch resume',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}