<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasCompany; 

class Workflow extends Model
{
    use HasFactory, HasCompany;

    protected $fillable = ['company_id', 'name', 'executable_flow', 'intent_id']; 

    protected $casts = [
        'executable_flow' => 'array'
    ]; 

    function intent(){
        return $this->belongsTo(Intent::class);
    }

    function company(){
        return $this->belongsTo(Company::class); 
    }
}
