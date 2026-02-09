<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ApplicationReceivedNotification extends Notification
{
    use Queueable;

    protected $application;
    protected $job;
    protected $company;

    public function __construct($application, $job, $company)
    {
        $this->application = $application;
        $this->job = $job;
        $this->company = $company;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        $applicationUrl = env('FRONTEND_URL', 'https://hirerightapp.com') . '/candidate/applications/' . $this->application->id;
        
        return (new MailMessage)
            ->subject('Application Received - ' . $this->job->title)
            ->view('emails.application-received', [
                'candidateName' => $notifiable->first_name,
                'jobTitle' => $this->job->title,
                'companyName' => $this->company->name,
                'applicationUrl' => $applicationUrl,
                'applicationDate' => $this->application->created_at->format('F d, Y'),
            ]);
    }

    public function toArray($notifiable)
    {
        return [
            'type' => 'application_received',
            'application_id' => $this->application->id,
            'job_title' => $this->job->title,
            'company_name' => $this->company->name,
            'message' => 'Your application for ' . $this->job->title . ' has been received',
        ];
    }
}