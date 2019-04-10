let nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    ses = require('nodemailer-ses-transport');

module.exports.send = async (from, to, cc, subject, html, attachments) => {
    var mailOptions = {
        from: from,
        to: to, // list of receivers
        cc: cc,
        subject: subject,
        html: html,
        attachments: attachments || []
    };
    let transporter = null;
    switch (global.CONFIG.mail.selectedOption) {
        case 'gmail':
            transporter = nodemailer.createTransport(global.CONFIG.mail.options.gmail);
            break;
        case 'smtp':
            transporter = nodemailer.createTransport(smtpTransport(global.CONFIG.mail.options.smtp));
            break;
        case 'ses':
            transporter = nodemailer.createTransport(ses(global.CONFIG.mail.options.ses));
            break;
    }
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: ' + info.response);
    } catch (e) {
        console.log("error :\n", e);
    }
}