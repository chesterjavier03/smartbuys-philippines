'use client';

import { useCartStore } from '@/lib/client-store';
import { Product } from '@prisma/client';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';

const AddCart = ({ product }: { product: Product }) => {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    toast.error('Product not found');
    return redirect('/');
  }

  return (
    <>
      <div className="flex items-center gap-4 justify-between my-4 w-full">
        <Button
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
          className="text-secondary bg-SBP_RED hover:bg-SBP_RED/90"
        >
          <Minus size={25} strokeWidth={3} />
        </Button>
        <Button className="flex-1 text-secondary bg-SBP_RED hover:bg-SBP_RED/90">
          Quantity: {quantity}
        </Button>
        <Button
          onClick={() => {
            setQuantity(quantity + 1);
          }}
          className="text-secondary bg-SBP_RED hover:bg-SBP_RED/90"
        >
          <Plus size={18} strokeWidth={3} />
        </Button>
      </div>
      <Button
        className="text-secondary bg-SBP_RED"
        onClick={() => {
          toast.success(
            `Added ${product.name + ' ' + product.type} to your cart!`
          );
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
          });
        }}
      >
        Add to cart
      </Button>
    </>
  );
};

export default AddCart;
