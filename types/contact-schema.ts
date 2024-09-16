import { z } from 'zod';

export const ContactSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Please add a name with at least 4 characters' }),
  email: z.string().email(),
  mobile: z
    .string(),
  message: z.string().min(10, {
    message: 'Message must be at least 5 characters.',
  }),
});
