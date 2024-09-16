'use server';

import { ProductSchema } from '@/types/product-schema';
import { createSafeActionClient } from 'next-safe-action'
import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { uploadToFirestore } from './upload';
import { auth } from '../auth';

const action = createSafeActionClient();

export const createProduct = action.schema(ProductSchema).action(async ({ parsedInput: { description, price, name, id, image } }) => { 
  try {
    if (id) {
      const currentProduct = await prisma?.product.findFirst({ where: { id: id } });
      if (!currentProduct) return { error: 'Product not found' };

      image = await uploadToFirestore(name, image!) as string;

      const editProduct = await prisma?.product.update({
        where: { id: id }, data: {
          description, price, name, image
        }
      });
      revalidatePath('/dashboard/products');
      return { success: `Product ${editProduct.name} has been edited` };
    };
    
    if (!id) {
      const productImage = await uploadToFirestore(
        name,
        image!) as string;
      
      const newProduct = await prisma?.product.create({
        data: {
          description,
          price,
          name,
          category: 'Terno',
          image: productImage,
          type: 'Terno'
        }
      });
      revalidatePath("/dashboard/products");
      return { success: `Product ${newProduct.name} has been created` };
    };
  } catch (error) {
    console.log('ERROR: ', error);
    return { error: 'Failed to create product' };
  }
});