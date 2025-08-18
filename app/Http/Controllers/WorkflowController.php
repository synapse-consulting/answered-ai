<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Workflow;
use Illuminate\Support\Str;

class WorkflowController extends Controller
{
    function index(){
        $workflows = Workflow::with('intent')->paginate(10); 
        return view('workflows.index', compact('workflows'));
    }

    
    function create(Request $request){
        return view('layouts/react-app');    
    }
    
    function store(Request $request){
        $data = $request->all(); 
        $data['name'] = Str::random(7); 
        $data['executable_flow'] = $request->workflow; 
        $data['intent_id'] = $request->intent ?? 1; 
        $workflow = Workflow::create($data);
        return response()->json(['workflow' => $workflow]); 
    }

    public function destroy(Workflow $workflow)
    {
        try {
            $workflow->delete();
            return redirect()->route('workflows.index')->with('success', 'Workflow deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('workflows.index')->with('error', 'Failed to delete workflow');
        }
    }
}