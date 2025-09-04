<?php

namespace App\Http\Controllers;

use App\Models\KnowledgeBase;
use App\Services\KnowledgeBaseService;
use App\Http\Requests\KnowledgeBaseRequest;
use App\Http\Requests\UpdateKnowledgeStatus;
use Illuminate\Http\Request;


class KnowledgeBaseController extends Controller
{
    protected $service;

    public function __construct(KnowledgeBaseService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $knowledgeBases = KnowledgeBase::latest(); 
        if ($request->wantsJson()) {
            return response()->json(['data' => $knowledgeBases->get()]);
        }
        return view('knowledge-base.index', [
            'knowledgeBases' => $knowledgeBases->paginate(10)
        ]); 
    }

    public function store(KnowledgeBaseRequest $request)
    {
        $data = $request->validated(); 
        $kb = $this->service->store($data);
        return response()->json(['message' => 'Knowledge Base created', 'data' => $kb], 201);
    }

    public function show(KnowledgeBase $knowledgeBase)
    {
        return response()->json($knowledgeBase);
    }

    public function destroy(KnowledgeBase $knowledgeBase)
    {
        $this->service->delete($knowledgeBase);
        return response()->json(['message' => 'Knowledge Base deleted']);
    }

    function updateStatusByTask(UpdateKnowledgeStatus $request){
        $model = KnowledgeBase::where('task_id', $request->taskId)->first(); 
        $model->status = $request->status; 
        $model->save(); 

        return response()->json(['message' => 'Knowledge Status updated']);
    }

}
