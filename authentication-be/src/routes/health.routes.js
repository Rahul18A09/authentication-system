const express = require("express");

const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check
 *     description: Verify that the API is running.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is running successfully.
 */
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is healthy"
    });
});

module.exports = router;