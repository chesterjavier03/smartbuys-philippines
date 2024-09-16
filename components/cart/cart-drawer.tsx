'use client';

import { useCartStore } from '@/lib/client-store';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import CartMessage from './cart-message';
import CartItems from './cart-items';
import Payment from './payment';
import OrderConfirmed from './order-confirmed';

const CartDrawer = () => {
  const pathname = usePathname();
  const { cart, checkoutProgress, setCheckoutProgress, cartOpen, setCartOpen } =
    useCartStore();

  return (
    <Drawer open={cartOpen} onOpenChange={setCartOpen} direction="right">
      <DrawerTrigger>
        <div className="group relative pr-2 pl-1">
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.span
                animate={{ scale: 1, opacity: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ scale: 0 }}
                className="z-10 absolute flex items-center justify-center -top-1 -right-0.5 w-5 h-5 dark:bg-SBP_YELLOW bg-SBP_YELLOW text-SBP_BLUE text-xs font-bold rounded-full"
              >
                {cart.length}
              </motion.span>
            )}
          </AnimatePresence>
          <ShoppingBag
            size={28}
            className={cn(
              'text-SBP_BLUE fill-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 ease-in-out',
              pathname === '/cart' && 'text-SBP_YELLOW'
            )}
          />
        </div>
      </DrawerTrigger>
      <DrawerContent className="fixed sm:left-[75vw] left-[25vw]  h-full">
        <DrawerHeader>
          <CartMessage />
        </DrawerHeader>
        <div>
          {checkoutProgress === 'cart-page' && <CartItems />}
          {checkoutProgress === 'payment-page' && <Payment />}
          {checkoutProgress === 'confirmation-page' && <OrderConfirmed />}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
