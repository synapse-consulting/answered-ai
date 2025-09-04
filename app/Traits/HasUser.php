<?php

namespace App\Traits;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;

trait HasUser
{
    protected static function bootHasUser()
    {
        static::creating(function ($model) {
            if (Auth::check() && Auth::user()->currently_active_company_id) {
                $model->user_id = Auth::user()->id;
            }
        });
    }
}