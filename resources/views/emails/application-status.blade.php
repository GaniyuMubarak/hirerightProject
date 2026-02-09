<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header.shortlisted { background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; }
        .header.interview_scheduled { background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%); color: white; }
        .header.offered { background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%); color: white; }
        .header.hired { background: linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%); color: white; }
        .header.rejected { background: linear-gradient(135deg, #757575 0%, #616161 100%); color: white; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 40px 30px; }
        .status-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; text-align: center; }
        .button { display: inline-block; padding: 15px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
        .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header {{ $status }}">
            @if($status == 'shortlisted')
                <h1>🎉 Congratulations!</h1>
            @elseif($status == 'interview_scheduled')
                <h1>📅 Interview Scheduled</h1>
            @elseif($status == 'offered')
                <h1>🎊 Job Offer!</h1>
            @elseif($status == 'hired')
                <h1>🎉 You're Hired!</h1>
            @else
                <h1>Application Update</h1>
            @endif
        </div>
        
        <div class="content">
            <h2>Hello {{ $candidateName }},</h2>
            
            @if($status == 'shortlisted')
                <p>Great news! Your application for <strong>{{ $jobTitle }}</strong> at <strong>{{ $companyName }}</strong> has been shortlisted.</p>
                <div class="status-box">
                    <h3 style="margin-top: 0; color: #4CAF50;">✅ You've Been Shortlisted!</h3>
                    <p>You're one step closer to landing your dream job. The hiring team will contact you soon with the next steps.</p>
                </div>
                
            @elseif($status == 'interview_scheduled')
                <p>We're excited to invite you for an interview for the position of <strong>{{ $jobTitle }}</strong> at <strong>{{ $companyName }}</strong>.</p>
                <div class="status-box">
                    <h3 style="margin-top: 0; color: #2196F3;">📅 Interview Scheduled</h3>
                    <p>Please check your application for interview details, including date, time, and location.</p>
                </div>
                
            @elseif($status == 'offered')
                <p>Congratulations! We're pleased to offer you the position of <strong>{{ $jobTitle }}</strong> at <strong>{{ $companyName }}</strong>.</p>
                <div class="status-box">
                    <h3 style="margin-top: 0; color: #FF9800;">🎊 Job Offer</h3>
                    <p>Please review the offer details in your application dashboard.</p>
                </div>
                
            @elseif($status == 'hired')
                <p>Welcome aboard! We're thrilled to have you join <strong>{{ $companyName }}</strong> as <strong>{{ $jobTitle }}</strong>.</p>
                <div class="status-box">
                    <h3 style="margin-top: 0; color: #9C27B0;">🎉 Welcome to the Team!</h3>
                    <p>Your onboarding information will be sent to you shortly.</p>
                </div>
                
            @elseif($status == 'rejected')
                <p>Thank you for your interest in the position of <strong>{{ $jobTitle }}</strong> at <strong>{{ $companyName }}</strong>.</p>
                <div class="status-box">
                    <p>After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.</p>
                    @if($rejectionReason)
                    <p style="margin-top: 15px; color: #666;">{{ $rejectionReason }}</p>
                    @endif
                </div>
                <p>We appreciate the time and effort you put into your application. We encourage you to apply for other positions that match your skills and experience.</p>
            @else
                <p>Your application status for <strong>{{ $jobTitle }}</strong> at <strong>{{ $companyName }}</strong> has been updated.</p>
                <div class="status-box">
                    <h3 style="margin-top: 0;">Status: {{ ucfirst(str_replace('_', ' ', $status)) }}</h3>
                </div>
            @endif
            
            <center>
                <a href="{{ $applicationUrl }}" class="button">View Application</a>
            </center>
        </div>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} HireRight. All rights reserved.</p>
            <p><a href="https://hirerightapp.com" style="color: #667eea;">Visit our website</a></p>
        </div>
    </div>
</body>
</html>