<?php

namespace App\Http\Controllers;

use App\Models\CompanyApp;
use App\Models\CompanyContact;
use Illuminate\Http\Request;
use App\Models\Chat;
use App\Services\ChatService;

class ChatController extends Controller
{
    function index(Request $request)
    {
        $company = CompanyApp::where('company_id', request()->user()->currently_active_company_id)->value('id');
        $appId = CompanyApp::where('company_id', $company)->value('id'); 

        if($request->has('app_id')){
            $appId = $request->app_id;
        }

        $apps = CompanyApp::where('company_id', request()->user()->currently_active_company_id)->get();
        $contacts = CompanyContact::where('app_id', $appId)->get(); 
        return view('chat', compact('apps', 'contacts'));
    }

    public function getMessages(Request $request, $contactId)
    {
        $chats = Chat::where('contact_id', $contactId)
            ->orderBy('timestamp', 'asc')
            ->get();

        $contact = CompanyContact::with('contact')->where('contact_id', $contactId)->first(); 

        return response()->json([
            'chats' => $chats,
            'contact' => $contact
        ]);
    }

    function composeMessage(Request $request){
        app(ChatService::class)->composeMessage($request); 
        return response()->json('Chat created succcessfully');
    }
}
