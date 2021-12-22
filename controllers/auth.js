const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (req, res, next) => {
    const {username, email, password} = req.body;

    try {
        const user = await User.create({
            username, email, password
        });

        sendToken(user, 201, res);
    } catch (e) {
        next(e);
    }
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Please provide email and password!', 400));
    } else {
        try {
            const user = await User.findOne({ email }).select('+password');

            if (!user) {
                return next(new ErrorResponse('Invalid credentials!', 401));
            }

            const passwordMatch = await user.matchPasswords(password);
            if (!passwordMatch) {
                return next(new ErrorResponse('Invalid credentials!', 401));

            }

            sendToken(user, 200, res);
        } catch (e) {
            next(e)
        }
    }
}

exports.forgotpassword = (req, res, next) => {
    res.send("Forgot password route");
}

exports.resetpassword = (req, res, next) => {
    res.send("Reset password route");
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token
    });
}