'use server';

import { createSafeActionClient } from 'next-safe-action';
import * as z from 'zod';
import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { deleteObject, getStorage, ref } from 'firebase/storage';

const action = createSafeActionClient();

const clientCredentials = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const deleteProduct = action
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const app = !getApps().length
        ? initializeApp(clientCredentials)
        : getApp();
      const storage = getStorage(app);

      const product = await prisma?.product.findUnique({
        where: { id: id },
      });

      if (!product) {
        return { error: 'No product found' };
      }

      const imageRef = ref(storage, product.image);
      deleteObject(imageRef);

      const data = await prisma?.product.delete({ where: { id: id } });
      
      revalidatePath('/dashbaord/products');
      return { success: `Product ${data.name} has been deleted` };
    } catch (error) {
      console.log('ERROR: ', error);
      return { error: 'Failed to delete product' };
    }
  });
