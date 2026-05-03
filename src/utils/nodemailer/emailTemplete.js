export const verificationTemplate = (token) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

  <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f4; padding:20px;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="600" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#4CAF50; padding:20px; text-align:center; color:white; font-size:24px; font-weight:bold;">
              book_store 
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333;">

              <h2 style="margin-top:0;">Hello</h2>

              <p style="line-height:1.6;">
                Welcome to our platform! We're excited to have you on board.
              </p>

              <p style="line-height:1.6;">
                Please confirm your email by clicking the button below:
              </p>

              <!-- Button -->
              <div style="text-align:center; margin:30px 0;">
                        <a href="https://book-store-dx00.onrender.com/api/v1/user/verify/${token}"
                   style="background:#4CAF50; color:white; padding:12px 25px; text-decoration:none; border-radius:5px; display:inline-block; font-weight:bold;">
                   Verify Email
                </a>
              </div>

              <p style="line-height:1.6;">
                If you didn't request this, you can safely ignore this email.
              </p>

              <p>Thanks,<br/>Team ❤️</p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f1f1; padding:15px; text-align:center; font-size:12px; color:#777;">
              © 2026 book_store. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
};
