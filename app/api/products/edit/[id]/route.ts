import { editProductSchema } from '@/app/_utility/validationSchema';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const app = !getApps().length ? initializeApp(clientCredentials) : getApp();
  const storage = getStorage(app);

  const data = await request.formData();
  const validation = editProductSchema.safeParse(data);

  if (!validation.success)
    return NextResponse.json(validation.error.formErrors, { status: 400 });

  let name: string = data.get('name') as string;
  let description: string = data.get('description') as string;
  let category: string = data.get('category') as string;
  let type: string = data.get('type') as string;
  let price: string = data.get('price') as string;

  try {
    const product = await prisma?.product.findUnique({
      where: { id: params.id },
    });

    if (!product)
      return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });

    if (data.get('file') !== product.image) {
      const file: File = data.get('file') as File;
      if (!file) {
        return NextResponse.json(
          { success: false, message: 'Please add a file to upload' },
          { status: 400 }
        );
      }

      const storageRef = ref(storage, `${category}/${type}/${file.name}`);
      const uploadTask = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(uploadTask.ref);
      if (!downloadUrl) {
        return NextResponse.json(
          { error: 'There was some error while uploading the file.' },
          { status: 404 }
        );
      }

      await prisma?.product.update({
        where: { id: product.id },
        data: {
          image: downloadUrl,
          name,
          description,
          price: parseInt(price),
          category,
          type,
        },
      });
    } else {
      await prisma?.product.update({
        where: { id: product.id },
        data: {
          image: product.image,
          name,
          description,
          price: parseInt(price),
          category,
          type,
        },
      });
    }

    return NextResponse.json(
      { message: 'Product Created Successfully' },
      { status: 200 }
    );
  } catch (e: any) {
    const tmp = e.message || e.toString();
    console.log(tmp);
    return NextResponse.json(tmp, { status: 500 });
  }
};
