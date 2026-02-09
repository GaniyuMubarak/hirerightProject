<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class StaffInvitationNotification extends Notification
{
    use Queueable;

    protected $company;
    protected $role;
    protected $invitationToken;
    protected $invitedBy;

    public function __construct($company, $role, $invitationToken, $invitedBy)
    {
        $this->company = $company;
        $this->role = $role;
        $this->invitationToken = $invitationToken;
        $this->invitedBy = $invitedBy;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $registerUrl = env('FRONTEND_URL', 'https://hirerightapp.com') . '/register/staff?token=' . $this->invitationToken;
        
        return (new MailMessage)
            ->subject('You\'ve been invited to join ' . $this->company->name)
            ->view('emails.staff-invitation', [
                'companyName' => $this->company->name,
                'role' => $this->role,
                'invitedBy' => $this->invitedBy,
                'registerUrl' => $registerUrl,
            ]);
    }
}