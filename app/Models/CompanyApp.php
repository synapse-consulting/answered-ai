<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyApp extends Model
{
    use HasFactory;

    protected $table = 'apps'; 

    protected $fillable = ['name', 'company_id', 'meta_business_id', 'name', 'whatsapp_business_id', 'is_active', 'metadata'];
    
    protected $casts = [
        'metadata' => 'array'
    ]; 
    
    function company(){
        return $this->belongsTo(Company::class); 
    }

    
}
