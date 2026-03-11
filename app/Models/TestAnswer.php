<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TestAnswer extends Model
{
    protected $fillable = [
        'test_assignment_id',
        'question_id',
        'answer',
        'is_correct',
        'points_earned'
    ];

    protected $casts = [
        'is_correct' => 'boolean',
        'points_earned' => 'decimal:2'
    ];

    public function assignment()
    {
        return $this->belongsTo(TestAssignment::class, 'test_assignment_id');
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    // Helper to get answer as array for multiple choice
    public function getAnswerArray()
    {
        $decoded = json_decode($this->answer, true);
        return is_array($decoded) ? $decoded : [$this->answer];
    }
}