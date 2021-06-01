const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'www.uzworkshop@gmail.com',
    pass: 'wzbxkxdzbunhgflf',
  },
});

module.exports = transporter;
