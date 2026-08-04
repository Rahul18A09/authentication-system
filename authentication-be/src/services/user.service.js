const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getProfile = async (userId) => {

    const user = await User.findById(userId)
        .select("firstName lastName email role profileImage isVerified createdAt");

    if (!user) {
        throw new Error("User not found.");
    }

    return user;
};

const updateProfile = async (userId, data) => {

    const { firstName, lastName } = data;

    // const user = await User.findById(userId);
    const user = await User.findById(userId).select("+password");

    if (!user) {
        throw new Error("User not found.");
    }

    user.firstName = firstName;
    user.lastName = lastName;

    await user.save();

    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        isVerified: user.isVerified,
        createdAt: user.createdAt
    };
};

const changePassword = async (userId, data) => {

    const { currentPassword, newPassword } = data;

     // Include password explicitly
    const user = await User.findById(userId).select("+password");

    if (!user) {
        throw new Error("User not found.");
    }

    // Verify current password
    const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isMatch) {
        throw new Error("Current password is incorrect.");
    }

    // Prevent using the same password
    const isSamePassword = await bcrypt.compare(
        newPassword,
        user.password
    );

    if (isSamePassword) {
        throw new Error("New password must be different from the current password.");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Save new password
    user.password = hashedPassword;

    await user.save();

    return;
};

module.exports = {
    getProfile,
    updateProfile,
    changePassword
};