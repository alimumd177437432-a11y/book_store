export const resetPasswprdTemplete = (code , otpToken) => {
  return ` <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reset Password</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px;">
    <tr>
      <td align="center">
        
        <!-- Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#4CAF50; padding:20px; text-align:center; color:white; font-size:24px; font-weight:bold;">
              Reset Your Password
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333;">

              <!-- Button -->
              <div style="text-align:center; margin:30px 0;">
                <p 
                   style="background:#4CAF50; color:white; padding:15px 25px; text-decoration:none; border-radius:5px; font-size:16px;">
                  ${code}
                </p>
                <p>
                  https://book-store-dx00.onrender.com/api/v1/user/reset-password/${otpToken}
                </p>
              </div>

              <p style="font-size:14px; color:#777;">
                This link will expire in 15 minutes.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f0f0f0; text-align:center; padding:15px; font-size:12px; color:#888;">
              © 2026 Book_store. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
};
