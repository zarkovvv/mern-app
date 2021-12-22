const User = require('../models/User');

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
        res.status(500).json({
            success: false,
            error: e.message
        });
    }
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400).json({
            success: false,
            error: 'Please provide email and password!'
        });
        res.end();
    } else {
        try {
            const user = await User.findOne({ email }).select('+password');

            if (!user) {
                res.status(404).json({
                    success: false,
                    error: 'Invalid user!'
                });
                res.end();
            }

            const passwordMatch = await user.matchPasswords(password);
            if (!passwordMatch) {
                res.status(404).json({
                    success: false,
                    error: 'Invalid credentials!'
                });
                res.end();
            }

            res.status(200).json({
                success: true,
                token: '34r2rc2b66458n5gb'
            });
            res.end();
        } catch (e) {
            res.status(500).json({
                success: false,
                error: e.message
            });
            res.end();
        }
    }
}

exports.forgotpassword = (req, res, next) => {
    res.send("Forgot password route");
}

exports.resetpassword = (req, res, next) => {
    res.send("Reset password route");
}