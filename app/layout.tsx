import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import * as React from 'react';
import Main from './Main';
import QueryClientProvider from './QueryClientProvider';
import AuthProvider from './auth/Provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'SmartBuys Philippines | Unlocking Smarter Shopping Experiences!',
  description:
    'Discover a world of smart shopping at SmartBuys Philippines. Experience the perfect blend of quality, affordability, and convenience as you explore our curated selection of premium products. Elevate your lifestyle with our wide range of offerings, ensuring a seamless online shopping experience for the discerning Filipino shopper.',
};

interface Props {
  children: React.ReactNode;
  params: {
    isMenuOpen: boolean;
  };
}

export default function RootLayout({ children, params }: Readonly<Props>) {
  return (
    <html lang="en" className="light">
      <body className={inter.variable} suppressHydrationWarning={true}>
        <AuthProvider>
          <QueryClientProvider>
            <Main params={params}>{children}</Main>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
