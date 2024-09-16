'use client';

import { motion } from 'framer-motion';
import PaymentForm from './payment-form';
import { useCartStore } from '@/lib/client-store';
import { useTheme } from 'next-themes';

const Payment = () => {
  const { cart } = useCartStore();
  const { theme } = useTheme();

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price! * item.quantity;
  }, 0);

  return (
    <motion.div className="max-w-sm sm:w-full w-3/4 mx-auto">
      <PaymentForm totalPrice={totalPrice} />
    </motion.div>
  );
};

export default Payment;
