<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\WorkflowRequest;
use App\Models\Workflow;
use App\Enums\IntegrationTypeEnum;
use App\Http\Requests\GetWorkflowsRequest;
use App\Services\WorkflowService;
use App\Http\Requests\IntegrationRequest;
use App\Services\IntegrationService;

class IntegrationController extends Controller
{

    function integrate(IntegrationRequest $request){
        $dto = $request->getDTO();
        $integrationService = app(IntegrationService::class)->execute($request->type, $dto); 

        return response()->success([], 'Integrated successfully.'); 
    }

}
