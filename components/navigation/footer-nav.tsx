'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Info, Phone, Store } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FooterNav = () => {
  const pathname = usePathname();

  const footerNav = [
    {
      label: 'Shop',
      path: '/',
      icon: (
        <Store
          size={28}
          className={cn(
            'text-SBP_BLUE fill-white group-hover:scale-110 transition-all duration-300 ease-in-out',
            pathname === '/' && 'text-SBP_BLUE'
          )}
        />
      ),
    },
    {
      label: 'About',
      path: '/about',
      icon: (
        <Image
          src={'/images/smartbuys_logo.png'}
          className="w-auto h-8 object-cover group-hover:scale-110 transition-all duration-300 ease-in-out"
          alt="SmartBuys Philippines"
          loading="eager"
          priority={true}
          width={200}
          height={100}
        />
      ),
    },
    {
      label: 'Contact',
      path: '/contact',
      icon: (
        <Phone
          size={28}
          className={cn(
            'text-SBP_BLUE fill-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-in-out',
            pathname === '/contact' && 'text-SBP_BLUE'
          )}
        />
      ),
    },
  ];
  return (
    <AnimatePresence>
      {footerNav.map((link) => (
        <motion.li
          key={link.path}
          className="relative items-center flex justify-center"
        >
          <div className="w-auto relative items-center flex justify-center">
            <Link className="group px-2" href={link.path}>
              {link.icon}
              {pathname === link.path ? (
                <motion.div
                  // className="h-[2px] w-auto flex mt-1 rounded-full z-0 bg-SBP_YELLOW absolute"
                  className="h-[2px] w-full absolute rounded-full z-0 left-0 -bottom-2 bg-SBP_YELLOW"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  layoutId="footernav-underlineId"
                  transition={{ type: 'spring', stiffness: 55 }}
                />
              ) : null}
            </Link>
          </div>
        </motion.li>
      ))}
    </AnimatePresence>
  );
};

export default FooterNav;
