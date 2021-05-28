const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'donickuzb@gmail.com',
    pass: 'mvmupevttyrhrmux',
  },
});

module.exports = transporter;
