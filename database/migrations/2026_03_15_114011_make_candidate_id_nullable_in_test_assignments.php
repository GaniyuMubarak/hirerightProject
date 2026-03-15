<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        // Make candidate_id and stage_test_id nullable
        DB::statement('ALTER TABLE test_assignments MODIFY candidate_id BIGINT UNSIGNED NULL');
        DB::statement('ALTER TABLE test_assignments MODIFY stage_test_id BIGINT UNSIGNED NULL');
    }

    public function down()
    {
        DB::statement('ALTER TABLE test_assignments MODIFY candidate_id BIGINT UNSIGNED NOT NULL');
        DB::statement('ALTER TABLE test_assignments MODIFY stage_test_id BIGINT UNSIGNED NOT NULL');
    }
};