import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import * as React from 'react';
import Main from './Main';
import './globals.css';
import QueryClientProvider from './QueryClientProvider';
import AuthProvider from './auth/Provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
    <html lang="en" className="light">
      <body className={inter.variable} suppressHydrationWarning={true}>
        <QueryClientProvider>
          <AuthProvider>
            <Main>{children}</Main>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
