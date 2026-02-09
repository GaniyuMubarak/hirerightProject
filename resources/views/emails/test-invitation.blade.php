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
        .test-details { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; }
        .test-details h3 { margin-top: 0; color: #667eea; }
        .button { display: inline-block; padding: 15px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
        .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📝 Test Invitation</h1>
        </div>
        
        <div class="content">
            <h2>Hello {{ $candidateName }}!</h2>
            
            <p>Great news! You have been invited to take a test for the position of <strong>{{ $jobTitle }}</strong> at <strong>{{ $companyName }}</strong>.</p>
            
            <div class="test-details">
                <h3>{{ $testTitle }}</h3>
                @if($testDescription)
                <p>{{ $testDescription }}</p>
                @endif
                <p><strong>⏱️ Time Limit:</strong> {{ $timeLimit }} minutes</p>
                <p><strong>🎯 Passing Score:</strong> {{ $passingScore }}%</p>
            </div>
            
            <p>Please complete the test at your earliest convenience. Make sure you have a stable internet connection and enough time to complete it without interruptions.</p>
            
            <center>
                <a href="{{ $testUrl }}" class="button">Take Test Now</a>
            </center>
            
            <p style="margin-top: 30px; color: #666; font-size: 14px;">
                <strong>Tips for success:</strong><br>
                • Read all questions carefully<br>
                • Manage your time wisely<br>
                • Submit before the time limit expires<br>
                • Ensure stable internet connection
            </p>
            
            <p style="margin-top: 20px;">Good luck! We look forward to reviewing your results.</p>
        </div>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} HireRight. All rights reserved.</p>
            <p><a href="https://hirerightapp.com" style="color: #667eea;">Visit our website</a></p>
        </div>
    </div>
</body>
</html>