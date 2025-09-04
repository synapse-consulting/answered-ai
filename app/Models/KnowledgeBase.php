<?php

namespace App\Models;

use App\Traits\HasCompany;
use App\Traits\HasUser;
use Illuminate\Database\Eloquent\Model;

class KnowledgeBase extends Model
{
    use HasCompany, HasUser;     

    protected $fillable = ['title', 'type', 'url', 'user_id', 'company_id', 'status', 'task_id'];

}
