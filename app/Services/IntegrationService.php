<?php

namespace App\Services;

use App\Enums\IntegrationEnum;

class IntegrationService
{
    function execute(string $type, $dto){
        switch ($type) {
            case IntegrationEnum::SMTP:
                $service = new Integrations\SmtpIntegrationService($dto);
                $service->sendEmail();
            
                break;
            case IntegrationEnum::SLACK:
                    new Integrations\SlackService($dto);
                break;
            case IntegrationEnum::SCHEDULE:
                    new Integrations\ScheduleService($dto);
                break;
            
            default:
               
                break;
        }
    }
}
