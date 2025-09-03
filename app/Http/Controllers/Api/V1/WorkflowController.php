<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\WorkflowRequest;
use Illuminate\Http\Request;
use App\Models\Credential;
use App\Models\Workflow;
use App\Enums\IntegrationTypeEnum;
use App\Http\Requests\GetWorkflowsRequest;
use App\Services\WorkflowService;
class WorkflowController extends Controller
{

    private $workflowService;
    
    function __construct(WorkflowService $workflowService){
        $this->workflowService = $workflowService;
    }

    public function index(GetWorkflowsRequest $request)
    {
       $type = $request->type ?? IntegrationTypeEnum::WHATSAPP; 
       $integrationId = $request->integration_id ?? null;  

       $workflows = $this->workflowService->getWorkflowByType($type, $integrationId); 

       return response()->json(['workflows' => $workflows]);
    }

    
    public function store(WorkflowRequest $request)
    {
        $workflow = Workflow::create($request->validated());

        return response()->json([
            'message' => 'Workflow created successfully.',
            'workflow' => $workflow
        ], 201);
    }

    public function update(WorkflowRequest $request, Workflow $workflow)
    {   
        $workflow->update($request->validated()); 

        return response()->json([
            'message' => 'Workflow updated successfully.',
            'workflow' => $workflow
        ], 200);
    }

    public function show(Workflow $workflow)
    {
        return response()->json(['Workflow' => $workflow]);
    }

}
