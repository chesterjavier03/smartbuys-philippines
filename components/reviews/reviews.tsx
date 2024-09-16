import prisma from '@/prisma/client';
import ReviewsForm from './reviews-form';
import Review from './review';

const Reviews = async ({ productId }: { productId: string }) => {
  const reviews = await prisma?.reviews.findMany({
    where: { productId: productId },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <section className="sm:py-4 sm:pb-0 pb-16 sm:pt-8 pt-8 sm:px-0 container">
      <div className="flex gap-2 lg:gap-12 justify-stretch lg:flex-row flex-col">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
          <ReviewsForm productId={productId} />
          <Review reviews={reviews} />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {/* <ReviewChart reviews={data} /> */}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
