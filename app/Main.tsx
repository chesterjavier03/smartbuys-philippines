'use client';

import { Avatar, Image, NextUIProvider } from '@nextui-org/react';
import React from 'react';
import NavBar from './NavBar';
import {
  HiMiniChatBubbleBottomCenterText,
  HiMiniInformationCircle,
  HiMiniVideoCamera,
  HiShoppingBag,
  HiUserCircle,
} from 'react-icons/hi2';
import { VscSettings } from 'react-icons/vsc';
import Link from 'next/link';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Main = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  return (
    <NextUIProvider>
      <NavBar />
      <main className="static md:h-[calc(100vh-4rem)] md:pb-0 h-[calc(100vh-7rem)] pb-4 overflow-y-auto">
        {children}
      </main>
      <footer className="static md:hidden pt-5">
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-[#ff0000]">
          <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
            <Link
              href={'/'}
              className={classNames({
                'hover:text-[#fff000] h-auto flex cursor-pointer rounded-md p-unit-xs':
                  true,
                'inline-flex flex-col items-center justify-center px-5 group':
                  true,
                '!text-[#fff300]': currentPath === '/',
              })}
            >
              <HiShoppingBag
                className={`w-5 h-5 mb-2 ${
                  currentPath !== '/'
                    ? 'text-default-200/70'
                    : 'text-white scale-125'
                }`}
              />
              <span
                className={classNames({
                  'text-sm text-default-200/70': true,
                  '!text-white scale-110': currentPath === '/',
                })}
              >
                Shop
              </span>
            </Link>
            <Link
              href={'/live'}
              className={classNames({
                'hover:text-[#fff000] h-auto flex cursor-pointer rounded-md p-unit-xs':
                  true,
                'inline-flex flex-col items-center justify-center px-5 group':
                  true,
                '!text-[#fff300]': currentPath === '/live',
              })}
            >
              <HiMiniVideoCamera
                className={`w-5 h-5 mb-2 ${
                  currentPath !== '/live'
                    ? 'text-default-200/70'
                    : 'text-white scale-125'
                }`}
              />
              <span
                className={classNames({
                  'text-sm text-default-200/70': true,
                  '!text-white scale-110': currentPath === '/live',
                })}
              >
                Live
              </span>
            </Link>
            <Link
              href={'/about'}
              className="hover:text-[#fff000] h-auto flex cursor-pointer place-content-center"
            >
              <Image
                src={'/images/smartbuys_logo.png'}
                className="w-16 bottom-5"
              />
            </Link>
            <Link
              href={'/contact'}
              className={classNames({
                'hover:text-[#fff000] h-auto flex cursor-pointer rounded-md p-unit-xs':
                  true,
                'inline-flex flex-col items-center justify-center px-5 group':
                  true,
                '!text-[#fff300]': currentPath === '/contact',
              })}
            >
              <HiMiniChatBubbleBottomCenterText
                className={`w-5 h-5 mb-2 ${
                  currentPath !== '/contact'
                    ? 'text-default-200/70'
                    : 'text-white scale-125'
                }`}
              />
              <span
                className={classNames({
                  'text-sm text-default-200/70': true,
                  '!text-white scale-110': currentPath === '/contact',
                })}
              >
                Contact
              </span>
            </Link>
            {!session && (
              <Link
                href={'/login'}
                className={classNames({
                  'hover:text-[#fff000] h-auto flex cursor-pointer rounded-md p-unit-xs':
                    true,
                  'inline-flex flex-col items-center justify-center px-5 group':
                    true,
                  '!text-[#fff300]': currentPath === '/login',
                })}
              >
                <HiUserCircle
                  className={`w-5 h-5 mb-2 ${
                    currentPath !== '/login'
                      ? 'text-default-200/70'
                      : 'text-white scale-125'
                  }`}
                />
                <span
                  className={classNames({
                    'text-sm text-default-200/70': true,
                    '!text-white scale-110': currentPath === '/login',
                  })}
                >
                  Login
                </span>
              </Link>
            )}
            {session && (
              <Link
                href={'/settings'}
                className={classNames({
                  'hover:text-[#fff000] h-auto flex cursor-pointer rounded-md p-unit-xs':
                    true,
                  'inline-flex flex-col items-center justify-center px-5 group':
                    true,
                  '!text-[#fff300]': currentPath === '/settings',
                })}
              >
                <VscSettings
                  className={`w-5 h-5 mb-2 ${
                    currentPath !== '/settings'
                      ? 'text-default-200/70'
                      : 'text-white scale-125'
                  }`}
                />
                <span
                  className={classNames({
                    'text-sm text-default-200/70': true,
                    '!text-white scale-110': currentPath === '/settings',
                  })}
                >
                  Settings
                </span>
              </Link>
            )}
          </div>
        </div>
      </footer>
    </NextUIProvider>
  );
};

export default Main;
