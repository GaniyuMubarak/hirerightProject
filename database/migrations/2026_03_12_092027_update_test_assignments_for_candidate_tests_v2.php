<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::table('test_assignments', function (Blueprint $table) {
            // Only add if doesn't exist
            if (!Schema::hasColumn('test_assignments', 'job_application_id')) {
                $table->unsignedBigInteger('job_application_id')->nullable()->after('test_id');
                $table->foreign('job_application_id')->references('id')->on('job_applications')->onDelete('cascade');
            }
            
            if (!Schema::hasColumn('test_assignments', 'user_id')) {
                $table->unsignedBigInteger('user_id')->nullable()->after('job_application_id');
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            }
            
            if (!Schema::hasColumn('test_assignments', 'source')) {
                $table->enum('source', ['job_posting', 'manual'])->default('job_posting')->after('user_id');
            }
            
            if (!Schema::hasColumn('test_assignments', 'session_id')) {
                $table->string('session_id')->nullable()->after('source');
            }
            
            if (!Schema::hasColumn('test_assignments', 'assigned_at')) {
                $table->timestamp('assigned_at')->useCurrent()->after('session_id');
            }
            
            if (!Schema::hasColumn('test_assignments', 'deadline')) {
                $table->timestamp('deadline')->nullable()->after('assigned_at');
            }
            
            if (!Schema::hasColumn('test_assignments', 'time_taken_seconds')) {
                $table->integer('time_taken_seconds')->nullable()->after('passed');
            }
            
            if (!Schema::hasColumn('test_assignments', 'feedback')) {
                $table->text('feedback')->nullable()->after('time_taken_seconds');
            }
        });
        
        // Update status enum separately
        DB::statement("
            ALTER TABLE test_assignments 
            MODIFY COLUMN status ENUM('pending', 'assigned', 'in_progress', 'completed', 'expired', 'graded') 
            DEFAULT 'pending'
        ");
        
        // Add indexes
        Schema::table('test_assignments', function (Blueprint $table) {
            if (!Schema::hasIndex('test_assignments', 'test_assignments_user_id_status_index')) {
                $table->index(['user_id', 'status'], 'test_assignments_user_id_status_index');
            }
            
            if (!Schema::hasIndex('test_assignments', 'test_assignments_session_id_index')) {
                $table->index('session_id', 'test_assignments_session_id_index');
            }
        });
    }

    public function down()
    {
        Schema::table('test_assignments', function (Blueprint $table) {
            $table->dropIndex('test_assignments_user_id_status_index');
            $table->dropIndex('test_assignments_session_id_index');
            
            $table->dropForeign(['job_application_id']);
            $table->dropForeign(['user_id']);
            
            $table->dropColumn([
                'feedback',
                'time_taken_seconds',
                'deadline',
                'assigned_at',
                'session_id',
                'source',
                'user_id',
                'job_application_id'
            ]);
        });
        
        DB::statement("
            ALTER TABLE test_assignments 
            MODIFY COLUMN status ENUM('assigned', 'in_progress', 'completed', 'expired', 'graded') 
            DEFAULT 'assigned'
        ");
    }
};