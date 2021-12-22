const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (req, res, next) => {
    const {username, email, password} = req.body;

    try {
        const user = await User.create({
            username, email, password
        });

        res.status(201).json({
            success: true,
            user
        });
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

            res.status(200).json({
                success: true,
                token: '34r2rc2b66458n5gb'
            });
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