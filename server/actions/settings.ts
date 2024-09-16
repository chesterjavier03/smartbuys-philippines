'use server';

import { SettingsSchema } from '@/types/settings-schema';
import { createSafeActionClient } from 'next-safe-action';
import { auth } from '../auth';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { uploadToFirestore } from './upload';

const action = createSafeActionClient();

export const settings = action
  .schema(SettingsSchema)
  .action(async ({ parsedInput: values }) => {
    try {
      const session = await auth();

      if (!session) {
        return { error: 'User not found' };
      }

      const dbUser = await prisma?.users.findFirst({
        where: { id: session.user.id },
      });

      if (!dbUser) {
        return { error: 'User not found' };
      }

      if (session.user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
      }

      if (values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(
          values.password,
          dbUser.password
        );

        if (!passwordMatch) {
          return { error: 'Password does not match' };
        }

        const samePassword = await bcrypt.compare(
          values.newPassword,
          dbUser.password
        );

        if (samePassword) {
          return { error: 'New password is the same as the old password' };
        }

        const hashPassword = await bcrypt.hash(values.newPassword, 10);
        values.password = hashPassword;
        values.newPassword = undefined;
      }

      if (values.image) {
        if (dbUser.image !== values.image) {
          values.image = (await uploadToFirestore(
            values.email as string,
            values.image
          )) as string;

          await prisma?.users.update({
            where: { id: dbUser.id },
            data: {
              twoFactorEnabled: values.isTwoFactorEnabled,
              name: values.name,
              email: values.email,
              password: values.password,
              image: values.image,
            },
          });
        } else {
          await prisma?.users.update({
            where: { id: dbUser.id },
            data: {
              twoFactorEnabled: values.isTwoFactorEnabled,
              name: values.name,
              email: values.email,
              password: values.password,
            },
          });
        }
      }

      if (!values.image) {
        await prisma?.users.update({
          where: { id: dbUser.id },
          data: {
            twoFactorEnabled: values.isTwoFactorEnabled,
            name: values.name,
            email: values.email,
            password: values.password,
          },
        });
      }

      revalidatePath('/dashboard/settings');
      return { success: 'Settings updated!' };
    } catch (error) {
      console.log('ERROR: ', error);
      return { error: 'Something went wrong...' };
    }
  });
