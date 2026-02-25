<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendNewsletterNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $subject;
    protected $content;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $subject, string $content)
    {
        $this->subject = $subject;
        $this->content = $content;
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
            ->subject($this->subject)
            ->view('emails.newsletter', [
                'subject' => $this->subject,
                'content' => $this->content,
                'email' => $notifiable->email,
                'name' => $notifiable->name,
                'unsubscribeUrl' => $unsubscribeUrl,
            ]);
    }
}