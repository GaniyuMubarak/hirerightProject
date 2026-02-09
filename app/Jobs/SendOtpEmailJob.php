<?php

namespace App\Jobs;

use App\Mail\SendOtpEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendOtpEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;
    protected $otp;
    
    public $tries = 3;
    public $timeout = 60;

    public function __construct($user, $otp)
    {
        $this->user = $user;
        $this->otp = $otp;
    }

    public function handle()
    {
        try {
            // Use Laravel Mail facade (SMTP from .env)
            Mail::to($this->user->email)->send(new SendOtpEmail($this->user, $this->otp));
            
            \Log::info('OTP Email sent successfully', [
                'email' => $this->user->email,
                'user_id' => $this->user->id
            ]);
        } catch (\Exception $e) {
            \Log::error('Email sending failed', [
                'error' => $e->getMessage(),
                'email' => $this->user->email
            ]);
            throw $e;
        }
    }
}