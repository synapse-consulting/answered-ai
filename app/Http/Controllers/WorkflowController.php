<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Workflow;
use App\Models\Intent;

class WorkflowController extends Controller
{
    public function index(Request $request)
    {
        $workflows = Workflow::with('intent')->get();
        $intents   = Intent::pluck('name','id')->toArray(); 

        $data = [
            'workflows' => $workflows,
            'intents'   => $intents,
        ]; 

        if ($request->wantsJson()) {
            return response()->json($data);
        }
        return view('workflows.index', $data);
    }

    function create(Request $request){
        return view('layouts/react-app');    
    }
    
    function store(Request $request){
        $workflow = Workflow::create($request->all());
        return response()->json(['workflow' => $workflow]); 
    }

    function edit(Request $request, Workflow $workflow){             
        return view('layouts/react-app');    
    }

    public function update(Request $request, Workflow $workflow)
    {
        try {
            $workflow->update($request->all());
            return response()->json(['workflow' => $workflow]);
        } catch (\Exception $e) {
            error('Failed to update workflow', [], $e);
            return response()->json(['error' => 'Failed to update workflow'], 500);
        }
    }

    public function destroy(Workflow $workflow)
    {
        try {
            $workflow->delete();
        } catch (\Exception $e) {
            error('Failed to delete workflow', [], $e);
        }
        return response()->json(['workflow' => $workflow]); 
    }    
}