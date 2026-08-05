const verificationEmail = ({ firstName, verificationUrl }) => {

    return `
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>Email Verification</title>
    </head>

    <body style="font-family: Arial, Helvetica, sans-serif; background:#f4f4f4; padding:40px;">

        <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px;">

            <h2 style="color:#333;">
                Welcome, ${firstName}! 👋
            </h2>

            <p>
                Thank you for registering with our Authentication System.
            </p>

            <p>
                Please verify your email address by clicking the button below.
            </p>

            <div style="margin:30px 0; text-align:center;">

                <a
                    href="${verificationUrl}"
                    style="
                        background:#2563eb;
                        color:white;
                        text-decoration:none;
                        padding:14px 28px;
                        border-radius:6px;
                        display:inline-block;
                    "
                >
                    Verify Email
                </a>

            </div>

            <p>
                This verification link will expire in
                <strong>15 minutes</strong>.
            </p>

            <hr>

            <p style="font-size:12px; color:#777;">
                If you did not create this account, you can safely ignore this email.
            </p>

        </div>

    </body>

    </html>
    `;

};

module.exports = verificationEmail;