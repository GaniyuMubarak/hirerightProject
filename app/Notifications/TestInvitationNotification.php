<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TestInvitationNotification extends Notification
{
    use Queueable;

    protected $test;
    protected $job;
    protected $company;

    public function __construct($test, $job, $company)
    {
        $this->test = $test;
        $this->job = $job;
        $this->company = $company;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        $testUrl = env('FRONTEND_URL', 'https://hirerightapp.com') . '/candidate/tests/' . $this->test->id;
        
        return (new MailMessage)
            ->subject('Test Invitation - ' . $this->job->title)
            ->view('emails.test-invitation', [
                'candidateName' => $notifiable->first_name,
                'jobTitle' => $this->job->title,
                'companyName' => $this->company->name,
                'testTitle' => $this->test->title,
                'testDescription' => $this->test->description,
                'timeLimit' => $this->test->time_limit,
                'passingScore' => $this->test->passing_score,
                'testUrl' => $testUrl,
            ]);
    }

    public function toArray($notifiable)
    {
        return [
            'type' => 'test_invitation',
            'test_id' => $this->test->id,
            'job_id' => $this->job->id,
            'job_title' => $this->job->title,
            'company_name' => $this->company->name,
            'message' => 'You have been invited to take a test for ' . $this->job->title,
        ];
    }
}