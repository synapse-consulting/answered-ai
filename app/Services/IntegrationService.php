<?php

namespace App\Services;

use App\Enums\IntegrationEnum;
use Illuminate\Support\Str;


class IntegrationService
{
    function execute(string $type, $dto)
    {
        $className = '\\App\\Services\\Integrations\\' . Str::studly($type) . 'Service';

        if (!class_exists($className)) {
            throw new \InvalidArgumentException("Integration service not found for type: {$type}");
        }

        $service = new $className($dto);

        if (method_exists($service, 'handle')) {
            return $service->handle();
        }

        return $service;
    }
}
