const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

function sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
        sgMail.send(mailOptions, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
        });
    });
}

module.exports = { sendEmail };