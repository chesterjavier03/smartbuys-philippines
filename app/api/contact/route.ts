import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

import nodemailer from 'nodemailer';
import ejs from 'ejs';

const mailConfig = {
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
};

const adminEmail = 'SmartBuys Philippines <smartbuysphil@gmail.com>';


const sendEmails = async (body: any) => {
  const {name, email, message} = body;
  let transporter = nodemailer.createTransport(mailConfig);
  const jsonDirectory = path.join(process.cwd(), 'public/email-templates');
  let template = await ejs.renderFile(jsonDirectory + '/message.ejs', {fullName: name, email, message});
  return await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: 'chesterjavier03@gmail.com',
    subject: 'New Message From SmartBuys Philippines Website ✔',
    html: template,
  });
}

export const POST = async (request: NextRequest) => {

  const body = await request.json();
  let result = await sendEmails(body);
  if (result.messageId) {
    return NextResponse.json({ status: 200 });
  } else {
    return NextResponse.json({ message: 'Failed to send message!'}, { status: 400 });
  }
}