const authService = require("../services/auth.service");

const register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const login = async (req, res) => {

    try {

        const result = await authService.loginUser(req.body);

        res.cookie(
            "refreshToken",
            result.refreshToken,
            {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken: result.accessToken,
            user: result.user,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

const verifyEmail = async (req, res) => {

    try {

        const { token } = req.params;

        await authService.verifyEmail(token);

        res.status(200).json({
            success: true,
            message: "Email verified successfully."
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

const resendVerificationEmail = async (req, res) => {

    try {

        const { email } = req.body;

        await authService.resendVerificationEmail(email);

        res.status(200).json({
            success: true,
            message: "Verification email sent successfully."
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        await authService.forgotPassword(email);

        res.status(200).json({
            success: true,
            message: "Password reset email sent successfully.",
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

const resetPassword = async (req, res) => {
    try {

        const { token } = req.params;
        const { password } = req.body;

        await authService.resetPassword(token, password);

        res.status(200).json({
            success: true,
            message: "Password reset successfully.",
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};


module.exports = {
    register,
    login,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword,
};