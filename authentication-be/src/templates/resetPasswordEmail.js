const resetPasswordEmail = ({ firstName, resetUrl }) => {

    return `
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>Reset Password</title>
    </head>

    <body style="font-family: Arial, Helvetica, sans-serif; background:#f4f4f4; padding:40px;">

        <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px;">

            <h2 style="color:#333;">
                Hello, ${firstName}! 👋
            </h2>

            <p>
                We received a request to reset your password.
            </p>

            <p>
                Click the button below to create a new password.
            </p>

            <div style="margin:30px 0; text-align:center;">

                <a
                    href="${resetUrl}"
                    style="
                        background:#dc2626;
                        color:white;
                        text-decoration:none;
                        padding:14px 28px;
                        border-radius:6px;
                        display:inline-block;
                    "
                >
                    Reset Password
                </a>

            </div>

            <p>
                If the button doesn't work, copy and paste this URL into your browser:
            </p>

            <p>
                <a href="${resetUrl}">
                    ${resetUrl}
                </a>
            </p>

            <p>
                This password reset link will expire in
                <strong>15 minutes</strong>.
            </p>

            <hr>

            <p style="font-size:12px; color:#777;">
                If you didn't request a password reset, you can safely ignore this email.
            </p>

        </div>

    </body>

    </html>
    `;

};

module.exports = resetPasswordEmail;