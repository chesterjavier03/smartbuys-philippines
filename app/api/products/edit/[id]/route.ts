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

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
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

    if (data.get('file')) {
      const file: File = data.get('file') as File;
      const buff = await file.arrayBuffer();
      let fileData = Buffer.from(buff);
      if (!fileData) {
        return NextResponse.json(
          { success: false, message: 'Please add a file to upload' },
          { status: 400 }
        );
      }

      await prisma?.product.update({
        where: { id: product.id },
        data: {
          image: fileData,
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
