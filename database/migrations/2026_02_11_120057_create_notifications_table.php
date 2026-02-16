<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('notifications', function (Blueprint $table) {
            // Remove wrong columns
            $table->dropColumn(['user_id', 'title', 'message', 'is_read', 'status']);
            
            // Add correct columns
            $table->string('notifiable_type')->after('type');
            $table->unsignedBigInteger('notifiable_id')->after('notifiable_type');
            $table->text('data')->after('notifiable_id');
            $table->timestamp('read_at')->nullable()->after('data');
            
            // Add index
            $table->index(['notifiable_type', 'notifiable_id']);
        });
        
        // Change id to UUID if not already
        DB::statement('ALTER TABLE notifications MODIFY id CHAR(36)');
    }

    public function down()
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->dropColumn(['notifiable_type', 'notifiable_id', 'data', 'read_at']);
            $table->unsignedBigInteger('user_id');
            $table->string('title');
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->string('status')->default('unread');
        });
    }
};