'use client';

import { SessionProvider } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';

const AuthProvider = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider session={(children as any).session}>
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;
