import prisma from '@/prisma/client';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { NextRequest, NextResponse } from 'next/server';
import { cache } from 'react';

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const result = await fetchProduct(params.id);

  if (!result) return NextResponse.json({}, { status: 401 });

  return NextResponse.json(result);
};

const fetchProduct = cache((productId: string) =>
  prisma?.product.findUnique({ where: { id: productId } })
);

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const app = !getApps().length ? initializeApp(clientCredentials) : getApp();
    const storage = getStorage(app);

    const product = await prisma?.product.findUnique({
      where: { id: params.id },
    });

    if (!product)
      return NextResponse.json({ error: 'Invalid Product' }, { status: 404 });

    // const imageRef = ref(storage, product.image);
    // deleteObject(imageRef);

    await prisma?.product.delete({
      where: { id: product.id },
    });

    return NextResponse.json({});
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ error: 'Invalid Request' }, { status: 404 });
  }
};
