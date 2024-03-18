import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from "next/server";
import { cache } from 'react';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const result = await fetchProduct(params.id);

  if (!result) return NextResponse.json({}, { status: 401 });

  return NextResponse.json(result);
}

const fetchProduct = cache((productId: string) =>
  prisma?.product.findUnique({ where: { id: productId } })
);