const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

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
            const user = await User.findOne({email}).select('+password');

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

exports.forgotpassword = async (req, res, next) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return next(new ErrorResponse("Email could not be sent", 404));
        }

        const resetToken = user.getResetToken();

        await user.save();

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
                <h1> You have requested a password reset </h1>
                <p>Please click on the link to reset your password</p>
                <a href=${resetUrl} clicktracking="off">${resetUrl}</a>
            `
        
        try {
            await sendEmail({
                to: user.email,
                subject: "Password reset request",
                text: message
            });

            res.status(200).json({
                success: true,
                data: "Email sent."
            });
        } catch (e) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email not sent.", 500));
        }
    } catch (e) {
        next(e);
    }
}

exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        });

        if (!user) {
            return next(new ErrorResponse("Invalid reset token!", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            data: "Password has been reset!"
        })

    } catch (e) {
        return next(e);
    }

}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token
    });
}