<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\WorkflowRequest;
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
