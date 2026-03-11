<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TestAssignment extends Model
{
    protected $fillable = [
        'test_id',
        'job_application_id',
        'user_id',
        'candidate_id', // Keep for backward compatibility
        'stage_test_id', // Keep for backward compatibility
        'source',
        'status',
        'session_id',
        'assigned_at',
        'deadline',
        'started_at',
        'completed_at',
        'expires_at',
        'score',
        'passed',
        'time_taken_seconds',
        'feedback'
    ];

    protected $casts = [
        'assigned_at' => 'datetime',
        'deadline' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'expires_at' => 'datetime',
        'passed' => 'boolean',
        'score' => 'decimal:2'
    ];

    // Relationships
    public function test()
    {
        return $this->belongsTo(Test::class);
    }

    public function jobApplication()
    {
        return $this->belongsTo(JobApplication::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Backward compatibility
    public function candidate()
    {
        return $this->belongsTo(User::class, 'candidate_id');
    }

    public function answers()
    {
        return $this->hasMany(TestAnswer::class);
    }

    // Helper methods
    public function isPending()
    {
        return in_array($this->status, ['pending', 'assigned']);
    }

    public function isInProgress()
    {
        return $this->status === 'in_progress';
    }

    public function isCompleted()
    {
        return in_array($this->status, ['completed', 'graded']);
    }

    public function isExpired()
    {
        return $this->status === 'expired' || 
               ($this->deadline && now()->isAfter($this->deadline)) ||
               ($this->expires_at && now()->isAfter($this->expires_at));
    }

    public function generateSessionId()
    {
        $this->session_id = Str::uuid()->toString();
        $this->save();
        return $this->session_id;
    }

    public function calculateTimeRemaining()
    {
        if (!$this->expires_at) {
            return null;
        }
        
        $remaining = now()->diffInSeconds($this->expires_at, false);
        return max(0, $remaining);
    }
}