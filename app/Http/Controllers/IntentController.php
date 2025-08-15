<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Intent;
class IntentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $intents = Intent::orderBy('name','asc')->get();
        return view('profile.company.intents.index', compact('intents'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Intent::create($request->all());

        return response()->json([
            'message' => 'Intent created successfully.',
            'status' => 'success',
        ], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $intent = Intent::find($id);
        $intent->update($request->all());

        return response()->json([
            'message' => 'Intent updated successfully.',
            'status' => 'success',
        ], 201);        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $intent = Intent::find($id);
        $intent->delete();

        return response()->json([
            'message' => 'Intent deleted successfully.',
            'status' => 'success',
        ], 200);
    }
}
