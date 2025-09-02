<?php

namespace App\Services;

use App\Models\Credential;

class BaseService
{
    function getCredentials(int $credentialId){
        return Credential::find($credentialId)->configuration; 
    }
}
