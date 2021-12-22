const mailer = require('nodemailer');

const sendEmail = (options) => {
    const transporter = mailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          return console.log(err);
        }
        console.log(info);
    });
}

module.exports = sendEmail;