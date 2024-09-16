'use client';

import { motion } from 'framer-motion';
import orderConfirmed from '@/public/animations/order-confirmed.json';
import Lottie from 'lottie-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useCartStore } from '@/lib/client-store';

const OrderConfirmed = () => {
  const { setCheckoutProgress, setCartOpen } = useCartStore();
  return (
    <div className="flex flex-col items-center gap-4 max-h-[75vh] h-[75vh]">
      <motion.div
        className="h-full"
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Lottie
          className="h-full self-center my-4"
          animationData={orderConfirmed}
        />
      </motion.div>
      <h2 className="text-2xl font-medium">Thank you for your purchase!</h2>
      <Link href={'/dashboard/orders'}>
        <Button
          variant={'default'}
          onClick={() => {
            setCheckoutProgress('cart-page');
            setCartOpen(false);
          }}
        >
          View your order
        </Button>
      </Link>
    </div>
  );
};

export default OrderConfirmed;
