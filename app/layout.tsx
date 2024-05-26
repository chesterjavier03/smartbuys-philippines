import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import * as React from 'react';
import Main from './Main';
import QueryClientProvider from './QueryClientProvider';
import AuthProvider from './auth/Provider';
import './globals.css';
export const dynamic = 'force-dynamic';

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

interface Props {
  children: React.ReactNode;
  params: {
    isMenuOpen: boolean;
  };
}

export default function RootLayout({ children, params }: Readonly<Props>) {
  return (
    <html lang='en' className='light'>
      <body className={ubuntu.variable} suppressHydrationWarning={true}>
        <QueryClientProvider>
          <AuthProvider>
            <Main params={params}>{children}</Main>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
