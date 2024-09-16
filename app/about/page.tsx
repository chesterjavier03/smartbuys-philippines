'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';
import { Separator } from '@/components/ui/separator';
import AboutLoadingPage from './loading';
import { Button, buttonVariants } from '@/components/ui/button';
import { SquareArrowOutUpLeft, SquareArrowOutUpRight } from 'lucide-react';

const weAreImageList = [
  {
    source: '/images/SmartBuys_Tech.png',
    alt: 'SmartBuys Philippines | Crafting Digital Excellence',
    width: 128,
    href: 'https://smartbuysph.com/',
  },
  {
    source: '/images/kb.webp',
    alt: 'KingBites | Bite into Flavorful Delights Fit for Royalty!',
    width: 192,
    href: 'https://kingbites.vercel.app/',
  },
  {
    source: '/images/sofos_logo.png',
    alt: 'Sofos Factory | Crafting Quality Apps',
    width: 128,
    href: 'https://sofos-factory.vercel.app/',
  },
];

const appList = [
  { image: '/images/android.webp', alt: 'Android', width: 135 },
  { image: '/images/mac.webp', alt: 'Mac', width: 250 },
  { image: '/images/ios.webp', alt: 'IOS', width: 135 },
];

const About = () => {
  return (
    <div className="py-5 sm:px-0 px-3">
      <section className="flex flex-col items-center justify-center">
        <div className="h-auto w-auto sm:p-5 px-20">
          <Image
            src="/images/smartbuys_wings.webp"
            alt="SmartBuys Philippines"
            width={555}
            height={555}
            loading="eager"
            fetchPriority="high"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            className={`object-cover hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer ${
              process.env.NODE_ENV === 'production' ? 'pointer-events-none' : ''
            }`}
          />
        </div>
        <div className="mt-12">
          <p className="sm:text-2xl font-normal text-SBP_BLUE tracking-widest text-center leading-relaxed ">
            Discover a world of smart shopping at SmartBuys Philippines.
            Experience the perfect blend of quality, affordability, and
            convenience as you explore our curated selection of premium
            products. Elevate your lifestyle with our wide range of offerings,
            ensuring a seamless online shopping experience for the discerning
            Filipino shopper.
          </p>
        </div>
      </section>
      <section className="flex justify-center sm:mt-16 mt-12 align-middle">
        <Link
          href={
            'https://play.google.com/store/apps/details?id=com.chesterjavier03.smartbuysphilippines'
          }
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            className={clsx({
              ' object-cover hover:scale-110 transition-all duration-300 ease-in-out':
                true,
              'pointer-events-none': process.env.NODE_ENV === 'production',
            })}
            width={88}
            height={88}
            loading="eager"
            fetchPriority="high"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            alt="SmartBuys Philippines"
            src="/images/GooglePlay.webp"
          />
        </Link>
      </section>
      <section className="flex flex-col mt-16 items-center justify-center">
        <div className="mt-10 mb-5">
          <h1 className="text-SBP_BLUE md:text-3xl text-2xl transform-none font-medium text-center leading-tight tracking-widest">
            We Are
          </h1>
        </div>
        <Separator className="my-4 bg-SBP_RED w-1/2 justify-center align-middle" />
        <div className="grid grid-cols-3 mt-10 gap-5 place-items-center container ">
          {weAreImageList.map((weAreItem) => (
            <Link
              key={weAreItem.alt}
              href={weAreItem.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                src={weAreItem.source}
                alt={weAreItem.alt}
                width={weAreItem.width}
                height={100}
                loading="eager"
                fetchPriority="high"
                style={{ objectFit: 'cover' }}
                className={`object-cover ${
                  weAreItem.source === '/images/kb.webp'
                    ? `sm:w-52 w-40`
                    : `sm:w-28 w-20`
                } h-[100%] hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer ${
                  process.env.NODE_ENV === 'production'
                    ? 'pointer-events-none'
                    : ''
                }`}
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="flex flex-col mt-16 content-center items-center justify-center align-middle">
        <div className="mt-10 mb-5">
          <h1 className="text-SBP_BLUE md:text-3xl text-2xl font-medium transform-none text-center leading-tight tracking-widest">
            Our Mission
          </h1>
        </div>
        <Separator className="my-4 bg-SBP_RED w-1/2 justify-center align-middle" />
        <div className="mt-12">
          <p className="sm:text-2xl font-normal text-SBP_BLUE tracking-widest text-center leading-relaxed ">
            At SmartBuys Philippines, our mission is to revolutionize the online
            shopping experience by providing our customers with a seamless
            platform to discover, explore, and purchase a wide range of
            high-quality products at the best prices. We strive to be the go-to
            destination for smart shoppers in the Philippines, offering an
            extensive selection of consumer electronics, fashion, home
            essentials, and more. With our commitment to exceptional customer
            service, secure transactions, and timely delivery, we aim to exceed
            expectations and delight our customers at every step of their
            shopping journey.
          </p>
        </div>
      </section>
      <section className="flex flex-col mt-16 content-center items-center justify-center align-middle">
        <div className="mt-10 mb-5">
          <h1 className="text-SBP_BLUE md:text-3xl text-2xl transform-none font-medium text-center leading-tight tracking-widest">
            Our Vision
          </h1>
        </div>
        <Separator className="my-4 bg-SBP_RED w-1/2 justify-center align-middle" />
        <div className="mt-12">
          <p className="sm:text-2xl font-normal text-SBP_BLUE tracking-widest text-center leading-relaxed ">
            Our vision at SmartBuys Philippines is to empower Filipinos with
            convenient access to a world of affordable and reliable products,
            enabling them to make informed purchasing decisions and elevate
            their lifestyles. We envision a future where every customer can find
            the perfect item, whether it&apos;s the latest gadget, stylish
            fashion piece, or essential home product, all in one place. Through
            continuous innovation, strategic partnerships, and a
            customer-centric approach, we aspire to be the trusted online
            shopping destination that brings joy and satisfaction to every
            Filipino shopper. Together, we are shaping the future of online
            retail in the Philippines.
          </p>
        </div>
      </section>
      <section className="flex flex-col mt-16 content-center items-center justify-center align-middle">
        <div className="mt-10 mb-5">
          <h1 className="text-SBP_BLUE md:text-3xl text-2xl transform-none font-medium text-center leading-tight tracking-widest">
            Our Authenticity
          </h1>
        </div>
        <Separator className="my-4 bg-SBP_RED w-1/2 justify-center align-middle" />
        <div className="mt-12">
          <p className="sm:text-2xl font-normal text-SBP_BLUE tracking-widest text-center leading-relaxed ">
            At SmartBuys Philippines, we pride ourselves on our authenticity and
            commitment to compliance. As a registered entity with the Securities
            and Exchange Commission (SEC) in the Philippines, SmartBuys
            Philippines stands as a trusted name you can rely on. Our SEC
            registration ensures that we operate within the legal framework of
            the country, reflecting our dedication to transparency and
            integrity. Shop with confidence, knowing that SmartBuys Philippines
            is a genuine and fully registered enterprise in the Philippines.
          </p>
          <div className="flex justify-center h-full w-full sm:p-5 px-20 mt-12">
            <Image
              alt="SMARTBUYS PHILIPPINES ENTERPRISES OPC"
              width={100}
              height={100}
              loading="eager"
              fetchPriority="high"
              style={{ objectFit: 'cover' }}
              className={`
                sm:w-1/4 w-[75%] h-[100%] object-cover cursor-pointer hover:scale-110 duration-300 ease-in-out ${
                  process.env.NODE_ENV === 'production'
                    ? 'pointer-events-none'
                    : ''
                }`}
              src={'/images/SmartBuysPhilippines_OPC.png'}
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col mt-16 content-center items-center justify-center align-middle mb-20">
        <div className="mt-10 mb-5">
          <h1 className="text-SBP_BLUE md:text-3xl text-2xl transform-none font-medium text-center leading-tight tracking-widest">
            App Cost Calculator
          </h1>
        </div>
        <Separator className="my-4 bg-SBP_RED w-1/2 justify-center align-middle" />
        <div className="mt-12">
          <p className="sm:text-2xl font-normal text-SBP_BLUE tracking-widest text-center leading-relaxed pb-5">
            Thinking of building a website or an app for your brand of business?
          </p>
          <p className="sm:text-2xl font-normal text-SBP_BLUE tracking-widest text-center leading-relaxed py-2">
            Use our app cost calculator to find out how much it will cost to
            build an app and how long it will take to launch it.
          </p>
          <p className="sm:text-2xl font-normal text-SBP_BLUE tracking-widest text-center leading-relaxed pt-5">
            It is important to keep in mind that the technology you use to
            communicate with your customers will have a direct impact on their
            experience with your brand.
          </p>
          <div className="grid md:grid-cols-3 grid-cols-1 mt-10 place-items-center container ">
            {appList.map((appItem, index) => (
              <div className="p-5" key={appItem.alt}>
                <Image
                  alt={appItem.alt}
                  width={appItem.width}
                  height={100}
                  loading="eager"
                  fetchPriority="high"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  className={`w-auto h-full hover:scale-110 duration-300 ease-in-out cursor-pointer ${
                    process.env.NODE_ENV === 'production'
                      ? 'pointer-events-none'
                      : ''
                  }`}
                  src={appItem.image}
                />
              </div>
            ))}
          </div>
          <div className="justify-end align-bottom text-xl my-5 font-medium tracking-widest text-center mt-24">
            <Link
              className={clsx(
                buttonVariants({ variant: 'default', size: 'lg' }),
                'text-lg p-5 cursor-pointer'
              )}
              href="https://sofos-factory.vercel.app/"
              rel={'noopener noreferrer'}
              target={'_blank'}
            >
              Estimate My App
              <SquareArrowOutUpRight size={20} className="ml-2 font-bold" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
