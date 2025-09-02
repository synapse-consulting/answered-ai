<?php

namespace App\Models;

use App\Traits\HasCompany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Credential extends Model
{
    use HasFactory, HasCompany;
    
    protected $fillable = ['name', 'configuration']; 

    protected $casts = [
        'configuration' => 'array'
    ]; 
}
