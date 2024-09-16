'use client';

import { useCartStore } from '@/lib/client-store';
import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lottie from 'lottie-react';
import emptyCart from '@/public/animations/empty-cart.json';
import { cn } from '@/lib/utils';
import { createId } from '@paralleldrive/cuid2';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../ui/table';
import { MinusCircle, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { convertMoney } from '@/lib/money-formatter';
import { Button } from '../ui/button';

const CartItems = () => {
  const { cart, addToCart, removeFromCart, setCheckoutProgress } =
    useCartStore();

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.price! * item.quantity;
    }, 0);
  }, [cart]);

  const priceInLetters = useMemo(() => {
    return [...totalPrice.toString()].map((letter) => {
      return { letter, id: createId() };
    });
  }, [totalPrice]);

  return (
    <motion.div className="flex flex-col items-center ">
      {cart.length === 0 && (
        <div
          className={cn(
            'flex-col w-full flex items-center justify-center',
            cart.length < 1 && 'sm:mt-28 sm:mb-24 mt-16'
          )}
        >
          <motion.div
            className="h-full"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl text-muted-foreground text-center ">
              Your cart is empty
            </h2>
            <Lottie className="h-full self-center" animationData={emptyCart} />
          </motion.div>
        </div>
      )}
      {cart.length > 0 && (
        <div className="sm:max-h-[75vh] sm:h-[75vh] h-[60vh] max-h-[60vh] sm:px-0 px-2 max-w-sm w-full overflow-y-scroll text-SBP_BLUE">
          <Table className="max-w-2xl mx-auto text-SBP_BLUE">
            <TableHeader>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id.toString()} className=" text-SBP_BLUE">
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-SBP_RED">
                    {convertMoney(item.price)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <Image
                        className="rounded-md"
                        width={48}
                        height={48}
                        src={item.image}
                        alt={item.name}
                        priority
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-between ">
                      <MinusCircle
                        onClick={() => {
                          removeFromCart({
                            ...item,
                            quantity: 1,
                          });
                        }}
                        className="cursor-pointer hover:text-muted-foreground duration-300 transition-colors"
                        size={14}
                      />
                      <p className="text-md font-bold">{item.quantity}</p>
                      <PlusCircle
                        className="cursor-pointer hover:text-muted-foreground duration-300 transition-colors"
                        onClick={() => {
                          addToCart({
                            ...item,
                            quantity: 1,
                          });
                        }}
                        size={14}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <motion.div className="flex items-center justify-center sm:my-4 my-6 overflow-hidden max-w-xs sm:w-full w-3/4 sm:mt-0 sm:bottom-0 bottom-10 sm:relative absolute">
        <span className="text-md pr-1 text-SBP_BLUE">Total: ₱ </span>
        <AnimatePresence mode="popLayout">
          {priceInLetters.map((letter, i) => (
            <motion.div key={letter.id}>
              <motion.span
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ delay: i * 0.1 }}
                className="text-md inline-block text-SBP_BLUE"
              >
                {letter.letter}
              </motion.span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <Button
        onClick={() => {
          setCheckoutProgress('payment-page');
        }}
        className="max-w-xs sm:w-full w-3/4 sm:mt-0 sm:bottom-0 bottom-5 sm:relative absolute"
        disabled={cart.length === 0}
      >
        Checkout
      </Button>
    </motion.div>
  );
};

export default CartItems;
