const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");

const ApiError = require("../utils/ApiError");

const {
    generateAccessToken,
    generateRefreshToken
} = require("../utils/token.util");

const {
    generateVerificationToken
} = require("../utils/token");

const {
    sendEmail
} = require("./email.service");

const verificationEmail = require("../templates/verificationEmail");
const resetPasswordEmail = require("../templates/resetPasswordEmail");

const registerUser = async (userData) => {

    const {
        firstName,
        lastName,
        email,
        password
    } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "Email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    // Generate verification token
    const {
        token,
        hashedToken,
        expires
    } = generateVerificationToken();

    // Save hashed token
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpires = expires;

    await user.save();

    // Verification URL
    const verificationUrl =
        `${process.env.CLIENT_URL}/verify-email?token=${token}`;

        console.log("Verification URL:", verificationUrl);

    // Email HTML
    const html = verificationEmail({
        firstName: user.firstName,
        verificationUrl
    });

    console.log(html);

    // Send email
await sendEmail({
    to: user.email,
    subject: "Verify Your Email",
    html
});

// Fetch user again without sensitive fields
const safeUser = await User.findById(user._id);

return safeUser;

};

const loginUser = async ({ email, password }) => {

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError(401, "Invalid email or password.");
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password.");
    }

    const payload = {
        id: user._id,
        role: user.role
    };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    await RefreshToken.create({
        token: refreshToken,
        user: user._id,
        expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        )
    });

    user.password = undefined;

    return {
        accessToken,
        refreshToken,
        user
    };

};

const verifyEmail = async (token) => {

    // Hash the token received from the URL
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // Find user with matching token
    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpires: {
            $gt: new Date()
        }
    }).select("+emailVerificationToken +emailVerificationExpires");

    if (!user) {
        throw new ApiError(
            400,
            "Invalid or expired verification link."
        );
    }

    // Already verified?
    if (user.isVerified) {
        throw new ApiError(
            400,
            "Email is already verified."
        );
    }

    // Verify account
    user.isVerified = true;

    // Remove verification token
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    return;

};

const resendVerificationEmail = async (email) => {

    // Find user
    const user = await User.findOne({
        email
    }).select("+emailVerificationToken +emailVerificationExpires");

    if (!user) {
        throw new ApiError(
            404,
            "User not found."
        );
    }

    // Check if already verified
    if (user.isVerified) {
        throw new ApiError(
            400,
            "Email is already verified."
        );
    }

    // Generate new verification token
    const {
        token,
        hashedToken,
        expires
    } = generateVerificationToken();

    // Save new token
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpires = expires;

    await user.save();

    // Create verification URL
    const verificationUrl =
        `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    // Generate email HTML
    const html = verificationEmail({
        firstName: user.firstName,
        verificationUrl
    });

    // Send email
    await sendEmail({
        to: user.email,
        subject: "Verify Your Email",
        html
    });

    return;

};

const forgotPassword = async (email) => {

    const user = await User.findOne({ email })
        .select("+passwordResetToken +passwordResetExpires");

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    const {
        token,
        hashedToken,
        expires
    } = generateVerificationToken();

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = expires;

    await user.save();

    const resetUrl =
        `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    const html = resetPasswordEmail({
        firstName: user.firstName,
        resetUrl
    });

    await sendEmail({
        to: user.email,
        subject: "Reset Your Password",
        html
    });

    return;

};

const resetPassword = async (token, password) => {

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {
            $gt: new Date()
        }
    })
    .select("+password +passwordResetToken +passwordResetExpires");

    if (!user) {
        throw new ApiError(
            400,
            "Invalid or expired reset link."
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return;

};

module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword
};