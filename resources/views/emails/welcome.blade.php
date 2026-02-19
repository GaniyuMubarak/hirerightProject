<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
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
        .section-title {
            color: #333;
            font-size: 18px;
            font-weight: 600;
            margin: 30px 0 15px 0;
            border-bottom: 2px solid #667eea;
            padding-bottom: 8px;
        }
        .feature-grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 15px; 
            margin: 20px 0; 
        }
        .feature-card { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 8px; 
            text-align: center; 
            border: 1px solid #e0e0e0;
        }
        .feature-icon { 
            font-size: 28px; 
            margin-bottom: 10px; 
        }
        .feature-card h4 {
            margin: 10px 0 8px 0;
            font-size: 15px;
            color: #333;
        }
        .feature-card p {
            font-size: 13px;
            color: #666;
            margin: 0;
            line-height: 1.4;
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
        .tips-box {
            margin-top: 30px;
            padding: 20px;
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            border-radius: 4px;
        }
        .tips-box h4 {
            margin: 0 0 12px 0;
            color: #856404;
            font-size: 16px;
        }
        .tips-box ul {
            margin: 0;
            padding-left: 20px;
            color: #856404;
        }
        .tips-box li {
            margin-bottom: 8px;
            line-height: 1.5;
        }
        .closing {
            margin-top: 30px;
            font-size: 15px;
            line-height: 1.6;
        }
        .signature {
            margin-top: 25px;
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
            <h1>Welcome to HireRight!</h1>
        </div>
        
        <div class="content">
            <p class="greeting">Dear {{ $userName }},</p>
            
            <div class="welcome-box">
                <h3>✨ Your Account is Ready!</h3>
                <p>Thank you for joining HireRight. We're excited to have you on board!</p>
            </div>
            
            @if($userRole == 'candidate')
            <p>You're all set to start your job search journey. HireRight connects talented professionals like you with amazing opportunities.</p>
            
            <h3 class="section-title">Get Started</h3>
            <div class="feature-grid">
                <div class="feature-card">
                    <div class="feature-icon">👤</div>
                    <h4>Complete Your Profile</h4>
                    <p>Add your experience, education, and skills to stand out</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔍</div>
                    <h4>Browse Jobs</h4>
                    <p>Explore thousands of job opportunities that match your skills</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📝</div>
                    <h4>Apply with Ease</h4>
                    <p>Submit applications quickly to multiple positions</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <h4>Track Applications</h4>
                    <p>Monitor your application status in real-time</p>
                </div>
            </div>
            
            @elseif($userRole == 'employer')
            <p>Welcome to HireRight's employer platform. You're now equipped with powerful tools to find and hire the best talent for your organization.</p>
            
            <h3 class="section-title">Get Started</h3>
            <div class="feature-grid">
                <div class="feature-card">
                    <div class="feature-icon">🏢</div>
                    <h4>Set Up Company Profile</h4>
                    <p>Showcase your company culture and values</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📢</div>
                    <h4>Post Job Openings</h4>
                    <p>Reach thousands of qualified candidates</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📝</div>
                    <h4>Create Assessment Tests</h4>
                    <p>Evaluate candidates effectively with custom tests</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">👥</div>
                    <h4>Manage Applicants</h4>
                    <p>Review, shortlist, and hire top talent efficiently</p>
                </div>
            </div>
            @endif
            
            <div class="button-container">
                <a href="{{ $dashboardUrl }}" class="button">Go to Dashboard</a>
            </div>
            
            <div class="tips-box">
                <h4>💡 Quick Tips</h4>
                <ul>
                    @if($userRole == 'candidate')
                    <li>A complete profile increases your visibility to employers by 70%</li>
                    <li>Set up job alerts to get notified of new opportunities instantly</li>
                    <li>Prepare well for assessment tests—they're crucial for shortlisting</li>
                    <li>Keep your resume updated and highlight your key achievements</li>
                    @else
                    <li>Detailed job descriptions attract better-qualified candidates</li>
                    <li>Use pre-employment tests to filter and identify top applicants</li>
                    <li>Respond quickly to applications to secure the best talent</li>
                    <li>Maintain clear communication with candidates throughout the hiring process</li>
                    @endif
                </ul>
            </div>
            
            <p class="closing">If you have any questions or need assistance, our support team is here to help. Feel free to reach out anytime.</p>
            
            <div class="signature">
                <p style="margin-bottom: 5px;">Best regards,</p>
                <p style="margin: 0; font-weight: 600;">HireRight Solution</p>
            </div>
        </div>
        
        <div class="footer">
            <p>Need assistance? Contact us at <a href="mailto:support@hirerightapp.com">support@hirerightapp.com</a></p>
            <p>&copy; {{ date('Y') }} HireRight. All rights reserved.</p>
            <p><a href="https://hirerightapp.com">www.hirerightapp.com</a></p>
        </div>
    </div>
</body>
</html>