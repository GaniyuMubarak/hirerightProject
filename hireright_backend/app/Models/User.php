<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;


class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'company_id',
        'email',
        'phone',
        'phone_2',
        'signup_strategy',
        'reg_channel',
        'referral_code',
        'status',
        'firebase_device_token',
        'dob',
        'email_otp',
        'phone_otp',
        'password_otp',
        'login_otp',
        'password',
        'email_verified',
        'phone_verified',
        'app_role',
        'last_seen',
        'login_count',
        'address',
        'website',
        'bio',
        'title',
        'cover_letter',
        'linkedin_url',
        'twitter_url',
        'facebook_url',
        'instagram_url',
        'youtube_url',
        'tiktok_url'
    ];

    protected $hidden = [
        'password',
        'email_otp',
        'phone_otp',
        'password_otp',
        'login_otp',
    ];

    protected $casts = [
        'email_verified' => 'boolean',
        'phone_verified' => 'boolean',
        'dob' => 'date',
        'email_verified_at' => 'datetime',
        'phone_otp_expiry' => 'datetime',
        'email_otp_expiry' => 'datetime',
        'password_otp_expiry' => 'datetime',
        'login_otp_expiry' => 'datetime',
        'created_at' => 'datetime',
        'last_seen' => 'datetime',
        'password' => 'hashed',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function hasRole($role)
    {
        return $this->app_role === $role;
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }

    public function education()
    {
        return $this->hasMany(Education::class);
    }

    public function certifications()
    {
        return $this->hasMany(Certification::class);
    }
}
