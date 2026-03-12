<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('test_assignments', function (Blueprint $table) {
            // Add new columns if they don't exist
            if (!Schema::hasColumn('test_assignments', 'job_application_id')) {
                $table->foreignId('job_application_id')->nullable()->after('test_id')
                    ->constrained('job_applications')->onDelete('cascade');
            }
            
            if (!Schema::hasColumn('test_assignments', 'user_id')) {
                $table->foreignId('user_id')->nullable()->after('job_application_id')
                    ->constrained('users')->onDelete('cascade');
            }
            
            if (!Schema::hasColumn('test_assignments', 'source')) {
                $table->enum('source', ['job_posting', 'manual'])
                    ->default('job_posting')->after('user_id');
            }
            
            if (!Schema::hasColumn('test_assignments', 'session_id')) {
                $table->string('session_id')->nullable()->unique()->after('source');
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
            
            // Modify status enum to include new values
            DB::statement("ALTER TABLE test_assignments MODIFY COLUMN status ENUM('pending', 'assigned', 'in_progress', 'completed', 'expired', 'graded') DEFAULT 'pending'");
            
            // Add indexes
            if (!Schema::hasIndex('test_assignments', 'test_assignments_user_id_status_index')) {
                $table->index(['user_id', 'status']);
            }
            
            if (!Schema::hasIndex('test_assignments', 'test_assignments_session_id_index')) {
                $table->index('session_id');
            }
        });
    }

    public function down()
    {
        Schema::table('test_assignments', function (Blueprint $table) {
            // Drop new columns in reverse order
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
            
            // Restore original status enum
            DB::statement("ALTER TABLE test_assignments MODIFY COLUMN status ENUM('assigned', 'in_progress', 'completed', 'expired', 'graded') DEFAULT 'assigned'");
            
            // Drop indexes
            $table->dropIndex(['user_id', 'status']);
            $table->dropIndex('session_id');
        });
    }
};