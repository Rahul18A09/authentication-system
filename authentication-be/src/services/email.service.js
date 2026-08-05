const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async ({ to, subject, html }) => {

    console.log("Sending email to:", to);

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html
    });

    console.log("Email sent successfully.");

};

module.exports = {
    sendEmail
};