<?php

namespace App\Services;

use App\Enums\IntegrationEnum;
use App\Models\CompanyApp;
use App\Enums\IntegrationTypeEnum; 

class IntegrationService
{
    function execute(string $type, $dto){
        switch ($type) {
            case IntegrationEnum::SMTP:
                $service = new Integrations\SmtpIntegrationService($dto);
                $service->sendEmail();
            
                break;
            case IntegrationEnum::SMTP:
                
                break;
            
            default:
               
                break;
        }
    }
}
