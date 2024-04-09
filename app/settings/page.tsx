'use client';

import animationData from '@/public/animations/under_development.json';
import { Spinner } from '@nextui-org/react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => (
    <div className="h-full">
      <Spinner
        color="success"
        size="lg"
        className="flex h-[calc(100vh-4rem)] align-middle justify-center justify-items-center content-center overflow-hidde"
      />
    </div>
  ),
});

const SettingsPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 w-auto justify-items-center place-items-start md:h-[calc(20vh-4rem)] h-auto mx-5">
        <div className="flex justify-center w-auto">
          <Lottie animationData={animationData} className="w-auto h-auto" />
        </div>
        <div className="flex flex-col gap-2 tracking-widest text-center text-[#1a3d57]">
          <span className="md:text-4xl text-3xl md:mb-5 mb-1">
            Page under construction
          </span>
          <div className="flex flex-col my-5 gap-y-3">
            <span className="md:text-xl font-medium tracking-wider">
              We are preparing something amazing and exciting for you.
            </span>
            <span className="md:text-xl font-medium tracking-wider">
              Special surprise for our valued customers.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
