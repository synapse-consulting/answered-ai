<?php

namespace App\Http\Requests;

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
            'configuration' => 'required',
        ];
        
        if($this->isMethod('post')){
            $data['company_id'] = 'required|integer'; 
        }
        return $data;
    }
}
