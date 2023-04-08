import path from 'path';

const nodemailer = require('nodemailer');
const ejs = require('ejs');

const mailConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_GMAIL_USER,
    pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
  },
};

const adminEmail = 'SmartBuys Philippines <smartbuysphil@gmail.com>';

export default async function handler(req, res) {
  sendEmails(req, res);
}

async function sendEmails(req, res) {
  let transporter = nodemailer.createTransport(mailConfig);
  const jsonDirectory = path.join(process.cwd(), 'public/email-templates');
  ejs.renderFile(
    jsonDirectory + '/message.ejs',
    constructEjsData(req),
    callback(transporter, res, 'chesterjavier03@duck.com')
  );
}

const constructEjsData = (req) => {
  return {
    fullName: req.body.name,
    email: req.body.email,
    message: req.body.message,
    mobile: req.body.mobile,
  };
};

const callback = (transporter, res, email) => {
  return function (err, data) {
    if (err) {
      console.log(err);
    } else {
      mailSender(transporter, adminEmail, email, data, res);
    }
  };
};

const mailSender = async (transporter, adminEmail, toEmail, data, res) => {
  let result = await transporter.sendMail({
    from: adminEmail,
    to: toEmail,
    subject: 'New Message From SmartBuys Philippines Website ✔',
    html: data,
  });

  if (result.messageId) {
    res.status(200).json({ status: 1 });
  } else {
    res.status(200).json({ status: 0, message: 'Failed to send message!' });
  }
};
