<?php

namespace App\DTOs;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class ScheduleDTO
{
    public function __construct(
        public string $initialDate,
        public string $interval,
        public int $durationBetween,
        public bool $isRecurring,
        public string $action,
    ) {}

    public static function fromArray(array $data): self
    {
        $validator = Validator::make($data, [
            'initialDate'     => ['required', 'date'],
            'interval'        => ['required', Rule::in(['hour', 'minute', 'seconds', 'day', 'week', 'month'])],
            'durationBetween' => ['required', 'integer', 'min:1'],
            'isRecurring'     => ['required', 'boolean'],
            'action'          => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return new self(
            $data['initialDate'],
            $data['interval'],
            (int) $data['durationBetween'],
            (bool) $data['isRecurring'],
            $data['action'],
        );
    }
}
