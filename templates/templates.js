export const ForgetmailHTML = (otp) => {
  return `
      <div style="background-color:#f7f7f7; padding: 20px; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #ff6600; text-align: center;">Mr Cuban</h2>
          <p style="font-size: 16px; color: #333;">Hi there,</p>
          <p style="font-size: 16px; color: #333;">
            We received a request to reset the password for your Mr Cuban account. Use the following OTP to reset your password:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; color: #000; background-color: #ff6600; padding: 10px 20px; border-radius: 5px;">${otp}</span>
          </div>
          <p style="font-size: 16px; color: #333;">
            Please note that this OTP is valid for only 10 minutes. If you didn't request a password reset, you can safely ignore this email.
          </p>
          <p style="font-size: 16px; color: #333;">Best regards,<br />The Mr Cuban Team</p>
          <hr style="border: 0; height: 1px; background-color: #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #777; text-align: center;">
            © 2024 Mr Cuban. All rights reserved. 
          </p>
        </div>
      </div>
    `;
};





export const WelcomeHTML = ()=>{
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to MR Cuban</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #000000;
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }
        .header img {
            max-width: 100px;
            margin-bottom: 10px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            color: #ffa500; /* Orange color */
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .content h2 {
            font-size: 22px;
            color: #000000;
        }
        .content p {
            font-size: 16px;
            color: #333333;
            line-height: 1.5;
        }
        .cta-button {
            display: inline-block;
            background-color: #ffa500; /* Orange color */
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 20px;
        }
        .footer {
            background-color: #000000;
            padding: 20px;
            text-align: center;
            color: #ffffff;
            font-size: 14px;
        }
        .footer a {
            color: #ffa500; /* Orange color */
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
            <img src="https://your-logo-url.com/logo.png" alt="MR Cuban Logo">
            <h1>Welcome to MR Cuban!</h1>
        </div>
        <div class="content">
            <h2>Get Ready for a Seamless Car Booking Experience</h2>
            <p>
                Thank you for joining MR Cuban, the easiest way to book cars in your city. Whether you're commuting or heading out for a weekend trip, MR Cuban has you covered with reliable and convenient car services.
            </p>
            <p>
                Ready to get started? Just log in to your account and start booking your ride in just a few taps.
            </p>
            <a href="https://your-app-url.com" class="cta-button">Book a Ride</a>
        </div>
        <div class="footer">
            <p>&copy; 2024 MR Cuban. All rights reserved.</p>
            <p>
                <a href="https://your-app-url.com/privacy">Privacy Policy</a> | 
                <a href="https://your-app-url.com/contact">Contact Us</a>
            </p>
        </div>
    </div>
</body>
</html>

  
  `
}