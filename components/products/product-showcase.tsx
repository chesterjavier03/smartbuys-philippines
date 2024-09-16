import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '../ui/card';
import { Product } from '@prisma/client';
import Image from 'next/image';

const ProductShowcase = ({ product }: { product: Product }) => {
  return (
    <div className="border-[3px] border-solid border-SBP_BLUE rounded-lg">
      <Image
        src={product.image}
        alt={product.name}
        priority
        className="rounded-lg object-fill w-full h-full"
        width={500}
        height={500}
      />
    </div>
  );
};

export default ProductShowcase;
