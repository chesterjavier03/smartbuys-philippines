'use server';

import { CreateOrderSchema } from '@/types/order-schema';
import { createSafeActionClient } from 'next-safe-action';
import { auth } from '../auth';
import prisma from '@/prisma/client';

const action = createSafeActionClient();

export const createOrder = action.schema(CreateOrderSchema).action(async ({ parsedInput: { products, status, total, paymentIntentId } }) => { 
  try {
    const user = await auth();
    if (!user) return { error: 'Please login to your account.' };

    const order = await prisma?.orders.create({
      data: {
        status,
        paymentIntentId,
        total,
        userId: user.user.id,
      }
    });

    const orderProducts = products?.map(async ({ productId, quantity }) => {
      const newOrderProduct = await prisma?.orderProducts.create({
        data: {
          quantity,
          ordersId: order.id,
          productId,
        }
      })
    });

    return { success: 'Order has been added!' };
  
  } catch (error) {
    console.log('ERROR: ', error);
  }
});