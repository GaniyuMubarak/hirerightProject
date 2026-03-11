<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Only create if doesn't exist
        if (!Schema::hasTable('test_answers')) {
            Schema::create('test_answers', function (Blueprint $table) {
                $table->id();
                $table->foreignId('test_assignment_id')->constrained('test_assignments')->onDelete('cascade');
                $table->foreignId('question_id')->constrained('questions')->onDelete('cascade');
                $table->text('answer'); // Store as JSON for multiple choice
                $table->boolean('is_correct')->nullable();
                $table->decimal('points_earned', 5, 2)->default(0);
                $table->timestamps();
                
                $table->unique(['test_assignment_id', 'question_id']);
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('test_answers');
    }
};