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
        .confirmation-box { background: #e8f5e9; border-left: 4px solid #4CAF50; padding: 20px; margin: 20px 0; text-align: center; }
        .job-details { background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .button { display: inline-block; padding: 15px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
        .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
        .timeline { margin: 30px 0; }
        .timeline-item { display: flex; margin: 15px 0; }
        .timeline-icon { width: 30px; height: 30px; background: #667eea; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; }
        .timeline-content { flex: 1; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Application Received</h1>
        </div>
        
        <div class="content">
            <h2>Hello {{ $candidateName }}!</h2>
            
            <div class="confirmation-box">
                <h3 style="margin-top: 0; color: #4CAF50;">🎉 Your Application Has Been Received!</h3>
                <p style="margin: 0;">We've successfully received your application on {{ $applicationDate }}</p>
            </div>
            
            <p>Thank you for applying for the position of <strong>{{ $jobTitle }}</strong> at <strong>{{ $companyName }}</strong>.</p>
            
            <div class="job-details">
                <h3 style="margin-top: 0;">Application Details</h3>
                <p><strong>Position:</strong> {{ $jobTitle }}</p>
                <p><strong>Company:</strong> {{ $companyName }}</p>
                <p><strong>Submitted:</strong> {{ $applicationDate }}</p>
            </div>
            
            <h3>What Happens Next?</h3>
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-icon">1</div>
                    <div class="timeline-content">
                        <strong>Application Review</strong><br>
                        <span style="color: #666; font-size: 14px;">Our team will review your application and qualifications</span>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">2</div>
                    <div class="timeline-content">
                        <strong>Screening</strong><br>
                        <span style="color: #666; font-size: 14px;">Shortlisted candidates will be contacted for the next steps</span>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">3</div>
                    <div class="timeline-content">
                        <strong>Assessment/Interview</strong><br>
                        <span style="color: #666; font-size: 14px;">You may be invited to complete a test or attend an interview</span>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">4</div>
                    <div class="timeline-content">
                        <strong>Decision</strong><br>
                        <span style="color: #666; font-size: 14px;">Final decision and offer (if successful)</span>
                    </div>
                </div>
            </div>
            
            <p style="margin-top: 30px;">We'll keep you updated on the status of your application. You can also track your application progress through your dashboard.</p>
            
            <center>
                <a href="{{ $applicationUrl }}" class="button">View Application Status</a>
            </center>
            
            <p style="margin-top: 30px; color: #666; font-size: 14px;">
                <strong>💡 Pro Tip:</strong> Keep an eye on your email and application dashboard for updates. Response times may vary depending on the number of applications received.
            </p>
        </div>
        
        <div class="footer">
            <p>We appreciate your interest in joining our team!</p>
            <p>&copy; {{ date('Y') }} HireRight. All rights reserved.</p>
            <p><a href="https://hirerightapp.com" style="color: #667eea;">Visit our website</a></p>
        </div>
    </div>
</body>
</html>