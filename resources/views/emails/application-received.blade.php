<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Received - {{ $jobTitle }}</title>
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
            font-size: 24px;
        }
        .content {
            padding: 40px 30px;
        }
        .company-name {
            color: #4CAF50;
            font-weight: bold;
        }
        .application-summary {
            background: #f8f9fa;
            padding: 20px;
            margin: 25px 0;
            border-radius: 5px;
            border-left: 4px solid #667eea;
        }
        .application-summary h3 {
            margin-top: 0;
            color: #667eea;
            font-size: 18px;
        }
        .application-summary p {
            margin: 8px 0;
        }
        .what-to-expect {
            margin: 30px 0 15px 0;
        }
        .what-to-expect h3 {
            color: #333;
            font-size: 18px;
            margin-bottom: 15px;
        }
        .process-steps {
            background: #f8f9fa;
            padding: 20px;
            margin: 15px 0 25px 0;
            border-radius: 5px;
            border-left: 4px solid #667eea;
        }
        .process-steps ul {
            margin: 0;
            padding-left: 20px;
        }
        .process-steps li {
            margin: 10px 0;
            color: #555;
        }
        .note-box {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 25px 0;
            border-radius: 5px;
        }
        .note-box strong {
            color: #856404;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-radius: 0 0 8px 8px;
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
            <h1>Application Received: {{ $jobTitle }} at {{ $companyName }}</h1>
        </div>
        
        <div class="content">
            <p><strong>Dear {{ $candidateName }},</strong></p>
            
            <p>Thank you for your interest in joining <span class="company-name">{{ $companyName }}</span>.</p>
            
            <p>We are pleased to inform you that we have successfully received your application for the <strong>{{ $jobTitle }}</strong> position. Our hiring team has been notified, and your profile is now under review.</p>
            
            <div class="application-summary">
                <h3>Application Summary</h3>
                <p><strong>Position:</strong> {{ $jobTitle }}</p>
                <p><strong>Company:</strong> {{ $companyName }}</p>
                <p><strong>Submitted:</strong> {{ $applicationDate }}</p>
            </div>
            
            <div class="what-to-expect">
                <h3>What to Expect Next:</h3>
            </div>
            
            <div class="process-steps">
                <ul>
                    <li><strong>Initial Review</strong></li>
                    <li><strong>Technical Assessment</strong></li>
                    <li><strong>Interview Session</strong></li>
                    <li><strong>Final Decision</strong></li>
                </ul>
            </div>
            
            <div class="note-box">
                <p><strong>NOTE:</strong> You can track your application status in real-time by logging into your Candidate Dashboard on our portal. A formal update will be shared via your email regarding your status once the review process is complete.</p>
            </div>
            
            <p>Thank you for the time and effort you put into your application. We look forward to reviewing your work.</p>
            
            <p style="margin-top: 30px;">
                <strong>Best regards,</strong><br>
                HireRight Solution
            </p>
        </div>
        
        <div class="footer">
            <p>This is an automated message from HireRight. Please do not reply to this email.</p>
            <p>&copy; {{ date('Y') }} HireRight Solution. All rights reserved.</p>
            <p><a href="https://hirerightapp.com">Visit our website</a></p>
        </div>
    </div>
</body>
</html>