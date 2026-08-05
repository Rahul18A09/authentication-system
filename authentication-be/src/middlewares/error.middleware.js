const multer = require("multer");

const errorMiddleware = (err, req, res, next) => {

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Multer file size error
    if (err instanceof multer.MulterError) {

        statusCode = 400;

        if (err.code === "LIMIT_FILE_SIZE") {
            message = "Image size must not exceed 2 MB.";
        }

    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && {
            stack: err.stack
        })
    });

};

module.exports = errorMiddleware;