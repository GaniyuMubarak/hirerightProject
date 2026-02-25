<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to HireRight Newsletter</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 16px;
            color: #333;
            margin-bottom: 20px;
        }
        .welcome-box {
            background: #e8f5e9;
            border-left: 4px solid #4CAF50;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
        }
        .welcome-box h3 {
            margin: 0 0 10px 0;
            color: #4CAF50;
            font-size: 18px;
        }
        .welcome-box p {
            margin: 0;
            color: #2e7d32;
        }
        .benefits {
            margin: 25px 0;
        }
        .benefits ul {
            padding-left: 20px;
        }
        .benefits li {
            margin-bottom: 10px;
            color: #555;
        }
        .signature {
            margin-top: 30px;
            font-size: 15px;
            line-height: 1.6;
        }
        .footer {
            background: #f8f9fa;
            padding: 25px 30px;
            text-align: center;
            font-size: 13px;
            color: #666;
            border-top: 1px solid #e0e0e0;
        }
        .footer p {
            margin: 8px 0;
        }
        .footer a {
            color: #667eea;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        .unsubscribe {
            margin-top: 15px;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 Welcome to HireRight Newsletter!</h1>
        </div>
        
        <div class="content">
            <p class="greeting">Dear {{ $name ?? 'Subscriber' }},</p>
            
            <div class="welcome-box">
                <h3>✨ Thank You for Subscribing!</h3>
                <p>You're now part of the HireRight community!</p>
            </div>
            
            <p>We're excited to have you on board. By subscribing to our newsletter, you'll receive:</p>
            
            <div class="benefits">
                <ul>
                    <li><strong>Latest Job Opportunities</strong> - Get notified about new positions matching your skills</li>
                    <li><strong>Industry Insights</strong> - Stay updated with hiring trends and career advice</li>
                    <li><strong>Platform Updates</strong> - Be the first to know about new features and improvements</li>
                    <li><strong>Exclusive Events</strong> - Access to webinars, career fairs, and networking opportunities</li>
                </ul>
            </div>
            
            <p>Our newsletters are sent monthly, packed with valuable information to help you advance your career or find the perfect talent for your organization.</p>
            
            <div class="signature">
                <p style="margin-bottom: 5px;">Best regards,</p>
                <p style="margin: 0; font-weight: 600;">HireRight Solution</p>
            </div>
        </div>
        
        <div class="footer">
            <p>You're receiving this email because you subscribed to the HireRight newsletter at <strong>{{ $email }}</strong></p>
            <p class="unsubscribe">
                Don't want to receive these emails anymore? 
                <a href="{{ $unsubscribeUrl }}">Unsubscribe here</a>
            </p>
            <p>&copy; {{ date('Y') }} HireRight. All rights reserved.</p>
            <p><a href="https://hirerightapp.com">www.hirerightapp.com</a></p>
        </div>
    </div>
</body>
</html>