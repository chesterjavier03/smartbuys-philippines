'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardNav = ({
  allNav,
}: {
  allNav: { label: string; path: string; icon: JSX.Element }[];
}) => {
  const pathname = usePathname();

  return (
    <nav className="py-2 overflow-auto mb-4">
      <ul className="flex gap-6 text-base font-semibold">
        <AnimatePresence>
          {allNav.map((link) => (
            <motion.li whileTap={{ scale: 0.95 }} key={link.path}>
              <Link
                className={cn(
                  'group flex gap-1 flex-col items-center relative text-SBP_BLUE',
                  pathname === link.path && 'text-primary'
                )}
                href={link.path}
              >
                {link.icon}
                {link.label}
                {pathname === link.path ? (
                  <motion.div
                    className="h-[2px] w-full rounded-full absolute bg-primary z-0 left-0 -bottom-1"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    layoutId="dashboardnav-underlineId"
                    transition={{ type: 'spring', stiffness: 75, mass: 0.5 }}
                  />
                ) : null}
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </nav>
  );
};

export default DashboardNav;
