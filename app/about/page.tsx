'use client';

import { Button, Card, Divider, Image } from '@nextui-org/react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FaExternalLinkAlt, FaLaptopCode } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';
import { PiShoppingCartFill } from 'react-icons/pi';

const Link = dynamic(() => import('next/link'), {
  ssr: false,
});

const weAreImageList = [
  {
    source: '/images/kb.webp',
    alt: 'King Bites',
    width: 'w-48',
    href: 'https://king-bites.vercel.app/',
  },
  {
    source: '/images/sofos_logo.png',
    alt: 'Sofos',
    width: 'w-32',
    href: 'https://sofos-factory.vercel.app/',
  },
  {
    source: '/images/casey_lucas.webp',
    alt: 'Casey & Lucas',
    width: 'w-44',
    href: 'https://sofos-factory.vercel.app/',
  },
];

const weDoItemList = [
  {
    icon: <PiShoppingCartFill color={'#1de9a3'} size={75} />,
    image: '/images/clothes_web.webp',
    alt: 'Clothes',
    title: 'Wholesale and Retails Prices are available',
    description:
      'All SM Department Store display brands include HUMAN, MCBETH, TEE, and BENCH (Brand new mall pull outs, bodega sale, and direct from manufacturer, respectively)',
    color: '#1de9a3',
  },
  {
    icon: <MdFastfood color={'#ff0000'} size={75} />,
    image: '/images/food_web.webp',
    alt: 'Food',
    title: 'Frozen Food Official Distributor and Supplier',
    description:
      'Zingy Bites, KingBites and SnackOn are open for distributors, resellers, and retailers',
    color: '#ff0000',
  },
  {
    icon: <FaLaptopCode color={'#1a3d57'} size={75} />,
    image: '/images/tech_web.webp',
    alt: 'Tech',
    title: 'Web and Mobile Application Development',
    description:
      'We offer a variety of services, including Enterprise Application Development, Website Development, Mobile Application Development (for Android and iOS), Cloud Services, Custom Domains, SEO and much more!',
    color: '#1a3d57',
  },
];

const reviewList = [
  {
    image: '/images/shop_rating_1.webp',
    alt: 'Shop Rating 1',
  },
  {
    image: '/images/shop_rating_2.webp',
    alt: 'Shop Rating 2',
  },
  {
    image: '/images/shop_rating_3.webp',
    alt: 'Shop Rating 3',
  },
  {
    image: '/images/shop_rating_4.webp',
    alt: 'Shop Rating 4',
  },
  {
    image: '/images/shop_rating_5.webp',
    alt: 'Shop Rating 5',
  },
  {
    image: '/images/shop_rating_6.webp',
    alt: 'Shop Rating 6',
  },
  {
    image: '/images/shop_rating_7.webp',
    alt: 'Shop Rating 7',
  },
  {
    image: '/images/shop_rating_8.webp',
    alt: 'Shop Rating 8',
  },
];

const appList = [
  { image: '/images/android.webp', alt: 'Android' },
  { image: '/images/mac.webp', alt: 'Mac' },
  { image: '/images/ios.webp', alt: 'IOS' },
];

const AboutPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-1 place-items-center">
        <section>
          <div className="flex mt-2 p-10 object-contain lg:mt-5">
            <Image
              src="/images/smartbuys_wings.webp"
              className={classNames({
                'pointer-events-none': process.env.NODE_ENV === 'production',
              })}
            />
          </div>
        </section>
        <section className="md:mt-0 mt-5">
          <div className="flex-grow-0 basis-full max-w-sm md:max-w-screen-2xl">
            <p className="md:text-3xl text-xl text-[#1a3d57] transform-none font-normal text-center leading-tight tracking-widest">
              "Discover a world of smart shopping at SmartBuys Philippines.
              Experience the perfect blend of quality, affordability, and
              convenience as you explore our curated selection of premium
              products. Elevate your lifestyle with our wide range of offerings,
              ensuring a seamless online shopping experience for the discerning
              Filipino shopper."
            </p>
          </div>
        </section>
        <section className="flex w-screen justify-center mt-28 align-middle">
          <Link
            href={'/android/SmartBuysPhilippinesApk.apk'}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              className={classNames({
                'object-contain hover:scale-110 w-44': true,
                'pointer-events-none': process.env.NODE_ENV === 'production',
              })}
              radius="none"
              alt="SmartBuys Philippines"
              src="/images/GooglePlay.webp"
            />
          </Link>
        </section>
        <section className="flex flex-col mt-16 w-screen content-center items-center justify-center align-middle">
          <div className="mt-10 mb-5">
            <p className="text-[#1a3d57] md:text-6xl text-3xl transform-none font-normal text-center leading-tight tracking-widest">
              We Are
            </p>
          </div>
          <Divider className="my-4 bg-red-500 w-5/12 justify-center align-middle" />
          <div className="grid md:grid-cols-3 grid-cols-1 w-screen mt-10 place-items-center container ">
            {weAreImageList.map((weAreItem, index) => (
              <Link
                key={weAreItem.alt}
                className="md:py-0 py-16"
                href={weAreItem.href}
                rel={'noopener noreferrer'}
                target={'_blank'}
              >
                <Image
                  isZoomed
                  removeWrapper
                  fallbackSrc={'/images/smartbuys_logo.png'}
                  loading="lazy"
                  shadow="none"
                  radius="sm"
                  alt={weAreItem.alt}
                  className={`${
                    weAreItem.width
                  } h-full object-cover z-0 cursor-pointer ${
                    process.env.NODE_ENV === 'production'
                      ? 'pointer-events-none'
                      : ''
                  }`}
                  src={weAreItem.source}
                />
              </Link>
            ))}
          </div>
        </section>
        <section className="flex flex-col mt-16 w-screen content-center items-center justify-center align-middle">
          <div className="mt-10 mb-5">
            <p className="text-[#1a3d57] md:text-6xl text-3xl transform-none font-normal text-center leading-tight tracking-widest">
              Our Mission
            </p>
          </div>
          <Divider className="my-4 bg-red-500 w-5/12 justify-center align-middle" />
          <div className="basis-full max-w-sm md:max-w-screen-2xl mt-20">
            <p className="md:text-3xl text-xl text-[#1a3d57] transform-none font-normal text-center leading-tight tracking-widest">
              "At SmartBuys Philippines, our mission is to revolutionize the
              online shopping experience by providing our customers with a
              seamless platform to discover, explore, and purchase a wide range
              of high-quality products at the best prices. We strive to be the
              go-to destination for smart shoppers in the Philippines, offering
              an extensive selection of consumer electronics, fashion, home
              essentials, and more. With our commitment to exceptional customer
              service, secure transactions, and timely delivery, we aim to
              exceed expectations and delight our customers at every step of
              their shopping journey."
            </p>
          </div>
        </section>
        <section className="flex flex-col mt-16 w-screen content-center items-center justify-center align-middle">
          <div className="mt-10 mb-5">
            <p className="text-[#1a3d57] md:text-6xl text-3xl transform-none font-normal text-center leading-tight tracking-widest">
              Our Vision
            </p>
          </div>
          <Divider className="my-4 bg-red-500 w-5/12 justify-center align-middle" />
          <div className="basis-full max-w-sm md:max-w-screen-2xl mt-20">
            <p className="md:text-3xl text-xl text-[#1a3d57] transform-none font-normal text-center leading-tight tracking-widest">
              "Our vision at SmartBuys Philippines is to empower Filipinos with
              convenient access to a world of affordable and reliable products,
              enabling them to make informed purchasing decisions and elevate
              their lifestyles. We envision a future where every customer can
              find the perfect item, whether it's the latest gadget, stylish
              fashion piece, or essential home product, all in one place.
              Through continuous innovation, strategic partnerships, and a
              customer-centric approach, we aspire to be the trusted online
              shopping destination that brings joy and satisfaction to every
              Filipino shopper. Together, we are shaping the future of online
              retail in the Philippines."
            </p>
          </div>
        </section>
        <section className="flex flex-col mt-16 w-screen content-center items-center justify-center align-middle basis-28 ">
          <div className="mt-10 mb-5">
            <p className="text-[#1a3d57] md:text-6xl text-3xl transform-none font-normal text-center leading-tight tracking-widest">
              We Do
            </p>
          </div>
          <Divider className="my-4 bg-red-500 w-5/12 justify-center align-middle" />
          <div className="grid lg:grid-cols-3 grid-cols-1 justify-around w-auto h-auto mt-10 text-center container">
            {weDoItemList.map((item) => (
              <div
                key={item.description}
                className="flex flex-col h-auto place-items-center"
              >
                <div
                  className={classNames({
                    'flex place-items-center rounded-full border-2 border-solid w-36 h-36 justify-center ':
                      true,
                    'hover:scale-125 relative shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transform transition-transform-opacity ':
                      true,
                    'motion-reduce:transition-none !duration-300  object-cover z-0 cursor-pointer mb-10':
                      true,
                    'border-[#1de9a3]': item.alt === 'Clothes',
                    'border-[#ff0000]': item.alt === 'Food',
                    'border-[#1a3d57]': item.alt === 'Tech',
                  })}
                >
                  {item.icon}
                </div>
                <div className={`justify-center align-middle `}>
                  <Card
                    key={item.title}
                    shadow="lg"
                    disableRipple
                    radius="sm"
                    isHoverable
                    className="hover:scale-110"
                  >
                    <Image
                      fallbackSrc={'/images/smartbuys_logo.png'}
                      loading="lazy"
                      shadow="lg"
                      radius="sm"
                      alt={item.alt}
                      className={classNames({
                        'w-unit-6xl h-full object-contain z-0 cursor-pointer':
                          true,
                        'pointer-events-none':
                          process.env.NODE_ENV === 'production',
                      })}
                      src={item.image}
                    />
                  </Card>
                </div>
                <div className="justify-end align-baseline text-center px-20">
                  <p className="my-10 text-xl text-[#1a3d57] font-medium tracking-widest text-center">
                    {item.title}
                  </p>
                  <p className="my-10 text-md text-[#1a3d57] font-medium tracking-widest text-center">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col mt-16 w-screen place-items-center basis-28 h-full">
          <div className="mt-10 mb-5">
            <p className="text-[#1a3d57] md:text-6xl text-3xl transform-none font-normal text-center leading-tight tracking-widest">
              Reveiws
            </p>
          </div>
          <Divider className="my-4 bg-red-500 w-5/12 justify-center align-middle" />
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-20 px-20 justify-around w-auto h-auto my-10 text-center container">
            {reviewList.map((item) => (
              <Card
                key={item.alt}
                shadow="lg"
                disableRipple
                radius="sm"
                isHoverable
                className="hover:scale-110 justify-center align-middle w-auto border-2 border-solid border-[#ffd700]"
              >
                <Image
                  fallbackSrc={'/images/smartbuys_logo.png'}
                  loading="lazy"
                  shadow="lg"
                  radius="sm"
                  alt={item.alt}
                  className={classNames({
                    'object-contain z-0 cursor-pointer': true,
                    'pointer-events-none':
                      process.env.NODE_ENV === 'production',
                  })}
                  src={item.image}
                />
              </Card>
            ))}
          </div>
        </section>
        <section className="flex flex-col mt-16 w-screen place-items-center basis-28 h-full">
          <div className="mt-10 mb-5">
            <p className="text-[#1a3d57] md:text-6xl text-3xl transform-none font-normal text-center leading-tight tracking-widest">
              App Cost Calculator
            </p>
          </div>
          <Divider className="my-4 bg-red-500 w-7/12 justify-center align-middle" />
          <div className="grid grid-cols-1 my-5 text-center container">
            <div className="justify-center align-middle mb-10 text-xl my-5 text-[#1a3d57] font-medium tracking-widest text-center">
              <p className="pb-5">
                Thinking of building a website or an app for your brand of
                business?
              </p>
              <p className="py-2">
                Use our app cost calculator to find out how much it will cost to
                build an app and how long it will take to launch it.
              </p>
              <p className="pt-5">
                It is important to keep in mind that the technology you use to
                communicate with your customers will have a direct impact on
                their experience with your brand.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-20 px-20 justify-around w-auto h-auto mt-10 text-center container">
              {appList.map((item) => (
                <div
                  key={item.alt}
                  className="flex align-middle justify-center md:py-0 py-16"
                >
                  <Image
                    fallbackSrc={'/images/smartbuys_logo.png'}
                    loading="lazy"
                    shadow="none"
                    radius="sm"
                    alt={item.alt}
                    className={classNames({
                      'w-auto h-full object-contain z-0 cursor-pointer': true,
                      'pointer-events-none':
                        process.env.NODE_ENV === 'production',
                    })}
                    src={item.image}
                  />
                </div>
              ))}
            </div>
            <div className="justify-end align-bottom text-xl my-5 font-medium tracking-widest text-center mt-24">
              <Button
                as={Link}
                rel="noopener noreferrer"
                target="_blank"
                href="https://sofos-factory.vercel.app/"
                variant="solid"
                color="primary"
                disableRipple
                fullWidth
                size="lg"
                className="md:w-3/12 w-auto text-xl"
                radius="md"
                endContent={<FaExternalLinkAlt />}
              >
                Estimate My App
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
