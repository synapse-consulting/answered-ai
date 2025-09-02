<?php

namespace App\DTOs;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class SlackConfigDTO
{
    public function __construct(
        public string $webhook_url,
        public ?string $channel = null,
        public ?string $username = null,
    ) {}

    public static function fromArray(array $data): self
    {
        $validator = Validator::make($data, [
            'webhook_url' => ['required', 'url'],
            'channel' => ['nullable', 'string'],
            'username' => ['nullable', 'string'],
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return new self(
            $data['webhook_url'],
            $data['channel'] ?? null,
            $data['username'] ?? null,
        );
    }
}
