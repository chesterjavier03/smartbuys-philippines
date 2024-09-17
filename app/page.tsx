import ProductList from '@/components/products/product-list';
import prisma from '@/prisma/client';
import { unstable_cache } from 'next/cache';

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
      <ProductList products={shuffleProductList} />
    </main>
  );
}
