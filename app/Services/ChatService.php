<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Chat;
use App\Models\CompanyApp;
use App\Models\Contact;

class ChatService
{
    public function composeMessage(Request $request)
    {
        info('composeMessage(): Start', $request->all());

        $toNumber = $request->to_number;
        $fromNumber = $request->from_number;
        $bussinessWhatsappId = $request->business_whatsapp_id;
        $messageId = $request->messageId;
        $phoneNumberId = $request->phoneNumberId;
        $messageType = $request->message_type;
        $messageText = $request->message_text;

        $companyApp = CompanyApp::where('whatsapp_business_id', $bussinessWhatsappId)->first();

        if (!$companyApp) {
            error('composeMessage(): No CompanyApp found for WhatsApp Business ID', [
                'whatsapp_business_id' => $bussinessWhatsappId
            ]);
            return null;
        }

        $contact = Contact::where('phone_number', $toNumber)->first();

        if (!$contact) {
            error('composeMessage(): No Contact found for number', ['to_number' => $toNumber]);
            return null;
        }

        $chat = Chat::create([
            'contact_id'       => $contact->id,
            'company_id'       => $companyApp->company_id,
            'message_id'       => $messageId,
            'phone_number_id'  => $phoneNumberId,
            'from_number'      => $fromNumber,
            'to_number'        => $toNumber,
            'direction'        => 'inbound',
            'message_type'     => $messageType,
            'message_text'     => $messageText,
            'status'           => 'received',
        ]);

        info('composeMessage(): Chat saved', ['chat_id' => $chat->id]);

        $accessToken = optional($companyApp->company)->access_token;

        if (!$accessToken) {
            Log::error('composeMessage(): Access token not found for company', ['company_id' => $companyApp->company_id]);
            return null;
        }

        $response = $this->sendToWhatsapp($toNumber, $phoneNumberId, $accessToken);

        info('composeMessage(): End');
        return $response;
    }

    private function sendToWhatsapp($toNumber, $phoneNumberId, $accessToken, $templateName = 'hello_world', $languageCode = 'en_US')
    {
        info('sendToWhatsapp(): Start', [
            'to' => $toNumber,
            'phone_number_id' => $phoneNumberId,
            'template' => $templateName
        ]);

        $url = "https://graph.facebook.com/v22.0/{$phoneNumberId}/messages";

        $payload = [
            "messaging_product" => "whatsapp",
            "to" => $toNumber,
            "type" => "template",
            "template" => [
                "name" => $templateName,
                "language" => [
                    "code" => $languageCode
                ]
            ]
        ];

        try {
            $response = Http::withToken($accessToken)
                ->withHeaders(['Content-Type' => 'application/json'])
                ->post($url, $payload);

            if ($response->successful()) {
                info('sendToWhatsapp(): Message sent successfully');
            } else {
                error('sendToWhatsapp(): Message sending failed', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
            }

            return $response->json();

        } catch (\Exception $e) {
            error('sendToWhatsapp(): Something went wrong',[], $e);

            return ['error' => 'Failed to send message'];
        } finally {
            info('sendToWhatsapp(): End');
        }
    }
}
