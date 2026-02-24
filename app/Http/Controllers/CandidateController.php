<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CandidateController extends Controller
{
    /**
     * Get all candidates who applied to employer's jobs
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $employer = Auth::user();
            $company = $employer->company;

            if (!$company) {
                return response()->json([
                    'message' => 'Company profile not found. Please complete your company setup.'
                ], 404);
            }

            // Get filter parameters
            $search = $request->query('search');
            $status = $request->query('status');
            $jobId = $request->query('job_id');

            // Build query
            $query = User::where('app_role', 'candidate')
                ->whereHas('jobApplications', function($q) use ($company, $status, $jobId) {
                    $q->whereHas('job', function($jobQuery) use ($company) {
                        $jobQuery->where('company_id', $company->id);
                    });
                    
                    if ($status) {
                        $q->where('status', $status);
                    }
                    
                    if ($jobId) {
                        $q->where('job_id', $jobId);
                    }
                });

            // Search by name or email
            if ($search) {
                $query->where(function($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                      ->orWhere('last_name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
                });
            }

            // Load relationships and paginate
            $candidates = $query->with([
                    'candidateProfile',
                    'jobApplications' => function($query) use ($company) {
                        $query->whereHas('job', function($q) use ($company) {
                            $q->where('company_id', $company->id);
                        })
                        ->with('job:id,title,company_id')
                        ->latest();
                    }
                ])
                ->paginate(20);

            return response()->json([
                'message' => 'Candidates retrieved successfully',
                'candidates' => $candidates
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Error fetching candidates: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch candidates',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get specific candidate profile with full details
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $employer = Auth::user();
            $company = $employer->company;

            if (!$company) {
                return response()->json([
                    'message' => 'Company profile not found. Please complete your company setup.'
                ], 404);
            }

            // Find candidate with all details
            $candidate = User::where('id', $id)
                ->where('app_role', 'candidate')
                ->with([
                    'candidateProfile',
                    'candidateProfile.experiences' => function($query) {
                        $query->orderBy('start_date', 'desc');
                    },
                    'candidateProfile.educations' => function($query) {
                        $query->orderBy('start_date', 'desc');
                    },
                    'candidateProfile.certifications' => function($query) {
                        $query->orderBy('issue_date', 'desc');
                    },
                    'candidateProfile.socialLinks',
                    'jobApplications' => function($query) use ($company) {
                        $query->whereHas('job', function($q) use ($company) {
                            $q->where('company_id', $company->id);
                        })
                        ->with(['job', 'testResults'])
                        ->latest();
                    }
                ])
                ->first();

            if (!$candidate) {
                return response()->json([
                    'message' => 'Candidate not found'
                ], 404);
            }

            // Verify employer has access to this candidate
            $hasApplied = $candidate->jobApplications()
                ->whereHas('job', function($query) use ($company) {
                    $query->where('company_id', $company->id);
                })
                ->exists();

            if (!$hasApplied) {
                return response()->json([
                    'message' => 'Access denied. This candidate has not applied to any of your jobs.'
                ], 403);
            }

            return response()->json([
                'message' => 'Candidate profile retrieved successfully',
                'candidate' => $candidate
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Error fetching candidate profile: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch candidate profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get candidate's resume/CV file
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getResume($id)
    {
        try {
            $employer = Auth::user();
            $company = $employer->company;

            if (!$company) {
                return response()->json([
                    'message' => 'Company profile not found. Please complete your company setup.'
                ], 404);
            }

            // Find candidate
            $candidate = User::where('id', $id)
                ->where('app_role', 'candidate')
                ->first();

            if (!$candidate) {
                return response()->json([
                    'message' => 'Candidate not found'
                ], 404);
            }

            // Verify access
            $hasApplied = JobApplication::where('user_id', $candidate->id)
                ->whereHas('job', function($query) use ($company) {
                    $query->where('company_id', $company->id);
                })
                ->exists();

            if (!$hasApplied) {
                return response()->json([
                    'message' => 'Access denied. This candidate has not applied to any of your jobs.'
                ], 403);
            }

            // Get resume file
            $resume = $candidate->files()
                ->where('file_type', 'CandidateResume')
                ->latest()
                ->first();

            if (!$resume) {
                return response()->json([
                    'message' => 'Resume not found for this candidate'
                ], 404);
            }

            // Check if file exists
            if (!Storage::disk('public')->exists($resume->file_path)) {
                return response()->json([
                    'message' => 'Resume file not found on server'
                ], 404);
            }

            return response()->json([
                'message' => 'Resume retrieved successfully',
                'resume' => [
                    'id' => $resume->id,
                    'filename' => $resume->filename,
                    'file_path' => $resume->file_path,
                    'file_url' => asset('storage/' . $resume->file_path),
                    'file_size' => $resume->file_size ?? null,
                    'mime_type' => $resume->mime_type ?? 'application/pdf',
                    'uploaded_at' => $resume->created_at,
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Error fetching candidate resume: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch resume',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all applications by this candidate to employer's jobs
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getApplications($id)
    {
        try {
            $employer = Auth::user();
            $company = $employer->company;

            if (!$company) {
                return response()->json([
                    'message' => 'Company profile not found. Please complete your company setup.'
                ], 404);
            }

            // Verify candidate exists
            $candidate = User::where('id', $id)
                ->where('app_role', 'candidate')
                ->first();

            if (!$candidate) {
                return response()->json([
                    'message' => 'Candidate not found'
                ], 404);
            }

            // Get all applications by this candidate to company's jobs
            $applications = JobApplication::where('user_id', $id)
                ->whereHas('job', function($query) use ($company) {
                    $query->where('company_id', $company->id);
                })
                ->with([
                    'job:id,title,company_id,location,job_type,salary_min,salary_max',
                    'testResults'
                ])
                ->orderBy('created_at', 'desc')
                ->get();

            if ($applications->isEmpty()) {
                return response()->json([
                    'message' => 'No applications found for this candidate',
                    'applications' => []
                ], 200);
            }

            return response()->json([
                'message' => 'Applications retrieved successfully',
                'applications' => $applications,
                'total' => $applications->count()
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Error fetching candidate applications: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch applications',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
