'use client';

import { Button } from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignOutPage = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => {
          signOut().then(() => router.push('/'));
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default SignOutPage;
