<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Credential;
use App\Models\Workflow;

class WorkflowController extends Controller
{
    public function index()
    {
       $workflows = Workflow::get();
       return response()->json(['workflows' => $workflows]);
    }

    public function show(int $workflowId)
    {   
        $workflow = Workflow::find($workflowId); 
        return response()->json(['workflow' => $workflow]);
    }

}
