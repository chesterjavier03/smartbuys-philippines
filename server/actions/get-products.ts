'use server';

import prisma from '@/prisma/client';

export const getProduct = async (id: string) => {
  try {
    const product = await prisma?.product.findFirst({ where: { id: id } });
    if (!product) return { error: 'Product not found' };
    return { success: product };
  } catch (error) {
    console.log('ERROR: ', error);
    return { error: 'Failed to fetch product' };
    
  }
}