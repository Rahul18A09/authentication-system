require("dotenv").config();

const { sendEmail } = require("./src/services/email.service");
const verificationEmail = require("./src/templates/verificationEmail");

(async () => {

    try {

        const html = verificationEmail({
            firstName: "Rahul",
            verificationUrl: "https://example.com/verify-email?token=123456"
        });

        await sendEmail({
            to: process.env.EMAIL_USER,
            subject: "Verify Your Email",
            html
        });

        console.log("Verification email sent successfully.");

    } catch (error) {

        console.error(error);

    }

})();