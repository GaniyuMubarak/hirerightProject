<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecruitmentStage extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_id',
        'name',
        'description',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    /**
     * Get the job posting this stage belongs to.
     */
    public function job()
    {
        return $this->belongsTo(JobListing::class, 'job_id');
    }

    /**
     * Get the tests assigned to this stage.
     */
    public function tests()
    {
        return $this->belongsToMany(
            Test::class,
            'stage_test_mappings',
            'stage_id',
            'test_id'
        )->withPivot('is_required');
    }
}