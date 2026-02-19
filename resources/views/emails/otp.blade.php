<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification - HireRight</title>
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
        .intro-text {
            font-size: 15px;
            color: #555;
            line-height: 1.6;
            margin-bottom: 25px;
        }
        .otp-box {
            background: #f8f9fa;
            border: 2px dashed #667eea;
            border-radius: 8px;
            padding: 25px 20px;
            text-align: center;
            margin: 30px 0;
        }
        .otp-label {
            margin: 0 0 12px 0;
            color: #666;
            font-size: 14px;
            font-weight: 600;
        }
        .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #667eea;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
            margin: 10px 0;
        }
        .otp-expiry {
            margin: 12px 0 0 0;
            color: #dc3545;
            font-size: 13px;
            font-weight: 600;
        }
        .instruction {
            font-size: 15px;
            color: #555;
            margin: 25px 0;
            line-height: 1.6;
        }
        .security-box {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        .security-box p {
            margin: 0;
            color: #856404;
            font-size: 14px;
            line-height: 1.5;
        }
        .security-box strong {
            font-weight: 600;
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
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Verify Your Email</h1>
        </div>
        
        <div class="content">
            <p class="greeting">Dear {{ $user->first_name }},</p>
            
            <p class="intro-text">Thank you for joining HireRight. To complete your registration and activate your account, please verify your email address using the code below.</p>
            
            <div class="otp-box">
                <p class="otp-label">Your Verification Code</p>
                <div class="otp-code">{{ $otp }}</div>
                <p class="otp-expiry">⏱ This code expires in 10 minutes</p>
            </div>
            
            <p class="instruction">Please enter this code on the verification screen to activate your account and gain full access to HireRight.</p>
            
            <div class="security-box">
                <p><strong>🔒 Security Reminder:</strong> Never share this code with anyone. HireRight staff will never ask for your verification code via email, phone, or any other means.</p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 25px;">If you did not create a HireRight account, please disregard this email. No further action is required.</p>
            
            <div class="signature">
                <p style="margin-bottom: 5px;">Best regards,</p>
                <p style="margin: 0; font-weight: 600;">HireRight Solution</p>
            </div>
        </div>
        
        <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>&copy; {{ date('Y') }} HireRight. All rights reserved.</p>
            <p><a href="https://hirerightapp.com">www.hirerightapp.com</a></p>
        </div>
    </div>
</body>
</html>