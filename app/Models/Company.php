<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'business_whatsapp',
    ];

    /**
     * Users that belong to the company.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'company_users', 'company_id', 'user_id')
                    ->withTimestamps();
    }

    function workflows(){
        return $this->hasMany(Workflow::class); 
        
    }
}
