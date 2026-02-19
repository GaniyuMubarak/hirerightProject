<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Invitation - HireRight</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
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
        .invitation-box {
            background: #e3f2fd;
            border-left: 4px solid #2196F3;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
            text-align: center;
        }
        .invitation-box h3 {
            margin: 0 0 10px 0;
            color: #2196F3;
            font-size: 18px;
        }
        .invitation-box p {
            margin: 0;
            font-size: 16px;
            color: #1976D2;
        }
        .section-title {
            color: #333;
            font-size: 18px;
            font-weight: 600;
            margin: 30px 0 15px 0;
            border-bottom: 2px solid #667eea;
            padding-bottom: 8px;
        }
        .info-box {
            background: #f8f9fa;
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
        }
        .info-box h3 {
            margin: 0 0 15px 0;
            font-size: 16px;
            color: #333;
        }
        .info-box p {
            margin: 8px 0;
            font-size: 14px;
            color: #555;
        }
        .info-box strong {
            color: #333;
            font-weight: 600;
            display: inline-block;
            min-width: 100px;
        }
        .benefits-list {
            margin: 20px 0;
            padding-left: 0;
            list-style: none;
        }
        .benefits-list li {
            padding: 10px 0 10px 30px;
            position: relative;
            font-size: 15px;
            color: #555;
        }
        .benefits-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #4CAF50;
            font-weight: bold;
            font-size: 18px;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            padding: 14px 32px;
            background: #667eea;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 15px;
        }
        .button:hover {
            background: #5568d3;
        }
        .notice-box {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        .notice-box p {
            margin: 0;
            color: #856404;
            font-size: 14px;
            line-height: 1.5;
        }
        .notice-box strong {
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
            border-radius: 0 0 8px 8px;
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
            <h1>👥 Team Invitation</h1>
        </div>
        
        <div class="content">
            <p class="greeting">Dear Team Member,</p>
            
            <div class="invitation-box">
                <h3>You've Been Invited!</h3>
                <p>Join <strong style="color: #1565C0;">{{ $companyName }}</strong> on HireRight</p>
            </div>
            
            <p><strong>{{ $invitedBy }}</strong> has invited you to join their team as a <strong style="color: #667eea;">{{ ucfirst($role) }}</strong> at {{ $companyName }}.</p>
            
            <div class="info-box">
                <h3>Invitation Details</h3>
                <p><strong>Company:</strong> {{ $companyName }}</p>
                <p><strong>Your Role:</strong> {{ ucfirst($role) }}</p>
                <p><strong>Invited By:</strong> {{ $invitedBy }}</p>
            </div>
            
            <h3 class="section-title">What You'll Get Access To</h3>
            <ul class="benefits-list">
                <li>Full access to {{ $companyName }}'s HireRight workspace</li>
                <li>Collaborate with team members on hiring activities</li>
                <li>Manage job postings and review applications</li>
                <li>Schedule and conduct candidate interviews</li>
                <li>Create and assign skills assessment tests</li>
                <li>Track hiring pipeline and candidate progress</li>
            </ul>
            
            <p style="font-size: 15px; margin: 25px 0;">Click the button below to accept your invitation and create your account:</p>
            
            <div class="button-container">
                <a href="{{ $registerUrl }}" class="button">Accept Invitation & Join Team</a>
            </div>
            
            <div class="notice-box">
                <p><strong>⏰ Important:</strong> This invitation will expire in 7 days. Please accept it before {{ \Carbon\Carbon::now()->addDays(7)->format('F j, Y') }} to maintain access.</p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 25px;">If you didn't expect this invitation or believe it was sent by mistake, you can safely ignore this email. No account will be created unless you click the button above.</p>
            
            <div class="signature">
                <p style="margin-bottom: 5px;">Best regards,</p>
                <p style="margin: 0; font-weight: 600;">HireRight Solution</p>
            </div>
        </div>
        
        <div class="footer">
            <p>This invitation was sent on behalf of {{ $companyName }}</p>
            <p>&copy; {{ date('Y') }} HireRight. All rights reserved.</p>
            <p><a href="https://hirerightapp.com">www.hirerightapp.com</a></p>
        </div>
    </div>
</body>
</html>