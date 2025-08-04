<?php

namespace App\Http\Requests;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => static::passwordRules(),
            'password_confirmation' => ['required', 'same:password'],
            'company_name' => ['required', 'string', 'max:255'],
            'business_whatsapp' => ['required', 'string', 'max:20'],
        ];
    }

    public static function passwordRules(): array
    {
        return [
            'required',
            'confirmed', 
            Password::min(8)
                ->mixedCase()  
                ->numbers()     
                ->symbols()      
        ];
    }

}
