<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $subject }}</title>
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
            font-size: 26px;
            font-weight: 600;
        }
        .content {
            padding: 40px 30px;
        }
        .newsletter-content {
            line-height: 1.8;
            color: #555;
            white-space: pre-wrap;
        }
        .signature {
            margin-top: 40px;
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
            <h1>📰 {{ $subject }}</h1>
        </div>
        
        <div class="content">
            <p style="font-size: 16px; margin-bottom: 20px;">Dear {{ $name ?? 'Subscriber' }},</p>
            
            <div class="newsletter-content">
                {!! nl2br(e($content)) !!}
            </div>
            
            <div class="signature">
                <p style="margin-bottom: 5px;">Best regards,</p>
                <p style="margin: 0; font-weight: 600;">HireRight Solution</p>
            </div>
        </div>
        
        <div class="footer">
            <p>You're receiving this email because you subscribed to the HireRight newsletter</p>
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