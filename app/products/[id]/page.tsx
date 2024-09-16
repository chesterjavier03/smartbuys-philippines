import prisma from '@/prisma/client';
import Reviews from '@/components/reviews/reviews';
import { convertMoney } from '@/lib/money-formatter';
import { Separator } from '@radix-ui/react-dropdown-menu';
import Stars from '@/components/reviews/stars';
import Image from 'next/image';
import AddCart from '@/components/cart/add-cart';
import { getReviewAverage } from '@/lib/review-average';

export const revalidate = 60;

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await prisma?.product.findFirst({
    where: { id: params.id },
    include: { reviews: true },
  });
  if (product) {
    const reviewAvg = getReviewAverage(product.reviews.map((r) => r.rating));

    return (
      <main className="sm:p-5 p-1">
        <section className="flex flex-col lg:flex-row gap-4 lg:gap-12 container sm:px-0">
          <div className="flex-1 ">
            <div className="border-[1px] flex flex-col border-solid border-SBP_RED rounded-lg hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                sizes="20vw"
                loading="eager"
                fetchPriority="high"
                style={{ objectFit: 'cover' }}
                className="object-cover h-full w-full rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col flex-1 py-5 sm:p-5">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <div>ProductType</div>
            <Stars rating={reviewAvg} totalReviews={product.reviews.length} />
            <Separator className="my-2" />
            <p className="flex cursor-pointer justify-between text-SBP_BLUE text-5xl font-medium tracking-normal py-5">
              {convertMoney(product.price)}
            </p>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
            {/* <div>{product.description}</div> */}
            <AddCart product={product} />
          </div>
        </section>
        <Reviews productId={product.id} />
      </main>
    );
  }
};

export default ProductPage;
