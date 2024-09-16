'use server';

import { ReviewsSchema } from '@/types/reviews-schema';
import { createSafeActionClient } from 'next-safe-action'
import { auth } from '../auth';
import { revalidatePath } from 'next/cache';
import prisma from '@/prisma/client';

const action = createSafeActionClient();

export const addReview = action.schema(ReviewsSchema).action(async ({ parsedInput: { productId, rating, comment } }) => {
  try {
    const session = await auth();

    if (!session) return { error: 'Please sign in' };

    const reviewExist = await prisma?.reviews.findFirst({
      where: {
        AND: [{
          productId: productId
        }, { userId: session.user.id }]
      }
    });

    if (reviewExist) {
      return { error: 'You have already reviewed this product' };
    }

    const newReview = await prisma?.reviews.create({
      data: {
        productId,
        rating,
        comment,
        userId: session.user.id,
      }
    });

    revalidatePath(`/products/${productId}`);
    return { success: "Successfully added a review!" };
  } catch (error) {
    console.log('ERROR: ', error);
    return { error: JSON.stringify(error) };
  }
})