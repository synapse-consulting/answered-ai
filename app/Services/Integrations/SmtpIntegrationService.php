<?php

namespace App\Services\Integrations;

use App\DTOs\SmtpConfigDTO;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Config;
use App\Services\BaseService; 

class SmtpIntegrationService extends BaseService
{
    public function __construct(protected SmtpConfigDTO $config)
    {
        $this->configureMailer();
    }

    protected function configureMailer(): void
    {
        $credential = (object) $this->getCredentials($this->config->credentialId);
        
        Config::set('mail.mailers.custom_mailer', [
            'transport' => 'smtp',
            'host' => $credential->host,
            'port' => $credential->port,
            'encryption' => $credential->encryption,
            'username' => $credential->username,
            'password' => $credential->password,
        ]);

        Config::set('mail.from', [
            'address' => $this->config->fromEmail,
            'name' => 'Custom SMTP',
        ]);
    }

    /**
     * Send a test email
     */
    public function sendEmail(): void
    {
        Mail::mailer('custom_mailer')->raw($this->config->body, function ($message) {
            $message->to($this->config->toEmail)->subject($this->config->subject);
        });
    }
}
