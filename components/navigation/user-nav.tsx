'use client';

import {
  Asterisk,
  AtSign,
  Info,
  Phone,
  PhoneCall,
  ShoppingBag,
  Store,
  StoreIcon,
  UserCircle,
} from 'lucide-react';
import Link from 'next/link';
import CartDrawer from '../cart/cart-drawer';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Session } from 'next-auth';
import UserButton from './user-button';

const UserNav = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <AnimatePresence>
      {!session ? (
        <motion.li className="relative flex items-center justify-center hover:scale-110 duration-200">
          <Link className="group flex gap-2" href="/auth/login">
            <UserCircle
              size={28}
              className={cn(
                'text-SBP_BLUE fill-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 ease-in-out',
                pathname === '/auth/login' && 'text-SBP_BLUE '
              )}
            />
            {pathname === '/auth/login' ? (
              <motion.div
                className="h-[2px] w-full absolute rounded-full z-0 left-0 -bottom-2 bg-SBP_YELLOW"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                layoutId="mainnav-underlineId"
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 55 }}
              />
            ) : null}
          </Link>
        </motion.li>
      ) : (
        <li className="flex items-center justify-center">
          <UserButton expires={session?.expires} user={session?.user} />
        </li>
      )}
    </AnimatePresence>
  );
};

export default UserNav;
