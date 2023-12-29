const nodemailer = require('nodemailer');
const ErrorHandler = require('../utils/errorHandler');
const config = require('../config/config');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.SMTP_HOST,
        pass: config.SMTP_PASSWORD
    }
});

const sendEmail = async (email,subject,text) =>
{
    const mailOptions = {
        from: config.SMTP_HOST,
        to: email,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions,function (error,info)
    {

        if (error)
        {
            throw new ErrorHandler('Email sending failed',500);
        } else
        {

            return true;
        }
    });
};
module.exports.sendEmail = sendEmail;
