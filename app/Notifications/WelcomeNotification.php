<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WelcomeNotification extends Notification
{
    use Queueable;

    protected $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $dashboardUrl = env('FRONTEND_URL', 'https://hirerightapp.com') . '/' . $this->user->app_role . '/dashboard';
        
        return (new MailMessage)
            ->subject('Welcome to HireRight! 🎉')
            ->view('emails.welcome', [
                'userName' => $this->user->first_name,
                'userRole' => $this->user->app_role,
                'dashboardUrl' => $dashboardUrl,
            ]);
    }
}