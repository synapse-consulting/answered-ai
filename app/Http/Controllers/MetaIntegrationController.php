<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\MetaService;
use App\Models\CompanyApp; 

class MetaIntegrationController extends Controller
{
    protected MetaService $metaService;

    public function __construct(MetaService $metaService)
    {
        $this->metaService = $metaService;
    }

    public function redirectToMeta()
    {
        $query = http_build_query([
            'client_id' => config('constants.META_APP_ID'),
            'redirect_uri' => config('constants.META_REDIRECT_URI'),
            'state' => csrf_token(),
            'scope' => 'whatsapp_business_management business_management pages_messaging',
            'response_type' => 'code',
        ]);

        return redirect("https://www.facebook.com/v22.0/dialog/oauth?$query");
    }

    public function handleMetaCallback(Request $request)
    {
        $code = $request->get('code');

        $accessToken = $this->metaService->getAccessToken($code);

        if (!$accessToken) {
            return redirect()->route('dashboard')->with('error', 'Failed to get access token.');
            error('No access token'); 
        }

        $this->metaService->storeIntegration($accessToken);

        return redirect()->route('dashboard')->with('success', 'Meta integration completed!');
    }

    function webhook(Request $request)
    {
        info('Webhook Response', [
            'response' => $request->all()
        ]);

        // Get the query parameters
        $mode = $request->query('hub_mode');
        $token = $request->query('hub_verify_token');
        $challenge = $request->query('hub_challenge');

        // Replace this with your actual verify token
        $verifyToken = '12345';

        // Verify the webhook
        if ($mode === 'subscribe' && $token === $verifyToken) {
            // Respond with the challenge and 200 OK
            return response($challenge, 200);
        }

        // Respond with 403 Forbidden if verification fails
        return response()->json(['error' => 'Verification failed'], 403);
    }

    function webhookPost(Request $request){
        app(\App\Services\MetaService::class)->recieveMessage($request);
        return response()->json(['success' => 'Success'], 200);
    }
}
