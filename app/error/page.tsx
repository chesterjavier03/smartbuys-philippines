import { Button, Card, Image } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

const ErrorPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 justify-center align-middle w-screen justify-items-center place-items-center h-[calc(100vh-4rem)]">
        <Card
          shadow="lg"
          className="grid grid-cols-1 justify-center align-middle justify-items-center place-items-center md:w-5/12 w-11/12 p-2 m-0 md:p-5 border-solid border-2 border-[#1a3d57] bg-white/70
        cursor-pointer  hover:bg-white/50"
        >
          <div className="flex flex-col w-full h-full place-content-start place-items-center mb-5 mt-5">
            <Image
              radius="sm"
              alt={'SmartBuys Philippines'}
              className="w-full h-full object-contain z-0 pb-10"
              width={'50%'}
              height={'50%'}
              src={'/images/smartbuys_wings.webp'}
              srcSet={'/images/smartbuys_wings.webp'}
              loading={'eager'}
            />
            <div className="flex flex-col justify-center place-items-center align-middle gap-10 tracking-widest text-center text-[#1a3d57]">
              <span className="text-4xl">Unable to sign in</span>
              <span className="text-xl font-medium">
                <p>The sign in link is no longer valid.</p>
                <p>It may have been used already or it may have expired.</p>
              </span>
              <Button
                as={Link}
                href="/login"
                variant="solid"
                disableRipple
                type="submit"
                fullWidth
                size="lg"
                className="w-auto md:text-md text-lg bg-[#ff0000] text-white"
                radius="sm"
              >
                Login
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ErrorPage;
