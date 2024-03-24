import prisma from '@/prisma/client';
import { NextResponse } from "next/server";
import { cache } from "react";

export const GET = async () => {
  return NextResponse.json(await fetchProduct());
}

const fetchProduct = cache(() =>
  prisma.product.findMany({ orderBy: {createdAt: "desc"}})
);
// const fetchProduct = async () => {
//   return shuffleProducts(await prisma.product.findMany({}));
// }

// const shuffleProducts = (products: Product[]): Product[] => {
//     const shuffleProducts = [...products];
//     for (let i = shuffleProducts.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffleProducts[i], shuffleProducts[j]] = [shuffleProducts[j], shuffleProducts[i]];
//     }

//     return shuffleProducts;
// }