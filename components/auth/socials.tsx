'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';

const Socials = () => {
  return (
    <Button
      variant={'outline'}
      className="flex gap-4 w-full"
      onClick={() => signIn('google', { redirect: false, callbackUrl: '/' })}
    >
      <p>Sign in with Google</p>
      <FcGoogle className="w-5 h-5" />
    </Button>
  );
};

export default Socials;
