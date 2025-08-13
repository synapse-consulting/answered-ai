<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'contact_id',
        'company_id',
        'message_id',
        'phone_number_id',
        'from_number',
        'to_number',
        'direction',
        'message_type',
        'message_text',
        'media_url',
        'media_mime_type',
        'timestamp',
        'status',
    ];

    protected $casts = [
        'timestamp' => 'datetime', 
        'created_at' => 'datetime'
    ];
}
