<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscriber;
use App\Notifications\NewsletterWelcomeNotification;
use App\Notifications\SendNewsletterNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class NewsletterController extends Controller
{
    /**
     * Subscribe to newsletter
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'name' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Check if already subscribed
            $existing = NewsletterSubscriber::where('email', $request->email)->first();

            if ($existing) {
                if ($existing->isSubscribed()) {
                    return response()->json([
                        'message' => 'This email is already subscribed to our newsletter'
                    ], 400);
                }

                // Resubscribe if previously unsubscribed
                $existing->resubscribe();
                $existing->notify(new NewsletterWelcomeNotification());

                return response()->json([
                    'message' => 'Welcome back! You have been resubscribed to our newsletter.',
                    'subscriber' => [
                        'email' => $existing->email,
                        'subscribed_at' => $existing->subscribed_at,
                    ]
                ], 200);
            }

            // Create new subscriber
            $subscriber = NewsletterSubscriber::create([
                'email' => $request->email,
                'name' => $request->name,
                'status' => 'active',
            ]);

            // Send welcome email
            $subscriber->notify(new NewsletterWelcomeNotification());

            Log::info('New newsletter subscriber', ['email' => $subscriber->email]);

            return response()->json([
                'message' => 'Successfully subscribed to newsletter! Check your email for confirmation.',
                'subscriber' => [
                    'email' => $subscriber->email,
                    'name' => $subscriber->name,
                    'subscribed_at' => $subscriber->subscribed_at,
                ]
            ], 201);

        } catch (\Exception $e) {
            Log::error('Newsletter subscription error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to subscribe to newsletter',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Unsubscribe from newsletter
     * 
     * @param string $token
     * @return \Illuminate\Http\JsonResponse
     */
    public function unsubscribe($token)
    {
        try {
            $subscriber = NewsletterSubscriber::where('unsubscribe_token', $token)->first();

            if (!$subscriber) {
                return response()->json([
                    'message' => 'Invalid unsubscribe link'
                ], 404);
            }

            if ($subscriber->status === 'unsubscribed') {
                return response()->json([
                    'message' => 'You are already unsubscribed from our newsletter',
                    'email' => $subscriber->email
                ], 200);
            }

            $subscriber->unsubscribe();

            Log::info('Newsletter unsubscribe', ['email' => $subscriber->email]);

            return response()->json([
                'message' => 'You have been successfully unsubscribed from our newsletter',
                'email' => $subscriber->email
            ], 200);

        } catch (\Exception $e) {
            Log::error('Newsletter unsubscribe error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to unsubscribe',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Send newsletter to all active subscribers (Admin only)
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function send(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $subscribers = NewsletterSubscriber::where('status', 'active')->get();

            if ($subscribers->isEmpty()) {
                return response()->json([
                    'message' => 'No active subscribers found',
                    'count' => 0
                ], 200);
            }

            $successCount = 0;
            $failedCount = 0;

            foreach ($subscribers as $subscriber) {
                try {
                    $subscriber->notify(new SendNewsletterNotification(
                        $request->subject,
                        $request->content
                    ));
                    $successCount++;
                } catch (\Exception $e) {
                    Log::error('Failed to send newsletter to: ' . $subscriber->email . ' - ' . $e->getMessage());
                    $failedCount++;
                }
            }

            Log::info('Newsletter sent', [
                'subject' => $request->subject,
                'total_subscribers' => $subscribers->count(),
                'successful' => $successCount,
                'failed' => $failedCount
            ]);

            return response()->json([
                'message' => "Newsletter sent successfully",
                'total_subscribers' => $subscribers->count(),
                'successful' => $successCount,
                'failed' => $failedCount
            ], 200);

        } catch (\Exception $e) {
            Log::error('Newsletter send error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to send newsletter',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all newsletter subscribers (Admin only)
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $status = $request->query('status'); // active, unsubscribed, or null for all

            $query = NewsletterSubscriber::query();

            if ($status && in_array($status, ['active', 'unsubscribed'])) {
                $query->where('status', $status);
            }

            $subscribers = $query->orderBy('created_at', 'desc')->paginate(50);

            return response()->json([
                'message' => 'Subscribers retrieved successfully',
                'subscribers' => $subscribers
            ], 200);

        } catch (\Exception $e) {
            Log::error('Newsletter subscribers fetch error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch subscribers',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}