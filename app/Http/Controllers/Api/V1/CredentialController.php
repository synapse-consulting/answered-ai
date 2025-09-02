<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Credential;

class CredentialController extends Controller
{
    
    public function index()
    {
        $credentials = Credential::with('company')->get();
        return response()->json(['credentials' => $credentials]);
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'configuration' => 'required|array',
        ]);

        $credential = Credential::create($validated);

        return response()->json([
            'message' => 'Credential created successfully.',
            'credential' => $credential
        ], 201);
    }

    public function show(Credential $credential)
    {
        return response()->json(['credential' => $credential]);
    }

  
    public function update(Request $request, Credential $credential)
    {
        $validated = $request->validate([
            'name'        => 'sometimes|required|string|max:255',
            'configuration' => 'sometimes|required|array',
            'company_id'  => 'sometimes|required|exists:companies,id',
        ]);

        $credential->update($validated);

        return response()->json([
            'message' => 'Credential updated successfully.',
            'credential' => $credential
        ]);
    }

   
    public function destroy(Credential $credential)
    {
        $credential->delete();

        return response()->json([
            'message' => 'Credential deleted successfully.'
        ]);
    }
}
