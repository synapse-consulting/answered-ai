<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\SlackMessage;
use Illuminate\Notifications\Messages\SlackAttachment;

class SlackNotification extends Notification
{
    use Queueable;

    protected string $message;
    
    public function __construct(string $message)
    {
        $this->message = $message;
    }

    public function via($notifiable): array
    {
        return ['slack'];
    }

    public function toSlack($notifiable): SlackMessage
    {
        return (new SlackMessage)
            ->to('#general')
            ->content($this->message);
    }
}

