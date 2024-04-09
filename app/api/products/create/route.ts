import { getApp, getApps, initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

export const POST = async (request: NextRequest) => {
  
  const app = !getApps().length ? initializeApp(clientCredentials) : getApp();
  const storage = getStorage(app)

  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false, message: 'Please add a file to upload' }, {status: 400})
  }

  let type: string | null = data.get('type') as string;
  let category: string | null = data.get('category') as string;
  switch (category) {
    case 'Home':
      type = 'Home';
      break;
    case 'Food':
      type = 'Food';
      break;
    default:
      break;
  }
  
  try {
    const storageRef = ref(storage, `${category}/${type}/${file.name}`)
    const uploadTask = await uploadBytes(storageRef, file)
    const downloadUrl = await getDownloadURL(uploadTask.ref)
    if (!downloadUrl) {
      return NextResponse.json({error: 'There was some error while uploading the file.'}, {status: 404})
    }

    await prisma?.product.create({
      data: {
        image: downloadUrl,
        category: data.get('category') as string,
        name: data.get('name') as string,
        price: Number(data.get('price')),
        type: type,
        description: data.get('description') as string,
        createdAt: new Date().toISOString(),
        itemCount: 10,
      }
  });

    return NextResponse.json({ message: 'Product Created Successfully' }, {status: 200});
  } catch (e: any) {
    const tmp = e.message || e.toString()
    console.log(tmp)
    return NextResponse.json(tmp, {status: 500});
  }
}