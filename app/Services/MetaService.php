<?php

namespace App\Services;

use App\Enums\DirectionEnum;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use App\Models\CompanyApp;
use App\Enums\CompanyAppEnum;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\Contact;
use Carbon\Carbon;
use App\Models\CompanyContact;

class MetaService
{
    protected string $graphUrl = 'https://graph.facebook.com/v19.0';

    public function getAccessToken(string $code): ?string
    {
        $response = Http::get("$this->graphUrl/oauth/access_token", [
            'client_id' => config('constants.META_APP_ID'),
            'redirect_uri' => config('constants.META_REDIRECT_URI'),
            'client_secret' => config('constants.META_APP_SECRET'),
            'code' => $code,
        ]);

        return $response->successful() ? $response['access_token'] : null;
    }

    public function getBusinessId(string $accessToken)
    {
        $response = Http::withToken($accessToken)
            ->get("$this->graphUrl/me/businesses?fields=id");

        $body = json_decode($response->body());

        return isset($body?->data) ? $body?->data : [];
    }



    function getWabaId(string $accessToken, $businessId)
    {
        $response = Http::withToken($accessToken)
            ->get("$this->graphUrl/$businessId/owned_whatsapp_business_accounts");

        $body = json_decode($response->body());
        return $body;
    }

    public function storeIntegration(string $accessToken)
    {
        try {
            $user = Auth::user();
            $company = Company::find($user->currently_active_company_id);

            if (!$company) {
                info('Company not found for user', ['user_id' => $user->id]);
                return redirect()->route('meta.integration')->with('error', 'Company not found.');
            }

            $company->access_token = $accessToken;

            if ($company->save()) {
                info('fn:storeIntegration - Access Token saved', ['company_id' => $company->id]);
            }

            $businessIds = $this->getBusinessId($accessToken);

            if (empty($businessIds)) {
                info('No business IDs found', ['company_id' => $company->id]);
                return redirect()->route('meta.integration')->with('error', 'No business IDs found.');
            }

            $whatsappBusinessAccounts = [];

            foreach ($businessIds as $business) {
                $businessId = is_object($business) ? $business->id : $business['id'] ?? null;

                if (!$businessId) continue;

                $response = $this->getWabaId($accessToken, $businessId);

                if (isset($response->data) && !empty($response->data)) {
                    foreach ($response->data as $waba) {
                        if (!is_object($waba)) continue;

                        $waba->meta_business_id = $businessId;
                        $whatsappBusinessAccounts[] = $waba;
                    }
                }
            }

            if (empty($whatsappBusinessAccounts)) {
                info('No WhatsApp Business access provided from the customer', [
                    'company_id' => $company->id,
                    'user_id' => $user->id,
                ]);
                return redirect()->route('meta.integration')->with('error', 'Invalid permissions provided.');
            }

            info('whatsapp business accounts', [
                'accounts' => $whatsappBusinessAccounts
            ]);

            foreach ($whatsappBusinessAccounts as $waba) {
                if (isset($waba->id) && !empty($waba->id)) {
                    CompanyApp::updateOrCreate(
                        [
                            'company_id' => $company->id,
                            'meta_business_id' => $waba->meta_business_id,
                            'whatsapp_business_id' => $waba->id,
                        ],
                        [
                            'name' => $waba->name ?? 'Unknown',
                            'is_active' => true,
                        ]
                    );
                } else {
                    info('id not found', [
                        'meta_business_id' => $waba->meta_business_id ?? 'unknown'
                    ]);
                }
            }

            return true;
        } catch (\Throwable $th) {
            error('Failed to Store Integration', ['user_id' => Auth::id()], $th);
            return redirect()->route('meta.integration')->with('error', 'An error occurred during integration.');
        }

        return false;
    }


    function recieveMessage(Request $request)
    {
        $payload = json_decode($request->getContent(), true);

        info('Webhook Post Payload (Raw): ' . $request->getContent());
        info('Webhook Post Payload (Pretty): ' . json_encode($payload, JSON_PRETTY_PRINT));

        $entry = $payload['entry'][0]['changes'][0]['value'] ?? null;

        if (!$entry || !isset($entry['messages'][0])) {
            return response()->json(['error' => 'No valid message found'], 400);
        }

        $messageData = $entry['messages'][0];

        // === Extract values ===
        $businessWhatsAppId = $payload['entry'][0]['id'];
        $messageId       = $messageData['id'] ?? null;
        $fromNumber      = $messageData['from'] ?? null;
        $phoneNumberId   = $entry['metadata']['phone_number_id'] ?? null;
        $timestamp       = isset($messageData['timestamp']) ? Carbon::createFromTimestamp($messageData['timestamp']) : now();
        $messageType     = $messageData['type'] ?? 'text';
        $messageText     = $messageData['text']['body'] ?? null;
        $mediaUrl        = null;
        $mediaMimeType   = null;
        $contactName = $entry['contacts'][0]['profile']['name'] ?? null;


        // === Handle media types ===
        if (in_array($messageType, ['image', 'video', 'audio', 'document'])) {
            $mediaId = $messageData[$messageType]['id'] ?? null;
            $mediaMimeType = $messageData[$messageType]['mime_type'] ?? null;

            // Optionally: fetch media URL using WhatsApp Business API
            $mediaUrl = null; // placeholder for later fetching
        }

        $contact = Contact::firstOrCreate(
            ['phone_number' => $fromNumber],
            ['name' => $contactName]
        );

        // create entry in company
        $app = CompanyApp::where('whatsapp_business_id', $businessWhatsAppId)->first();


        // company contact 
        CompanyContact::firstOrCreate([
            'contact_id' => $contact->id,
            'company_id' => $app->company_id,
            'app_id' => $app->id,
        ]);

        return Chat::create([
            'contact_id'       => $contact->id,
            'company_id'       => $app->company_id,
            'message_id'       => $messageId,
            'phone_number_id'  => $phoneNumberId,
            'from_number'      => $fromNumber,
            'to_number'        => $entry['metadata']['display_phone_number'] ?? null,
            'direction'        => DirectionEnum::INBOUND,
            'message_type'     => $messageType,
            'message_text'     => $messageText,
            'media_url'        => $mediaUrl,
            'media_mime_type'  => $mediaMimeType,
            'timestamp'        => $timestamp,
            'status'           => 'received',
        ]);
    }
}
