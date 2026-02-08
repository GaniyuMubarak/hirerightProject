<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .otp-box { background: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px; }
        .otp-code { font-size: 32px; font-weight: bold; color: #333; letter-spacing: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Hello {{ $user->first_name }},</h2>
        <p>Your OTP code for HireRight is:</p><!DOCTYPE html>
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
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 40px 30px;
        }
        .otp-box {
            background: #f8f9fa;
            border: 2px dashed #667eea;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 30px 0;
        }
        .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #667eea;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        .footer a {
            color: #667eea;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Welcome to HireRight!</h1>
        </div>
        
        <div class="content">
            <h2>Hello {{ $userName ?? $user->first_name }}!</h2>
            <p>Thank you for joining HireRight. To complete your registration, please verify your email address.</p>
            
            <div class="otp-box">
                <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Your verification code is:</p>
                <div class="otp-code">{{ $otp }}</div>
                <p style="margin: 10px 0 0 0; color: #666; font-size: 12px;">This code expires in 10 minutes</p>
            </div>
            
            <p>Enter this code in the verification screen to activate your account.</p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
                <strong>Security Tip:</strong> Never share this code with anyone. HireRight staff will never ask for your verification code.
            </p>
        </div>
        
        <div class="footer">
            <p>If you didn't create a HireRight account, please ignore this email.</p>
            <p>&copy; {{ date('Y') }} HireRight. All rights reserved.</p>
            <p>
                <a href="https://hirerightapp.com">Visit our website</a>
            </p>
        </div>
    </div>
</body>
</html>
        <div class="otp-box">
            <div class="otp-code">{{ $otp }}</div>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
        <br>
        <p>Best regards,<br>The HireRight Team</p>
    </div>
</body>
</html>