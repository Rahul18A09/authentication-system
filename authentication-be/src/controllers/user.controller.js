const User = require("../models/User");
const {
    uploadImage,
    deleteImage
} = require("../services/cloudinary.service");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");


const uploadProfileImage = catchAsync(async (req, res) => {

    if (!req.file) {

        throw new ApiError(
            400,
            "Please upload an image."
        );

    }

    const result = await uploadImage(req.file.buffer);

    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            profileImage: result.secure_url,
            cloudinaryId: result.public_id
        },
        {
            new: true
        }
    ).select("-password");

    return new ApiResponse(
        res,
        200,
        "Profile image uploaded successfully.",
        user
    );

});

const getProfile = catchAsync(async (req, res) => {

    const user = await userService.getProfile(req.user.id);

    return new ApiResponse(
        res,
        200,
        "Profile fetched successfully.",
        user
    );

});

const updateProfile = catchAsync(async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        throw new ApiError(
            400,
            errors.array()[0].msg
        );

    }

    const user = await userService.updateProfile(
        req.user.id,
        req.body
    );

    return new ApiResponse(
        res,
        200,
        "Profile updated successfully.",
        user
    );

});

const changePassword = catchAsync(async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        throw new ApiError(
            400,
            errors.array()[0].msg
        );

    }

    await userService.changePassword(
        req.user.id,
        req.body
    );

    return new ApiResponse(
        res,
        200,
        "Password changed successfully."
    );

});

const deleteProfile = catchAsync(async (req, res) => {

    await userService.deleteProfile(req.user.id);

    return new ApiResponse(
        res,
        200,
        "Profile deleted successfully."
    );

});

module.exports = {
    uploadProfileImage,
    getProfile,
    updateProfile,
    changePassword,
    deleteProfile
};