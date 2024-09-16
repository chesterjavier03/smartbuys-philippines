'use server';

import { ContactSchema } from '@/types/contact-schema';
import { createSafeActionClient } from 'next-safe-action';
import { sendContactUs } from './email';

const action = createSafeActionClient();

export const contactUs = action
  .schema(ContactSchema)
  .action(async ({ parsedInput: { message, name, email, mobile } }) => {
    try {
      await sendContactUs(email, name, mobile, message);
      return { success: 'We received your message! 🥳' };
    } catch (error) {
      console.log('ERROR: ', error);
      return { error: JSON.stringify(error) };
    }
  });
