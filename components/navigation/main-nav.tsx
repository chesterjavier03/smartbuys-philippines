'use client';

import { Info, Phone, Store } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const MainNav = () => {
  const pathname = usePathname();
  const mainNav = [
    {
      label: 'Shop',
      path: '/',
      icon: (
        <Store
          size={28}
          className={cn(
            'text-SBP_BLUE fill-white group-hover:scale-125 transition-all duration-300 ease-in-out',
            pathname === '/' && 'text-SBP_BLUE'
          )}
        />
      ),
    },
    {
      label: 'About',
      path: '/about',
      icon: (
        <Info
          size={28}
          className={cn(
            'text-SBP_BLUE fill-white group-hover:scale-125 group-hover:rotate-180 transition-all duration-300 ease-in-out',
            pathname === '/about' && 'text-SBP_BLUE'
          )}
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
            'text-SBP_BLUE fill-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 ease-in-out',
            pathname === '/contact' && 'text-SBP_BLUE'
          )}
        />
      ),
    },
  ];

  return (
    <AnimatePresence>
      {mainNav.map((link) => (
        <motion.li
          key={link.path}
          className="relative items-center hidden sm:flex "
        >
          <Link className="group px-2" href={link.path}>
            {link.icon}
            {pathname === link.path ? (
              <motion.div
                className="h-[2px] w-full absolute rounded-full z-0 left-0 -bottom-2 bg-SBP_YELLOW"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                layoutId="mainnav-underlineId"
                transition={{ type: 'spring', stiffness: 55 }}
              />
            ) : null}
          </Link>
        </motion.li>
      ))}
    </AnimatePresence>
  );
};

export default MainNav;
