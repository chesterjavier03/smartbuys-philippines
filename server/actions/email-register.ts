'use server';

import { RegisterSchema } from '@/types/register-schema';
import { createSafeActionClient } from 'next-safe-action'
import bcrpyt from "bcrypt"
import { generateEmailVerificationToken } from './tokens';
import { sendVerificationEmail } from './email';
import prisma from '@/prisma/client';

const action = createSafeActionClient();

export const emailRegister = action.schema(RegisterSchema).action(async ({ parsedInput: { email, password, name } }) => {
  try {
    const hashedPassword = await bcrpyt.hash(password, 10);

    const existingUser = await prisma?.users.findFirst({ where: { email: email } });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return { success: 'Email Confirmation Resent!' };
      }
      return { error: "Email already in use" };
    }

    await prisma?.users.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'CUSTOMER'
      }
    });

    const verificationToken = await generateEmailVerificationToken(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    
    return { success: "Confirmation Email Sent!" };

  } catch (error) {
    return { error: "Something went wrong" }
  }
})