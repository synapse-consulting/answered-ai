<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KnowledgeBaseRequest extends BaseApiRequest
{
    public function authorize(): bool
    {
        return true;
    }

   public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'type'  => 'required|in:pdf,file,web',
            'file'  => 'nullable|file|mimes:pdf,doc,docx,txt|max:10240',
            'url'   => 'required_if:type,web|url',
        ];
    }
}
