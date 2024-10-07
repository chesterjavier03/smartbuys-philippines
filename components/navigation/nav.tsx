import { auth } from '@/server/auth';
import React from 'react';
import UserNav from './user-nav';
import CartDrawer from '../cart/cart-drawer';
import MainNav from './main-nav';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const Nav = async () => {
  const session = await auth();

  return (
    <header className="sticky w-auto py-3 sm:top-5 top-0 bg-SBP_RED px-5 sm:rounded-xl sm:my-3 mb-5 duration-400 z-30 ">
      <nav className="">
        <ul className="flex justify-between items-center gap-5">
          <li className="flex flex-1">
            <Link href="/" aria-label="SmartBuys Philippines">
              <Image
                className={cn({
                  'object-contain hover:scale-110 duration-200 ease-in-out w-[70px] h-auto':
                    true,
                  'pointer-events-none': process.env.NODE_ENV === 'production',
                })}
                width={75}
                height={75}
                alt="SmartBuys Philippines"
                src="/images/smartbuys.webp"
                priority={true}
                fetchPriority="high"
                aria-label="SmartBuys Philippines"
              />
            </Link>
          </li>
          <MainNav />
          <li className="relative flex items-center justify-center hover:scale-110 duration-200">
            <CartDrawer />
          </li>
          <UserNav session={session!} />
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
