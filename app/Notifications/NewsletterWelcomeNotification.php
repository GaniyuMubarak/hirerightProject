<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewsletterWelcomeNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $unsubscribeUrl = url("/api/newsletter/unsubscribe/{$notifiable->unsubscribe_token}");

        return (new MailMessage)
            ->subject('Welcome to HireRight Newsletter!')
            ->view('emails.newsletter-welcome', [
                'email' => $notifiable->email,
                'name' => $notifiable->name,
                'unsubscribeUrl' => $unsubscribeUrl,
            ]);
    }
}