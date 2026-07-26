const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const {
    registerValidation,
} = require("../validators/auth.validator");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

router.post(
    "/register",
    registerValidation,
    validate,
    authController.register
);

module.exports = router;