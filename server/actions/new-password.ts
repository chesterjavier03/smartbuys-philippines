'use server';

import { createSafeActionClient } from 'next-safe-action';
import { getPasswordResetTokenByToken } from './tokens';
import dayjs from 'dayjs';
import { NewPasswordSchema } from '@/types/new-password-schema';
import bcrypt from 'bcrypt';
import prisma from '@/prisma/client';

const action = createSafeActionClient()

export const newPassword = action.schema(NewPasswordSchema).action(async ({ parsedInput: { password, token } }) => { 
  try {
    if (!token) {
      return { error: 'Missing Token' };
    }

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      return { error: "Token not found" };
    }

    const hasExpired = dayjs(existingToken.expires).isBefore(dayjs());
    
    if (hasExpired) {
      return { error: "Token has expired" };
    }

    const existingUser = await prisma?.users.findFirst({ where: { email: existingToken.email } });

    if (!existingUser) {
      return { error: "User not found" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma?.$transaction(async (tx) => {
      await tx.users.update({
        where: { id: existingUser.id }, data: {
          password: hashedPassword
        }
      });
      await tx.passwordResetTokens.delete({ where: { id: existingToken.id } });
    });
    return { success: 'Password Updated!' };
  } catch (error) {
    console.log('ERROR: ', error);
    return null;
  }
});