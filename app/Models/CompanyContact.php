<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyContact extends Model
{
    use HasFactory;

    protected $fillable = ['contact_id', 'company_id', 'app_id']; 

    function company(){
        return $this->belongsTo(Company::class); 
    }

    function contact(){
        return $this->belongsTo(Contact::class); 
    }
    
    function companyApp(){
        return $this->belongsTo(CompanyApp::class); 
    }
}
