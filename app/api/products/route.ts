import prisma from '@/prisma/client';
import { Product } from '@prisma/client';
import { NextResponse } from 'next/server';
import { cache } from 'react';
// export const maxDuration = 60;
// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

export const GET = async () => {
  const result = await fetchProduct();
  return NextResponse.json(shuffleProducts(result));
};

const fetchProduct = cache(() =>
  prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
);

const shuffleProducts = (products: Product[]): Product[] => {
  const shuffleProducts = [...products];
  for (let i = shuffleProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleProducts[i], shuffleProducts[j]] = [
      shuffleProducts[j],
      shuffleProducts[i],
    ];
  }

  return shuffleProducts;
};
