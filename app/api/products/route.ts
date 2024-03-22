import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'
import { cache } from "react";

export const GET = async (request: NextRequest) => {
  return NextResponse.json(await fetchProduct());
}

const fetchProduct = cache(() =>
  prisma.product.aggregateRaw({
    pipeline: [
      { $sample: { size: 2000 } },
    ],
  })
);