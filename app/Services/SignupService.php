<?php

namespace App\Services;

use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class SignupService
{
    public function register(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            $company = Company::create([
                'name' => $data['company_name'],
                'business_whatsapp' => $data['business_whatsapp'] ?? null,
            ]);

            $user->companies()->attach($company->id);

            return $user;
        });
    }

}
