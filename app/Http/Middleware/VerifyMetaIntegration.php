<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Company;

class VerifyMetaIntegration
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        // // if($user->email == 'admin@admin'){
        // //     return $next($request);
        // // }
        // return $next($request);
        
        // If no active company selected, assign the latest one
        if (!$user->currently_active_company_id) {
            $latestCompany = $user->companies()
                ->orderByDesc('created_at')
                ->first();

            if ($latestCompany) {
                $user->currently_active_company_id = $latestCompany->company_id ?? $latestCompany->id;
                $user->save();
            } else {
                abort(403, 'No companies found for this user.');
            }
        }

        $companyId = $user->currently_active_company_id;
        $company = Company::find($companyId);

        if (!$company) {
            abort(404, 'Company not found.');
        }

        if (!$company->access_token) {
            return redirect()->route('meta.integration');
        }

        return $next($request);
    }
}
