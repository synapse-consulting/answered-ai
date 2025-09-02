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
        Schema::table('workflows', function (Blueprint $table) {
            $table->dropForeign(['intent_id']);
            $table->dropColumn('intent_id');

            $table->json('system_flow')->nullable();
            $table->text('description')->nullable();            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('workflows', function (Blueprint $table) {
            $table->unsignedBigInteger('intent_id')->nullable();
            $table->foreign('intent_id')->references('id')->on('intents')->onDelete('cascade');
            
            $table->dropColumn('system_flow');            
            $table->dropColumn('description');            
        });
    }
};
