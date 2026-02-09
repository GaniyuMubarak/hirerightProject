<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ApplicationStatusNotification extends Notification
{
    use Queueable;

    protected $application;
    protected $newStatus;

    public function __construct($application, $newStatus)
    {
        $this->application = $application;
        $this->newStatus = $newStatus;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        $applicationUrl = env('FRONTEND_URL', 'https://hirerightapp.com') . '/candidate/applications/' . $this->application->id;
        
        return (new MailMessage)
            ->subject($this->getSubject())
            ->view('emails.application-status', [
                'candidateName' => $notifiable->first_name,
                'jobTitle' => $this->application->jobListing->title,
                'companyName' => $this->application->jobListing->company->name,
                'status' => $this->newStatus,
                'applicationUrl' => $applicationUrl,
                'rejectionReason' => $this->application->rejection_reason,
            ]);
    }

    public function toArray($notifiable)
    {
        return [
            'type' => 'application_status_update',
            'application_id' => $this->application->id,
            'job_title' => $this->application->jobListing->title,
            'status' => $this->newStatus,
            'message' => $this->getMessage(),
        ];
    }

    private function getSubject()
    {
        switch ($this->newStatus) {
            case 'shortlisted':
                return '🎉 You\'ve been shortlisted!';
            case 'interview_scheduled':
                return '📅 Interview Scheduled - ' . $this->application->jobListing->title;
            case 'offered':
                return '🎊 Job Offer - ' . $this->application->jobListing->title;
            case 'hired':
                return '🎉 Congratulations! You\'ve been hired!';
            case 'rejected':
                return 'Application Update - ' . $this->application->jobListing->title;
            default:
                return 'Application Status Update';
        }
    }

    private function getMessage()
    {
        switch ($this->newStatus) {
            case 'shortlisted':
                return 'Your application has been shortlisted';
            case 'interview_scheduled':
                return 'An interview has been scheduled for your application';
            case 'offered':
                return 'You have received a job offer';
            case 'hired':
                return 'Congratulations! You have been hired';
            case 'rejected':
                return 'Your application status has been updated';
            default:
                return 'Your application status has been updated to ' . $this->newStatus;
        }
    }
}