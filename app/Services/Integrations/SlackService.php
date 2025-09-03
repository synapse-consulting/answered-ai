<?php

namespace App\Services\Integrations;

use App\DTOs\SlackDTO;
use App\Services\BaseService; 
use Illuminate\Support\Facades\Notification;


class SlackService extends BaseService
{
    public function __construct(protected SlackDTO $slack)
    {
        $this->sendMessage($slack); 
    }
   
    public function sendMessage($slack): void
    {
        $message = $slack?->message ?? 'Message';
        Notification::route('slack', $slack->webhookUrl)
            ->notify(new \App\Notifications\SlackNotification($message));
    }
}
