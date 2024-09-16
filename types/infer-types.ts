import { Prisma } from '@prisma/client';

export type ReviewWithUser = Prisma.ReviewsGetPayload<{
  include: {
    user: true;
  };
}>;