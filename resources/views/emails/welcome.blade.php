<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 32px; }
        .content { padding: 40px 30px; }
        .welcome-box { background: #e8f5e9; border-left: 4px solid #4CAF50; padding: 20px; margin: 20px 0; text-align: center; }
        .button { display: inline-block; padding: 15px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
        .feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 30px 0; }
        .feature-card { background: #f8f9fa; padding: 20px; border-radius: 5px; text-align: center; }
        .feature-icon { font-size: 32px; margin-bottom: 10px; }
        .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Welcome to HireRight!</h1>
        </div>
        
        <div class="content">
            <h2>Hello {{ $userName }}!</h2>
            
            <div class="welcome-box">
                <h3 style="margin-top: 0; color: #4CAF50;">✨ Your Account is Ready!</h3>
                <p style="margin: 0;">Thank you for joining HireRight. We're excited to have you on board!</p>
            </div>
            
            @if($userRole == 'candidate')
            <p>You're all set to start your job search journey. HireRight connects talented professionals like you with amazing opportunities.</p>
            
            <h3>🚀 Get Started:</h3>
            <div class="feature-grid">
                <div class="feature-card">
                    <div class="feature-icon">👤</div>
                    <h4 style="margin: 10px 0;">Complete Your Profile</h4>
                    <p style="font-size: 14px; color: #666;">Add your experience, education, and skills</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔍</div>
                    <h4 style="margin: 10px 0;">Browse Jobs</h4>
                    <p style="font-size: 14px; color: #666;">Explore thousands of job opportunities</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📝</div>
                    <h4 style="margin: 10px 0;">Apply with Ease</h4>
                    <p style="font-size: 14px; color: #666;">One-click applications to multiple jobs</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <h4 style="margin: 10px 0;">Track Applications</h4>
                    <p style="font-size: 14px; color: #666;">Monitor your application status in real-time</p>
                </div>
            </div>
            
            @elseif($userRole == 'employer')
            <p>Welcome to HireRight's employer platform. You're now equipped with powerful tools to find and hire the best talent.</p>
            
            <h3>🚀 Get Started:</h3>
            <div class="feature-grid">
                <div class="feature-card">
                    <div class="feature-icon">🏢</div>
                    <h4 style="margin: 10px 0;">Set Up Company</h4>
                    <p style="font-size: 14px; color: #666;">Create your company profile</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📢</div>
                    <h4 style="margin: 10px 0;">Post Jobs</h4>
                    <p style="font-size: 14px; color: #666;">Reach thousands of qualified candidates</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📝</div>
                    <h4 style="margin: 10px 0;">Create Tests</h4>
                    <p style="font-size: 14px; color: #666;">Assess candidates effectively</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">👥</div>
                    <h4 style="margin: 10px 0;">Manage Applicants</h4>
                    <p style="font-size: 14px; color: #666;">Review and shortlist top talent</p>
                </div>
            </div>
            @endif
            
            <center>
                <a href="{{ $dashboardUrl }}" class="button">Go to Dashboard</a>
            </center>
            
            <div style="margin-top: 40px; padding: 20px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 5px;">
                <h4 style="margin-top: 0;">💡 Quick Tips:</h4>
                <ul style="margin: 0; padding-left: 20px;">
                    @if($userRole == 'candidate')
                    <li>A complete profile increases your visibility to employers by 70%</li>
                    <li>Set up job alerts to get notified of new opportunities</li>
                    <li>Prepare well for tests - they're crucial for shortlisting</li>
                    @else
                    <li>Detailed job descriptions attract better candidates</li>
                    <li>Use pre-employment tests to filter qualified applicants</li>
                    <li>Respond quickly to applications to secure top talent</li>
                    @endif
                </ul>
            </div>
            
            <p style="margin-top: 30px;">If you have any questions or need assistance, our support team is here to help!</p>
        </div>
        
        <div class="footer">
            <p>Need help? <a href="mailto:support@hirerightapp.com" style="color: #667eea;">Contact Support</a></p>
            <p>&copy; {{ date('Y') }} HireRight. All rights reserved.</p>
            <p><a href="https://hirerightapp.com" style="color: #667eea;">Visit our website</a></p>
        </div>
    </div>
</body>
</html>