'use server';

import getBaseURL from '@/lib/base-url';
import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';

const domain = getBaseURL();

const mailConfig = {
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
};

const jsonDirectory = path.join(process.cwd(), 'public/email-templates');

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const confirmationLink = `${domain}/auth/new-verification?token=${token}`;
    let transporter = nodemailer.createTransport(mailConfig);

    let template = await ejs.renderFile(
      jsonDirectory + '/verification-email.ejs',
      { confirmationLink: confirmationLink }
    );

    const { messageId, rejected } = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.NODE_ENV === 'production' ? email : process.env.EMAIL_DEV,
      subject: 'SmartBuys Philippines - Confirmation Email',
      html: template,
    });

    if (rejected) return { error: 'Error Sending Verification Email' };
    if (messageId) return { success: 'Verification Email Sent!' };
  } catch (error) {
    return { error: 'Something went wrong' };
  }
};

export const sendTwoFactorTokenByEmail = async (
  email: string,
  token: string
) => {
  try {
    let transporter = nodemailer.createTransport(mailConfig);

    let template = await ejs.renderFile(
      jsonDirectory + '/two-factor-token.ejs',
      { token }
    );

    const { messageId, rejected } = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.NODE_ENV === 'production' ? email : process.env.EMAIL_DEV,
      subject: 'SmartBuys Philippines - Your 2 Factor Token',
      html: template,
    });

    if (rejected) return { error: 'Error Sending Two Factor Token' };
    if (messageId) return { success: 'Two Factor Token Sent!' };
  } catch (error) {
    console.log('ERROR: ', error);
    return { error: 'Something went wrong..' };
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  try {
    const confirmLink = `${domain}/auth/new-password?token=${token}`;

    let transporter = nodemailer.createTransport(mailConfig);

    let template = await ejs.renderFile(jsonDirectory + '/reset-password.ejs', {
      confirmationLink: confirmLink,
    });

    const { messageId, rejected } = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.NODE_ENV === 'production' ? email : process.env.EMAIL_DEV,
      subject: 'SmartBuys Philippines - Password Reset',
      html: template,
    });

    if (rejected) return { error: 'Error Sending Password Reset Email..' };
    if (messageId) return { success: 'Password Reset Email Sent!' };
  } catch (error) {
    console.log('ERROR: ', error);
    return { error: 'Something went wrong..' };
  }
};

export const sendContactUs = async (
  email: string,
  name: string,
  mobile: string,
  message: string
) => {
  try {
    let transporter = nodemailer.createTransport(mailConfig);

    let template = await ejs.renderFile(jsonDirectory + '/contact-us.ejs', {
      email,
      name,
      mobile,
      message,
    });

    const { messageId, rejected } = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_ADMIN,
      subject: 'SmartBuys Philippines - New Message Received! 🎉',
      html: template,
    });

    if (rejected)
      return { error: 'Error Sending Your Message. Please try again later.' };
    if (messageId)
      return { success: 'Your message sent! We will get back to you!' };
  } catch (error) {
    console.log('ERROR: ', error);
    return { error: 'Something went wrong' };
  }
};
