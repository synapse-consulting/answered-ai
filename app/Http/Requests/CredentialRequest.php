<?php

namespace App\Http\Requests;

use App\Enums\IntegrationEnum;
use Illuminate\Validation\Rule;

class CredentialRequest extends BaseApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $data = [
            'name' => 'required',
            'configuration' => 'required|array',
        ];

        if ($this->isMethod('post')) {
            $data['company_id'] = 'required|integer';
            $data['type'] = ['required', Rule::in(IntegrationEnum::all())];
        }

        return $data;
    }
}
