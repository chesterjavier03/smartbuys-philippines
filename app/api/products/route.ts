import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'
import { cache } from "react";
import { Product } from "@prisma/client";

export const GET = async () => {
  return NextResponse.json(await fetchProduct());
}

const fetchProduct = cache(() =>
  prisma.product.findMany({})
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