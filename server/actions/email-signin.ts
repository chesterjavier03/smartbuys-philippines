'use server'

import { LoginSchema } from '@/types/login-schema'
import prisma from '@/prisma/client'
import { createSafeActionClient } from "next-safe-action"
import { AuthError } from 'next-auth'
import { generateEmailVerificationToken, generateTwoFactorToken, getTwoFactorTokenByEmail } from './tokens'
import { sendTwoFactorTokenByEmail, sendVerificationEmail } from './email'
import { signIn } from '../auth'
import dayjs from 'dayjs';

const action = createSafeActionClient()

export const emailSignIn = action.schema(LoginSchema).action(async ({ parsedInput: { email, password, code } }) => {
  try {

    const existingUser = await prisma?.users.findFirst({ where: { email: email } })

    if (existingUser?.email !== email) {
      return {error: "Email not found"}
    }

    if (!existingUser?.emailVerified) {
      const verificationToken = await generateEmailVerificationToken(existingUser?.email as string)

      await sendVerificationEmail(
        verificationToken?.email,
        verificationToken?.token
      )

      return { success: 'Confirmation Email Sent!'}
    }

    if (existingUser.twoFactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

        if (!twoFactorToken) {
          return { error: "Invalid Token" };
        }

        if (twoFactorToken.token !== code) {
          return { error: "Invalid Token" };
        }

        const hasExpired = dayjs(twoFactorToken.expires).isBefore(dayjs());

        if (hasExpired) {
          return { error: "Token has expired" };
        }

        await prisma?.twoFactorTokens.delete({ where: { id: twoFactorToken.id } });
      } else {
        const token = await generateTwoFactorToken(existingUser.email);

        if (!token) {
          return { error: "Token not generated!" };
        }

        await sendTwoFactorTokenByEmail(token.email, token.token);
        return { twoFactor: "Two Factor Token Sent!" };
      }
    }
    
    await signIn('credentials', {
      email, password, redirectTo: '/',
    });

    return { success: "User Signed In!" };

  } catch (error) {
    if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Email or Password Incorrect" }
          case "AccessDenied":
            return { error: error.message }
          case "OAuthSignInError":
            return { error: error.message }
          default:
            return { error: "Something went wrong" }
        }
      }
      throw error
  }
})