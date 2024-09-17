import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from 'sonner';
import Nav from '@/components/navigation/nav';
import {
  Ban,
  CheckCircle,
  CheckCircle2,
  CircleAlert,
  CircleAlertIcon,
  Home,
  Info,
  Loader,
  Loader2,
  Loader2Icon,
  StopCircleIcon,
  Store,
  TriangleAlert,
} from 'lucide-react';
import Loadable from 'next/dist/shared/lib/loadable.shared-runtime';
import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';
import FooterNav from '@/components/navigation/footer-nav';

const ubuntu = Ubuntu({
  variable: '--font-inter',
  subsets: [
    'cyrillic',
    'cyrillic-ext',
    'greek',
    'greek-ext',
    'latin',
    'latin-ext',
  ],
  weight: '500',
  style: 'normal',
  display: 'auto',
  preload: true,
});

export const metadata: Metadata = {
  title: 'SmartBuys Philippines | Unlocking Smarter Shopping Experiences!',
  description:
    'Discover a world of smart shopping at SmartBuys Philippines. Experience the perfect blend of quality, affordability, and convenience as you explore our curated selection of premium products. Elevate your lifestyle with our wide range of offerings, ensuring a seamless online shopping experience for the discerning Filipino shopper.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="light">
      <body className={(ubuntu.className, '')} suppressHydrationWarning={true}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex-grow sm:px-6 md:px-12 mx-auto max-w-8xl">
            <Nav />
            <div className="px-1 sm:px-2">{children}</div>
          </div>
          <footer
            className="static md:hidden pt-5"
            suppressHydrationWarning={true}
          >
            <div className="fixed bottom-0 left-0 z-30 w-full h-14 bg-SBP_RED">
              <div className="grid h-full grid-cols-3 mx-auto font-medium py-3">
                <FooterNav />
              </div>
            </div>
          </footer>
          <Toaster
            icons={{
              error: <Ban color="white" />,
              info: <Info color="white" />,
              warning: <TriangleAlert color="#1a3e58" />,
              success: <CheckCircle color="white" className="animate-ping" />,
              loading: <Loader2Icon color="white" className="animate-spin" />,
            }}
            toastOptions={{
              classNames: {
                title: 'px-2',
                loading: 'bg-[#1DE9A3] text-white',
                error: 'bg-[#ff0000] text-white',
                success: 'bg-[#1DE9A3] text-white',
                warning: 'bg-[#fff300] text-[#1a3e58]',
                info: 'bg-blue-400 text-white',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
