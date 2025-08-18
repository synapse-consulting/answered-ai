<?php

namespace App\Traits;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;

trait HasCompany
{
    protected static function bootHasCompany()
    {
        static::creating(function ($model) {
            if (Auth::check() && Auth::user()->currently_active_company_id) {
                $model->company_id = Auth::user()->currently_active_company_id;
            }
        });

        static::addGlobalScope('company_id', function (Builder $builder) {
            if (Auth::check() && Auth::user()->currently_active_company_id) {
                $builder->where($builder->getModel()->getTable() . '.company_id', Auth::user()->currently_active_company_id);
            }
        });
    }
}