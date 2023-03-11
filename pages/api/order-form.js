import path from 'path';

const nodemailer = require('nodemailer');
const ejs = require('ejs');

// Config
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
  // Create our Nodemailer transport handler
  let transporter = nodemailer.createTransport(mailConfig);

  const jsonDirectory = path.join(process.cwd(), 'public/email-templates');
  //Read the json data file data.json

  ejs.renderFile(
    jsonDirectory + '/order.ejs',
    constructEjsData(req),
    callback(transporter, res, adminEmail)
  );

  ejs.renderFile(
    jsonDirectory + '/order-customer.ejs',
    constructEjsData(req),
    callback(transporter, res, 'chesterjavier03@duck.com')
  );
}

const constructEjsData = (req) => {
  return {
    fullName: req.body.orders.shippingAddress.fullName,
    email: req.body.email,
    address: `${req.body.orders.shippingAddress.address}
        ${req.body.orders.shippingAddress.city}
        ${req.body.orders.shippingAddress.postalCode}
        ${req.body.orders.shippingAddress.country}`,
    items: req.body.items,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
  };
};

const callback = (transporter, res, email) => {
  return function (err, data) {
    if (err) {
      console.log(err);
    } else {
      mailSender(transporter, adminEmail, email, data);
    }
  };
};

const mailSender = async (transporter, adminEmail, toEmail, data) => {
  await transporter.sendMail({
    from: adminEmail,
    to: toEmail, // list of receivers
    subject: 'New Order From SmartBuys Philippines Website ✔', // Subject line
    html: data, // html body
  });
};
