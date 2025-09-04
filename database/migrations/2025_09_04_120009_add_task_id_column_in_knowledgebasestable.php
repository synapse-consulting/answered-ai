<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasColumn('knowledge_bases', 'task_id')) {
            Schema::table('knowledge_bases', function (Blueprint $table) {
                $table->text('task_id')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('knowledge_bases', 'task_id')) {
            Schema::table('knowledge_bases', function (Blueprint $table) {
                $table->dropColumn('task_id');
            });
        }
    }
};
