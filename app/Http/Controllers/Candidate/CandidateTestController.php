<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Models\TestAssignment;
use App\Models\TestAnswer;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CandidateTestController extends Controller
{
    /**
     * 1️⃣ GET /candidates/tests
     * Get all tests for authenticated candidate
     */
    public function index(Request $request)
    {
        try {
            $user = $request->user();

            $assignments = TestAssignment::where('user_id', $user->id)
                ->with([
                    'test:id,title,description,duration_minutes,passing_score',
                    'jobApplication.job:id,title,company_id',
                    'jobApplication.job.company:id,name'
                ])
                ->get();

            // Split into pending and completed
            $pending = [];
            $completed = [];

            foreach ($assignments as $assignment) {
                $data = [
                    'id' => $assignment->id,
                    'test_id' => $assignment->test_id,
                    'source' => $assignment->source,
                    'status' => $assignment->isExpired() ? 'expired' : $assignment->status,
                    'assigned_at' => $assignment->assigned_at->toISOString(),
                    'deadline' => $assignment->deadline?->toISOString(),
                    'test' => [
                        'id' => $assignment->test->id,
                        'title' => $assignment->test->title,
                        'description' => $assignment->test->description,
                        'duration_minutes' => $assignment->test->duration_minutes,
                        'passing_score' => $assignment->test->passing_score,
                        'total_questions' => $assignment->test->questions()->count()
                    ],
                    'job_application' => [
                        'id' => $assignment->jobApplication->id,
                        'status' => $assignment->jobApplication->status,
                        'job' => [
                            'id' => $assignment->jobApplication->job->id,
                            'title' => $assignment->jobApplication->job->title,
                            'company' => [
                                'name' => $assignment->jobApplication->job->company->name
                            ]
                        ]
                    ]
                ];

                if ($assignment->isCompleted()) {
                    $data['score'] = $assignment->score;
                    $data['passed'] = $assignment->passed;
                    $data['completed_at'] = $assignment->completed_at?->toISOString();
                    $data['feedback'] = $assignment->feedback;
                    $completed[] = $data;
                } else {
                    $pending[] = $data;
                }
            }

            return response()->json([
                'status' => 'success',
                'data' => [
                    'pending' => $pending,
                    'completed' => $completed
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching candidate tests', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()->id
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch tests'
            ], 500);
        }
    }

    /**
     * 2️⃣ POST /candidates/tests/:assignmentId/start
     * Start a test session
     */
    public function start(Request $request, $assignmentId)
    {
        try {
            $user = $request->user();

            // Find assignment and verify ownership
            $assignment = TestAssignment::where('id', $assignmentId)
                ->where('user_id', $user->id)
                ->with([
                    'test',
                    'jobApplication.job:id,title,company_id',
                    'jobApplication.job.company:id,name'
                ])
                ->firstOrFail();

            // Validation checks
            if ($assignment->isCompleted()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Test already completed'
                ], 400);
            }

            if ($assignment->isExpired()) {
                $assignment->update(['status' => 'expired']);
                return response()->json([
                    'status' => 'error',
                    'message' => 'Test deadline has passed'
                ], 400);
            }

            if ($assignment->session_id && $assignment->isInProgress()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Test session already started'
                ], 400);
            }

            // Start the test
            $sessionId = $assignment->generateSessionId();
            $expiresAt = now()->addMinutes($assignment->test->duration_minutes);

            $assignment->update([
                'status' => 'in_progress',
                'started_at' => now(),
                'expires_at' => $expiresAt
            ]);

            // Get questions with options
            $questions = Question::where('test_id', $assignment->test_id)
                ->with('options:id,question_id,option_text')
                ->get()
                ->map(function ($question) {
                    return [
                        'id' => $question->id,
                        'question_text' => $question->question_text,
                        'question_type' => $question->question_type,
                        'points' => $question->points,
                        'options' => $question->options->map(function ($option) {
                            return [
                                'id' => $option->id,
                                'option_text' => $option->option_text
                            ];
                        })
                    ];
                });

            return response()->json([
                'status' => 'success',
                'data' => [
                    'session_id' => $sessionId,
                    'assignment_id' => $assignment->id,
                    'time_remaining' => $assignment->calculateTimeRemaining(),
                    'test' => [
                        'id' => $assignment->test->id,
                        'title' => $assignment->test->title,
                        'description' => $assignment->test->description,
                        'duration_minutes' => $assignment->test->duration_minutes,
                        'passing_score' => $assignment->test->passing_score,
                        'total_questions' => $questions->count()
                    ],
                    'job_application' => [
                        'id' => $assignment->jobApplication->id,
                        'job' => [
                            'id' => $assignment->jobApplication->job->id,
                            'title' => $assignment->jobApplication->job->title,
                            'company' => [
                                'name' => $assignment->jobApplication->job->company->name
                            ]
                        ]
                    ],
                    'questions' => $questions
                ]
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Test assignment not found'
            ], 404);

        } catch (\Exception $e) {
            Log::error('Error starting test', [
                'error' => $e->getMessage(),
                'assignment_id' => $assignmentId
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to start test'
            ], 500);
        }
    }

    /**
     * 3️⃣ POST /candidates/tests/:assignmentId/submit
     * Submit test answers
     */
    public function submit(Request $request, $assignmentId)
    {
        try {
            $user = $request->user();

            // Validate request
            $validator = Validator::make($request->all(), [
                'session_id' => 'nullable|string',
                'answers' => 'required|array',
                'answers.*.question_id' => 'required|exists:questions,id',
                'answers.*.answer' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Find assignment
            $assignment = TestAssignment::where('id', $assignmentId)
                ->where('user_id', $user->id)
                ->with(['test', 'jobApplication.job.company'])
                ->lockForUpdate()
                ->firstOrFail();

            // Security checks
            if ($assignment->isCompleted()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Test already submitted'
                ], 400);
            }

            if ($request->session_id && $assignment->session_id !== $request->session_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid session'
                ], 400);
            }

            // SERVER-SIDE TIME VALIDATION (CRITICAL)
            if ($assignment->expires_at && now()->isAfter($assignment->expires_at)) {
                $assignment->update(['status' => 'expired']);
                return response()->json([
                    'status' => 'error',
                    'message' => 'Test time expired'
                ], 400);
            }

            // Process answers and calculate score
            $result = $this->gradeTest($assignment, $request->answers);

            // Update assignment
            $timeTaken = now()->diffInSeconds($assignment->started_at);

            $assignment->update([
                'status' => 'completed',
                'completed_at' => now(),
                'score' => $result['score'],
                'passed' => $result['passed'],
                'time_taken_seconds' => $timeTaken,
                'feedback' => $this->generateFeedback($result)
            ]);

            return response()->json([
                'status' => 'success',
                'message' => $result['passed'] ? 'Congratulations! You passed the test.' : 'Test completed.',
                'data' => [
                    'score' => $result['score'],
                    'passed' => $result['passed'],
                    'total_questions' => $result['total_questions'],
                    'correct_answers' => $result['correct_answers'],
                    'time_taken_minutes' => round($timeTaken / 60, 2),
                    'completed_at' => $assignment->completed_at->toISOString(),
                    'feedback' => $assignment->feedback,
                    'job' => [
                        'id' => $assignment->jobApplication->job->id,
                        'title' => $assignment->jobApplication->job->title,
                        'company_name' => $assignment->jobApplication->job->company->name
                    ]
                ]
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Test assignment not found'
            ], 404);

        } catch (\Exception $e) {
            Log::error('Error submitting test', [
                'error' => $e->getMessage(),
                'assignment_id' => $assignmentId,
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to submit test'
            ], 500);
        }
    }

    /**
     * 4️⃣ GET /candidates/tests/:assignmentId/result
     * Get test result
     */
    public function result(Request $request, $assignmentId)
    {
        try {
            $user = $request->user();

            $assignment = TestAssignment::where('id', $assignmentId)
                ->where('user_id', $user->id)
                ->with(['test', 'jobApplication.job.company', 'answers.question'])
                ->firstOrFail();

            // Must be completed
            if (!$assignment->isCompleted()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Test not yet completed'
                ], 400);
            }

            $response = [
                'status' => 'success',
                'data' => [
                    'score' => $assignment->score,
                    'passed' => $assignment->passed,
                    'total_questions' => $assignment->answers->count(),
                    'correct_answers' => $assignment->answers->where('is_correct', true)->count(),
                    'time_taken_minutes' => round($assignment->time_taken_seconds / 60, 2),
                    'completed_at' => $assignment->completed_at->toISOString(),
                    'feedback' => $assignment->feedback,
                    'job' => [
                        'id' => $assignment->jobApplication->job->id,
                        'title' => $assignment->jobApplication->job->title,
                        'company_name' => $assignment->jobApplication->job->company->name
                    ]
                ]
            ];

            // Optional: Add per-question breakdown
            if ($request->query('detailed')) {
                $response['data']['question_feedback'] = $assignment->answers->map(function ($answer) {
                    return [
                        'question_id' => $answer->question_id,
                        'correct' => $answer->is_correct,
                        'points_earned' => $answer->points_earned,
                        'feedback' => $answer->is_correct ? 'Correct' : 'Incorrect'
                    ];
                });
            }

            return response()->json($response);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Test result not found'
            ], 404);

        } catch (\Exception $e) {
            Log::error('Error fetching test result', [
                'error' => $e->getMessage(),
                'assignment_id' => $assignmentId
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch result'
            ], 500);
        }
    }

    /**
     * Grade the test and save answers
     */
    protected function gradeTest($assignment, $answers)
    {
        $questions = Question::where('test_id', $assignment->test_id)
            ->with('options')
            ->get()
            ->keyBy('id');

        $totalPoints = 0;
        $earnedPoints = 0;
        $correctCount = 0;

        foreach ($answers as $answerData) {
            $questionId = $answerData['question_id'];
            $userAnswer = $answerData['answer'];
            
            $question = $questions->get($questionId);
            if (!$question) continue;

            $totalPoints += $question->points;

            // Determine if answer is correct
            $isCorrect = $this->checkAnswer($question, $userAnswer);
            $pointsEarned = $isCorrect ? $question->points : 0;

            if ($isCorrect) {
                $correctCount++;
                $earnedPoints += $pointsEarned;
            }

            // Save answer
            TestAnswer::create([
                'test_assignment_id' => $assignment->id,
                'question_id' => $questionId,
                'answer' => is_array($userAnswer) ? json_encode($userAnswer) : $userAnswer,
                'is_correct' => $isCorrect,
                'points_earned' => $pointsEarned
            ]);
        }

        $score = $totalPoints > 0 ? round(($earnedPoints / $totalPoints) * 100, 2) : 0;
        $passed = $score >= $assignment->test->passing_score;

        return [
            'score' => $score,
            'passed' => $passed,
            'total_questions' => count($answers),
            'correct_answers' => $correctCount
        ];
    }

    /**
     * Check if an answer is correct
     */
    protected function checkAnswer($question, $userAnswer)
    {
        switch ($question->question_type) {
            case 'single_choice':
            case 'true_false':
                $correctOption = $question->options->where('is_correct', true)->first();
                return $correctOption && $correctOption->id == $userAnswer;

            case 'multiple_choice':
                $correctIds = $question->options->where('is_correct', true)->pluck('id')->sort()->values()->toArray();
                $userIds = is_array($userAnswer) ? collect($userAnswer)->sort()->values()->toArray() : [];
                return $correctIds === $userIds;

            case 'short_answer':
                $correctAnswer = $question->correct_answer;
                return strtolower(trim($userAnswer)) === strtolower(trim($correctAnswer));

            default:
                return false;
        }
    }

    /**
     * Generate feedback based on score
     */
    protected function generateFeedback($result)
    {
        $score = $result['score'];

        if ($score >= 90) {
            return 'Excellent performance! You demonstrated strong understanding of the material.';
        } elseif ($score >= 80) {
            return 'Great job! You showed good grasp of the concepts.';
        } elseif ($score >= 70) {
            return 'Good effort! You passed the test.';
        } elseif ($score >= 60) {
            return 'You passed, but consider reviewing some topics.';
        } else {
            return 'Unfortunately, you did not pass. Please review the material and try again.';
        }
    }
}