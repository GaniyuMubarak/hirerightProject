<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 40px 30px; }
        .invitation-box { background: #e3f2fd; border-left: 4px solid #2196F3; padding: 20px; margin: 20px 0; text-align: center; }
        .button { display: inline-block; padding: 15px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
        .info-box { background: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>👥 Team Invitation</h1>
        </div>
        
        <div class="content">
            <h2>Hello!</h2>
            
            <div class="invitation-box">
                <h3 style="margin-top: 0; color: #2196F3;">🎉 You've Been Invited!</h3>
                <p style="font-size: 18px; margin: 0;">You've been invited to join <strong>{{ $companyName }}</strong> on HireRight</p>
            </div>
            
            <p>{{ $invitedBy }} has invited you to join their team as a <strong>{{ ucfirst($role) }}</strong>.</p>
            
            <div class="info-box">
                <h3 style="margin-top: 0;">Invitation Details</h3>
                <p><strong>Company:</strong> {{ $companyName }}</p>
                <p><strong>Role:</strong> {{ ucfirst($role) }}</p>
                <p><strong>Invited By:</strong> {{ $invitedBy }}</p>
            </div>
            
            <h3>What You'll Get:</h3>
            <ul>
                <li>Access to {{ $companyName }}'s HireRight workspace</li>
                <li>Collaborate with team members on hiring activities</li>
                <li>Manage job postings and applications</li>
                <li>Review candidates and schedule interviews</li>
            </ul>
            
            <p>Click the button below to accept your invitation and create your account:</p>
            
            <center>
                <a href="{{ $registerUrl }}" class="button">Accept Invitation</a>
            </center>
            
            <p style="margin-top: 30px; color: #666; font-size: 14px;">
                <strong>⏰ Important:</strong> This invitation will expire in 7 days. Please accept it before it expires.
            </p>
            
            <p style="color: #666; font-size: 14px;">
                If you didn't expect this invitation or believe it was sent by mistake, you can safely ignore this email.
            </p>
        </div>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} HireRight. All rights reserved.</p>
            <p><a href="https://hirerightapp.com" style="color: #667eea;">Visit our website</a></p>
        </div>
    </div>
</body>
</html>