<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CredentialRequest;
use Illuminate\Http\Request;
use App\Models\Credential;

class CredentialController extends Controller
{
    
    public function index()
    {
        $credentials = Credential::with('company')->get();
        return response()->json(['credentials' => $credentials]);
    }

    
    public function store(CredentialRequest $request)
    {
        $credential = Credential::create($request->validated());

        return response()->json([
            'message' => 'Credential created successfully.',
            'credential' => $credential
        ], 201);
    }

    public function show(Credential $credential)
    {
        return response()->json(['credential' => $credential]);
    }

  
    public function update(CredentialRequest $request, Credential $credential)
    {

        $credential->update($request->validated());

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
