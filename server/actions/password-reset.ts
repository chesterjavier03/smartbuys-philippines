'use server';

import { ResetPasswordSchema } from '@/types/reset-schema';
import { createSafeActionClient } from 'next-safe-action';
import { generatePasswordResetToken } from './tokens';
import { sendPasswordResetEmail } from './email';

const action = createSafeActionClient();

export const reset = action.schema(ResetPasswordSchema).action(async ({ parsedInput: { email } }) => {
  try {
    const existingUser = prisma?.users.findFirst({ where: { email: email } });
    if (!existingUser) {
      return {error: 'User not found!'};
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    if (!passwordResetToken) {
      return { error: 'Token not generated' };
    }

    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: 'Password Reset Email Sent!' };

  } catch (error) {
    console.log('ERROR: ', error);
    return { error: 'Something went wrong..' };
  }
});