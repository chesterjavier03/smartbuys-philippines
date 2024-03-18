'use client';

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import classNames from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useReducer } from 'react';
import {
  HiMiniChatBubbleBottomCenterText,
  HiMiniInformationCircle,
  HiMiniVideoCamera,
  HiShoppingBag,
  HiUserCircle,
} from 'react-icons/hi2';

const NavBar = () => {
  const { status, data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useReducer((current) => !current, false);
  const currentPath = usePathname();
  const router = useRouter();

  return (
    <Navbar
      maxWidth="full"
      className="bg-[#ff0000] text-white -mb-0 px-2"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand
        className={classNames({
          'md:justify-start md:align-middle justify-center align-middle cursor-pointer':
            true,
          'ml-12 md:ml-0': session,
        })}
        as={Link}
        href={'/'}
      >
        <Image
          className="object-contain hover:scale-110"
          radius="none"
          width={75}
          alt="SmartBuys Philippines"
          src="/images/smartbuys.webp"
          fetchPriority="high"
        />
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-2 text-white my-2 flex-row justify-center align-middle content-center"
        justify="end"
      >
        <NavbarItem
          as={Link}
          href={'/'}
          className={classNames({
            'hover:text-[#ff0000] hover:bg-[#fff300] h-8 flex cursor-pointer rounded-md p-unit-xs':
              true,
            'bg-[#fff300] text-[#ff0000]': currentPath === '/',
          })}
        >
          <div className="flex gap-2 place-items-center">
            <HiShoppingBag className="w-5 h-5" />
            <span>Shop</span>
          </div>
        </NavbarItem>
        <NavbarItem
          as={Link}
          href={'/live'}
          className={classNames({
            'hover:text-[#ff0000] hover:bg-[#fff300] h-8 flex cursor-pointer rounded-md p-unit-xs':
              true,
            'bg-[#fff300] text-[#ff0000]': currentPath === '/live',
          })}
        >
          <div className="flex gap-2 place-items-center">
            <HiMiniVideoCamera className="w-5 h-5" />
            <span>Live</span>
          </div>
        </NavbarItem>
        <NavbarItem
          as={Link}
          href={'/about'}
          className={classNames({
            'hover:text-[#ff0000] hover:bg-[#fff300] h-8 flex cursor-pointer rounded-md p-unit-xs':
              true,
            'bg-[#fff300] text-[#ff0000]': currentPath === '/about',
          })}
        >
          <div className="flex gap-2 place-items-center">
            <HiMiniInformationCircle className="w-5 h-5" />
            <span>About</span>
          </div>
        </NavbarItem>
        <NavbarItem
          as={Link}
          href={'/contact'}
          className={classNames({
            'hover:text-[#ff0000] hover:bg-[#fff300] h-8 flex cursor-pointer rounded-md p-unit-xs':
              true,
            'bg-[#fff300] text-[#ff0000]': currentPath === '/contact',
          })}
        >
          <div className="flex gap-2 place-items-center">
            <HiMiniChatBubbleBottomCenterText className="w-5 h-5" />
            <span>Contact</span>
          </div>
        </NavbarItem>
        {!session && (
          <NavbarItem
            as={Link}
            href={'/login'}
            className={classNames({
              'hover:text-[#ff0000] hover:bg-[#fff300] h-8 flex cursor-pointer rounded-md p-unit-xs':
                true,
              'bg-[#fff300] text-[#ff0000]': currentPath === '/login',
            })}
          >
            <div className="flex gap-2 place-items-center">
              <HiUserCircle className="w-5 h-5" />
              <span>Login</span>
            </div>
          </NavbarItem>
        )}
        {session && (
          <Dropdown
            type="menu"
            shadow="lg"
            radius="sm"
            closeOnSelect
            classNames={{
              base: 'before:bg-default-200/20',
              content:
                'py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black',
            }}
          >
            <DropdownTrigger>
              <Avatar
                src={session!.user!.image!}
                name={session!.user!.name!}
                fallback={<HiUserCircle className="w-9 h-9 text-[#1a3d57]" />}
                showFallback
                radius="full"
                icon={<HiUserCircle className=" text-[#1a3d57]" />}
                size="sm"
                classNames={{
                  base: 'bg-white',
                  icon: 'text-[#1a3d57]/80',
                }}
                className="cursor-pointer text-[#1a3d57]"
              />
            </DropdownTrigger>
            {session.user.role === 'super' && (
              <DropdownMenu
                variant="flat"
                color="primary"
                aria-label="Dropdown menu with description"
                className="bg-default-200/20"
                selectionMode="single"
              >
                <DropdownSection>
                  <DropdownItem
                    onClick={() => router.push('/settings')}
                    textValue={session.user.email ?? ''}
                  >
                    <div>{session!.user!.email}</div>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => router.push('/settings')}
                    textValue="Settings"
                  >
                    <div>Settings</div>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => router.push('/products')}
                    textValue="Products Manager"
                  >
                    <div>Products Manager</div>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => signOut({ callbackUrl: '/' })}
                    textValue="Log out"
                  >
                    Log out
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            )}
            {session.user.role !== 'super' && (
              <DropdownMenu
                variant="flat"
                color="primary"
                aria-label="Dropdown menu with description"
                className="bg-default-200/20"
                selectionMode="single"
              >
                <DropdownSection>
                  <DropdownItem
                    onClick={() => router.push('/')}
                    textValue={session.user.email ?? ''}
                  >
                    <div>{session!.user!.email}</div>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => signOut({ callbackUrl: '/' })}
                    textValue="Log out"
                  >
                    Log out
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            )}
          </Dropdown>
        )}
      </NavbarContent>
      {session && (
        <>
          <Dropdown
            type="menu"
            shadow="lg"
            radius="sm"
            closeOnSelect
            classNames={{
              base: 'before:bg-default-200/20',
              content:
                'py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black',
            }}
          >
            <DropdownTrigger>
              <Avatar
                src={session!.user!.image!}
                name={session!.user!.name!}
                fallback={<HiUserCircle className="w-9 h-9 text-[#1a3d57]" />}
                showFallback
                radius="full"
                icon={<HiUserCircle className=" text-[#1a3d57]" />}
                size="sm"
                classNames={{
                  base: 'bg-white',
                  icon: 'text-[#1a3d57]/80',
                }}
                className="cursor-pointer text-[#1a3d57] md:hidden flex"
              />
            </DropdownTrigger>
            <DropdownMenu
              variant="flat"
              color="primary"
              aria-label="Dropdown menu with description"
              className="bg-default-200/20"
              selectionMode="single"
            >
              <DropdownSection>
                <DropdownItem onClick={() => router.push('/settings')}>
                  <div>{session!.user!.email}</div>
                </DropdownItem>
                <DropdownItem onClick={() => router.push('/settings')}>
                  <div>Settings</div>
                </DropdownItem>
                <DropdownItem onClick={() => signOut({ callbackUrl: '/' })}>
                  Log out
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </>
      )}
    </Navbar>
  );
};

export default NavBar;
