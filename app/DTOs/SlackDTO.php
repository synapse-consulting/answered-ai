<?php

namespace App\DTOs;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class SlackDTO
{
    public function __construct(
        public string $webhookUrl,
        public ?string $message = null,
    ) {}

    public static function fromArray(array $data): self
    {
        $validator = Validator::make($data, [
            'webhookUrl' => ['required', 'url'],
            'message' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return new self(
            $data['webhookUrl'],
            $data['message'],
        );
    }
}
