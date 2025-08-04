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
        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('contact_id')->constrained()->onDelete('cascade');
            $table->foreignId('company_id')->constrained()->onDelete('cascade'); 

            $table->string('message_id')->unique();           
            $table->string('phone_number_id');               
            $table->string('from_number');                    
            $table->string('to_number');                      

            $table->enum('direction', ['inbound', 'outbound']); 
            $table->string('message_type');                  
            
            $table->text('message_text')->nullable();         
            $table->text('media_url')->nullable();           
            $table->string('media_mime_type')->nullable();   

            $table->timestamp('timestamp')->nullable();     
            $table->string('status')->nullable();             

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chats');
    }
};
