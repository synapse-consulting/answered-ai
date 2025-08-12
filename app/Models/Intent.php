<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasCompany; 
class Intent extends Model
{
    use HasFactory, HasCompany;

    protected $fillable = ['company_id', 'name', 'description', 'status']; 

    function company(){
        return $this->belongsTo(Company::class); 
    }
}
