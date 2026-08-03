const User = require("../models/User");
const { uploadImage } = require("../services/cloudinary.service");

const uploadProfileImage = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image."
            });
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

module.exports = {
    uploadProfileImage
};