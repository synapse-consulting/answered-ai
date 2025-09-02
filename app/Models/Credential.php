<?php

namespace App\Models;

use App\Traits\HasCompany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Credential extends Model
{
    use HasFactory;
    
    protected $fillable = ['name', 'configuration', 'company_id']; 

    protected $casts = [
        'configuration' => 'array'
    ]; 
}
