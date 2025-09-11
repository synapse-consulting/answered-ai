<?php

namespace App\DTOs;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class SmtpConfigDTO
{
    public function __construct(
        public string $subject,
        public string $body,
        public int $credentialId, 
        public string $toEmail, 
        public string $fromEmail, 
    ) {}

    public static function fromArray(array $data): self
    {
        $validator = Validator::make($data, [
            'subject' => ['required', 'string'],
            'body' => ['required'],
            'fromEmail' => ['required', 'email'],
            'toEmail' => ['required', 'email'],
            'credentialId' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return new self(
            $data['subject'],
            $data['body'],
            $data['credentialId'],
            $data['fromEmail'],
            $data['toEmail'],
        );
    }
}
