<?php

namespace App\Http\Controllers;

use App\Models\CompanyApp;
use App\Models\CompanyContact;
use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\Contact;

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
        $toNumber = $request->to_number; 
        $fromNumber = $request->from_number; 
        $bussinessWhatsappId = $request->business_whatsapp_id; 
        $messageId = $request->messageId; 
        $phoneNumberId = $request->phoneNumberId; 
        $messageType = $request->message_type;
        $messageText = $request->message_text; 
        
        $companyApp = CompanyApp::where('whatsapp_business_id', $bussinessWhatsappId)->first(); 
        $contact = Contact::where('phone_number', $toNumber)->first();
            
        return Chat::create([
            'contact_id'       => $contact->id,
            'company_id'       => $companyApp->company_id,
            'message_id'       => $messageId,
            'phone_number_id'  => $phoneNumberId,
            'from_number'      => $fromNumber,
            'to_number'        => $toPhoneNumber ?? null,
            'direction'        => 'inbound',
            'message_type'     => $messageType,
            'message_text'     => $messageText,
            'status'           => 'received',
        ]);
    }
}
