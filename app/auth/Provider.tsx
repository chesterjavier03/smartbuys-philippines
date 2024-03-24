'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider
      session={(children as any).session}
      refetchInterval={5 * 60}
    >
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;
