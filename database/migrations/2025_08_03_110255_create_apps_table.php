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
        Schema::create('apps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')
                ->constrained()
                ->onDelete('cascade');
            $table->string('meta_business_id', 50)->nullable();
            $table->string('name', 150)->nullable();
            $table->string('whatsapp_business_id', 50)->nullable(); 
            $table->json('metadata')->nullable(); 
            $table->boolean('is_active')->default(false);            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apps');
    }
};
