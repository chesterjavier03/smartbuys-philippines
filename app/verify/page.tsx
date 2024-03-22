import { Card, Button, Image } from '@nextui-org/react';
import classNames from 'classnames';
import { register } from 'module';
import { Input } from 'postcss';
import React from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const VerifyPage = () => {
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
              className={classNames({
                'w-full h-full object-contain z-0 pb-10': true,
                'pointer-events-none': process.env.NODE_ENV === 'production',
              })}
              width={'50%'}
              height={'50%'}
              src={'/images/smartbuys_wings.webp'}
              srcSet={'/images/smartbuys_wings.webp'}
              loading={'eager'}
            />
            <div className="flex flex-col justify-center place-items-center align-middle gap-10 tracking-widest text-center text-[#1a3d57]">
              <span className="text-4xl">Check your emial</span>
              <span className="text-xl font-medium">
                A sign in link has been sent to your email address.
              </span>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default VerifyPage;
