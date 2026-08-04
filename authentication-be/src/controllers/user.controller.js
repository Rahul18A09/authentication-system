const User = require("../models/User");
const {
    uploadImage,
    deleteImage
} = require("../services/cloudinary.service");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");


const uploadProfileImage = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image."
            });
        }

        // Find logged-in user
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Delete previous image if it exists
        if (user.cloudinaryId) {
            await deleteImage(user.cloudinaryId);
        }

        // Upload new image
        const result = await uploadImage(req.file.buffer);

        // Save new image details
        user.profileImage = result.secure_url;
        user.cloudinaryId = result.public_id;

        await user.save();

        // Don't return password
        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "Profile image uploaded successfully.",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getProfile = async (req, res) => {

    try {

        const user = await userService.getProfile(req.user.id);

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};

const updateProfile = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const user = await userService.updateProfile(
            req.user.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};  

const changePassword = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        await userService.changePassword(
            req.user.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Password changed successfully."
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    uploadProfileImage,
    getProfile,
    updateProfile,
    changePassword
};