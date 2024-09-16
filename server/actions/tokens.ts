'use server'

import prisma from '@/prisma/client'
import crypto from 'crypto'
import dayjs from 'dayjs';

export const getVerificationTokenByEmail = async (token: string) => {
  try {
    const verificationToken = await prisma?.emailTokens.findFirst({
      where: { token: token }
    });
    return verificationToken;
  } catch (error) {
    return null
  }
}

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = dayjs().add(1,'hour').toDate();

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma?.emailTokens.delete({ where: { id: existingToken.id } });
  }

  const verificationToken = await prisma?.emailTokens.create({
    data: {
      email,
      token,
      expires
    }
  })
  return verificationToken
}

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prisma?.twoFactorTokens.findFirst({
      where: {email: email}
    })
    return twoFactorToken;
  } catch (error) {
    return null;
  }
}

export const generateTwoFactorToken = async (email: string) => {
  try {
    const token = crypto.randomInt(100_000, 1_000_000).toString();

    const expires = dayjs().add(1, 'hour').toDate();

    const existingToken = await getTwoFactorTokenByEmail(email);
    if (existingToken) {
      await prisma?.twoFactorTokens.delete({ where: { id: existingToken.id } });
    }

    const twoFactorToken = await prisma?.twoFactorTokens.create({
      data: {
        email,
        token,
        expires,
      }
    });
    return twoFactorToken;

  } catch (error) {
    return null
  }
}

export const newVerification = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByEmail(token);

    if (!existingToken) return { error: "Token not found" }

    const hasExpired = dayjs(existingToken.expires).isBefore(dayjs());

    if (hasExpired) return { error: "Token has expired" }

    const existingUser = await prisma?.users.findFirst({ where: { email: existingToken.email } });

    if (!existingUser) return { error: 'Email does not exist' };

    await prisma?.users.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: dayjs().toDate(),
        email: existingToken.email,
      }
    });
    await prisma?.emailTokens.delete({ where: { id: existingToken.id } });
    return { success: 'Email Verified' };
    
  } catch (error) {
    console.log('ERORR ', error);
    return { error: 'Something went wrong..' };
  }
}

export const generatePasswordResetToken = async (email: string) => {
  try {
    const token = crypto.randomUUID();
    
    const expires = dayjs().add(1, 'hour').toDate();

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
      await prisma?.passwordResetTokens.delete({ where: { id: existingToken.id } });
    }

    const passwordResetToken = await prisma?.passwordResetTokens.create({
      data: {
        email,
        token,
        expires
      }
    });
    return passwordResetToken;
  } catch (error) {
    console.log('ERROR: ', error);
    return null;
  }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma?.passwordResetTokens.findFirst({ where: { email: email } });
    return passwordResetToken;
  } catch (error) {
    console.log('ERROR: ', error);
    return null;
  }
}

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma?.passwordResetTokens.findFirst({ where: { token: token } });
    return passwordResetToken;
  } catch (error) {
    console.log('ERROR: ', error);
    return null;
  }
}
