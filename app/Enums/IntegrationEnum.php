<?php

namespace App\Enums;

class IntegrationEnum
{
    const SMTP  = 'smtp';
    const SLACK = 'slack';

 
    public static function all(): array
    {
        return array_values((new \ReflectionClass(static::class))->getConstants());
    }
}
