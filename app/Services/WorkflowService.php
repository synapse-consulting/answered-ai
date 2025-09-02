<?php

namespace App\Services;

use App\Models\CompanyApp;
use App\Enums\IntegrationTypeEnum; 

class WorkflowService
{
    public function getWorkflowByType(string $type, string $integrationId){
       $company = $this->getCompanyByIntegration($type, $integrationId); 
       return $company?->workflows()->select('id', 'name', 'company_id', 'description')->get() ?? []; 
    }

    private function getCompanyByIntegration(string $type, string $integrationId){
        $company = null; 
        switch ($type) {
            case IntegrationTypeEnum::WHATSAPP:
                    $companyApp = CompanyApp::where('whatsapp_business_id', $integrationId)->first();
                    $company = $companyApp->company;
                break;
            default:
                break;
        }
        return $company;
    }
}
