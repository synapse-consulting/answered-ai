<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use App\Enums\IntegrationEnum;

class IntegrationRequest extends BaseApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // set to true if request should be allowed
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', Rule::in(IntegrationEnum::all())],
            'configuration' => ['required', 'array'],
        ];
    }

    public function getDTO(): object
    {
      
        return match ($this->input('type')) {
            IntegrationEnum::SMTP => \App\DTOs\SmtpConfigDTO::fromArray($this->input('configuration')),
            IntegrationEnum::SLACK => \App\DTOs\SlackDTO::fromArray($this->input('configuration')),
            IntegrationEnum::SCHEDULE => \App\DTOs\ScheduleDTO::fromArray($this->input('configuration')),
            
            default => throw new \InvalidArgumentException("Unsupported integration type"),
        };
    }

}
