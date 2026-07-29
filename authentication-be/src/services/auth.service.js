const bcrypt = require("bcryptjs");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token.util");

const registerUser = async (userData) => {
    const { firstName, lastName, email, password } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    return user;
};

module.exports = {
    registerUser,
};


const loginUser = async ({ email, password }) => {

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const payload = {
    id: user._id,
    role: user.role,
};

const accessToken = generateAccessToken(payload);

const refreshToken = generateRefreshToken(payload);

 await RefreshToken.create({
        token: refreshToken,
        user: user._id,
        expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
    });


    user.password = undefined;

    return {
        accessToken,
        refreshToken,
        user,
    };
};

module.exports = {
    registerUser,
    loginUser,
};