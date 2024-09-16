import Products from '@/components/products/products';
import prisma from '@/prisma/client';
import { Product } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import ProductLoadingPage from './products/[id]/loading';
import MainLoadingPage from './loading';

export default async function Home() {
  const fetchCachedProductList = unstable_cache(
    async () => {
      return prisma?.product.findMany({
        include: { reviews: true },
        orderBy: { createdAt: 'desc' },
      });
    },
    ['allProductSearch'],
    {
      tags: ['allProducts'],
      revalidate: 5,
    }
  );

  const productList = await fetchCachedProductList();

  const shuffleProductList = [...productList];

  shuffleProductList.forEach((_, i, arr) => {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  });

  return (
    <main className="">
      {/* <Algolia /> */}
      <Products products={shuffleProductList} />
    </main>
  );
}
