'use client';

import { convertMoney } from '@/lib/money-formatter';
import { Product } from '@prisma/client';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import Stars from '../reviews/stars';
import { getReviewAverage } from '@/lib/review-average';

const Products = ({ products }: { products: any[] }) => {
  return (
    <main className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5 mb-20 sm:px-1 px-1.5">
      {products?.map((product) => (
        <Card
          key={product.id}
          className="shadow-2xl shadow-black/30 sm:hover:scale-105 duration-200 border-[1px] border-solid border-SBP_RED rounded-md sm:rounded-lg"
        >
          <CardContent className="p-1">
            <Link
              className="py-2"
              key={product.id}
              href={`/products/${product.id}`}
            >
              <Image
                className="rounded-md pb-2 object-cover h-auto w-auto"
                src={product.image}
                width={720}
                height={480}
                alt={product.name}
                loading="eager"
                style={{ objectFit: 'cover' }}
                fetchPriority="high"
              />
              <div className="flex justify-between p-1">
                <div className="font-medium text-sm px-1">
                  <h2>{product.name}</h2>
                  <Stars
                    rating={getReviewAverage(
                      product.reviews.map((r) => r.rating)
                    )}
                    totalReviews={product.reviews.length}
                  />
                  <p className="text-sm text-muted-foreground">
                    {product.type}
                  </p>
                </div>
                <div>
                  <Badge className="text-sm bg-SBP_RED" variant={'default'}>
                    {convertMoney(product.price)}
                  </Badge>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </main>
  );
};

export default Products;
