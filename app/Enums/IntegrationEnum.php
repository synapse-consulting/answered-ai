<?php

namespace App\Enums;

class IntegrationEnum
{
    const SMTP  = 'smtp';
    const SLACK = 'slack';
    const SCHEDULE = 'schedule'; 

 
    public static function all(): array
    {
        return array_values((new \ReflectionClass(static::class))->getConstants());
    }
}
