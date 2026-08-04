const { body } = require("express-validator");

const updateProfileValidator = [

    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required.")
        .isLength({ min: 2, max: 50 })
        .withMessage("First name must be between 2 and 50 characters."),

    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name is required.")
        .isLength({ min: 2, max: 50 })
        .withMessage("Last name must be between 2 and 50 characters.")

];

const changePasswordValidator = [

    body("currentPassword")
        .notEmpty()
        .withMessage("Current password is required."),

    body("newPassword")
        .isLength({ min: 8 })
        .withMessage("New password must be at least 8 characters long.")
        .matches(/[A-Z]/)
        .withMessage("New password must contain at least one uppercase letter.")
        .matches(/[a-z]/)
        .withMessage("New password must contain at least one lowercase letter.")
        .matches(/[0-9]/)
        .withMessage("New password must contain at least one number.")

];

module.exports = {
    updateProfileValidator,
    changePasswordValidator
};