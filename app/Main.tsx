'use client';

import { Image, NextUIProvider } from '@nextui-org/react';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { createContext, useState } from 'react';
import {
  HiMiniChatBubbleBottomCenterText,
  HiMiniVideoCamera,
  HiShoppingBag,
  HiUserCircle,
} from 'react-icons/hi2';
import { VscSettings } from 'react-icons/vsc';
import dynamic from 'next/dynamic';

const Link = dynamic(() => import('next/link'), {
  ssr: false,
});

const NavBar = dynamic(() => import('./NavBar'), {
  ssr: false,
});

export const PageContext = createContext(false);

const Main = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    isMenuOpen: boolean;
  };
}) => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(params.isMenuOpen);
  params.isMenuOpen = isNavMenuOpen;

  return (
    <NextUIProvider>
      <PageContext.Provider value={isNavMenuOpen}>
        <NavBar
          setIsNavMenuOpen={setIsNavMenuOpen}
          isNavMenuOpen={isNavMenuOpen}
        />
        <main className="static md:h-[calc(100vh-4rem)] md:pb-0 h-[calc(100vh-7rem)] pb-4 overflow-y-auto">
          {children}
        </main>
      </PageContext.Provider>
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
                className={classNames({
                  'w-16 bottom-5': true,
                  'pointer-events-none': process.env.NODE_ENV === 'production',
                })}
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
