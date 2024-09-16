import DashboardNav from '@/components/navigation/dashboard-nav';
import { cn } from '@/lib/utils';
import { auth } from '@/server/auth';
import { BarChart, Package, PenSquare, Settings, Truck } from 'lucide-react';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  const userNav = [
    {
      label: 'Orders',
      path: '/dashboard/orders',
      icon: (
        <Truck
          size={28}
          className={cn(
            ' fill-white group-hover:scale-125 transition-all duration-300 ease-in-out group-hover:translate-x-3'
          )}
        />
      ),
    },
    {
      label: 'Settings',
      path: '/dashboard/settings',
      icon: (
        <Settings
          size={28}
          className={cn(
            ' fill-white group-hover:scale-125 group-hover:rotate-180 transition-all duration-300 ease-in-out'
          )}
        />
      ),
    },
  ];

  const adminNav =
    session?.user.role === 'ADMIN'
      ? [
          {
            label: 'Analytics',
            path: '/dashboard/analytics',
            icon: (
              <BarChart
                size={28}
                className={cn(
                  ' fill-white group-hover:scale-125 transition-all duration-300 ease-in-out'
                )}
              />
            ),
          },
          {
            label: 'Create',
            path: '/dashboard/add-product',
            icon: (
              <PenSquare
                size={28}
                className={cn(
                  ' fill-white group-hover:scale-125 group-hover:rotate-45 transition-all duration-300 ease-in-out'
                )}
              />
            ),
          },
          {
            label: 'Products',
            path: '/dashboard/products',
            icon: (
              <Package
                size={28}
                className={cn(
                  ' fill-white group-hover:scale-125 group-hover:rotate-45 transition-all duration-300 ease-in-out'
                )}
              />
            ),
          },
        ]
      : [];

  const allNav = [...adminNav, ...userNav];

  return (
    <div className="items-center justify-center px-5 sm:mb-0 mb-20">
      <DashboardNav allNav={allNav} />
      {children}
    </div>
  );
};

export default DashboardLayout;
