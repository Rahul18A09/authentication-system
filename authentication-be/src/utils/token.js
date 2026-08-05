const crypto = require("crypto");

const generateVerificationToken = () => {

    // Random token sent to the user
    const token = crypto.randomBytes(32).toString("hex");

    // Hashed token stored in MongoDB
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // Token expires in 15 minutes
    const expires = Date.now() + 15 * 60 * 1000;

    return {
        token,
        hashedToken,
        expires
    };

};

module.exports = {
    generateVerificationToken
};