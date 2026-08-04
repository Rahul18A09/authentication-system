const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const upload = require("../middlewares/upload.middleware");

const {
    uploadProfileImage,
    getProfile,
    updateProfile,
    changePassword
} = require("../controllers/user.controller");

const {
    updateProfileValidator,
    changePasswordValidator
} = require("../validators/user.validator");

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get(
    "/profile",
    authMiddleware,
    getProfile
);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Rahul
 *               lastName:
 *                 type: string
 *                 example: Bharada
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */
router.put(
    "/profile",
    authMiddleware,
    updateProfileValidator,
    updateProfile
);

/**
 * @swagger
 * /api/users/change-password:
 *   put:
 *     summary: Change logged-in user's password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: Rahul@123
 *               newPassword:
 *                 type: string
 *                 example: Rahul@456
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       400:
 *         description: Validation failed or current password is incorrect.
 *       401:
 *         description: Unauthorized.
 */

router.put(
    "/change-password",
    authMiddleware,
    changePasswordValidator,
    changePassword
);

/**
 * @swagger
 * /api/users/profile/image:
 *   post:
 *     summary: Upload profile image
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - profileImage
 *             properties:
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile image uploaded successfully.
 *       400:
 *         description: Invalid image.
 *       401:
 *         description: Unauthorized.
 */
router.post(
    "/profile/image",
    authMiddleware,
    upload.single("profileImage"),
    uploadProfileImage
);

module.exports = router;