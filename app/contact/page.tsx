import {
  Button,
  Card,
  Divider,
  Image,
  Input,
  Spinner,
  Textarea,
} from '@nextui-org/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { HiMiniChatBubbleBottomCenterText } from 'react-icons/hi2';
import { RiMapPinFill } from 'react-icons/ri';
import Link from 'next/link';
// import dynamic from 'next/dynamic';
import ContactForm from './_components/ContactForm';

// const ContactForm = dynamic(() => import('./_components/ContactForm'), {
//   ssr: false,
//   // loading: () => <IssueFormSkeleton />,
// });

const followUsImageList = [
  {
    source: '/images/shopee.webp',
    alt: 'Shopee - SmartBuys Philippines',
    width: 'w-36',
    href: 'https://shp.ee/gwha2zv',
  },
  {
    source: '/images/tiktok.webp',
    alt: 'Tiktok - SmartBuys Philippines',
    width: 'w-36',
    href: 'https://www.tiktok.com/@smartbuysphilippines',
  },
  {
    source: '/images/instagram.webp',
    alt: 'Instagram - SmartBuys Philippines',
    width: 'w-36',
    href: 'https://www.instagram.com/smartbuysphilippines/',
  },
  {
    source: '/images/efbee.webp',
    alt: 'Facebook - SmartBuys Philippines',
    width: 'w-36',
    href: 'https://www.facebook.com/smartbuysphil',
  },
];

const weAreImageList = [
  {
    alt: 'Email',
    icon: <MdEmail className="w-36 h-36" color="#1de9a3" />,
    info: (
      <p className="text-2xl text-[#1a3d57] font-medium tracking-widest text-center">
        smartbuys@duck.com
      </p>
    ),
  },
  {
    alt: 'Call',
    icon: (
      <HiMiniChatBubbleBottomCenterText className="w-36 h-36" color="#ff0000" />
    ),
    info: (
      <>
        <p className=" text-2xl text-[#1a3d57] font-medium tracking-widest text-center">
          09953005644
        </p>
        <p className=" text-2xl text-[#1a3d57] font-medium tracking-widest text-center">
          09497309994
        </p>
      </>
    ),
  },
  {
    alt: 'Location',
    icon: <RiMapPinFill className="w-36 h-36" color="#1a3d57" />,
    info: (
      <p className="text-2xl text-[#1a3d57] font-medium tracking-widest text-center">
        Las Pinas City, PHILIPPINES
      </p>
    ),
  },
];

const ContactPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 place-items-center">
        <section className="flex flex-col mt-10 w-screen content-center items-center justify-center align-middle">
          <div className="mt-10 mb-5">
            <p className="text-[#1a3d57] md:text-6xl text-4xl transform-none font-normal text-center leading-tight tracking-widest">
              Follow Us
            </p>
          </div>
          <Divider className="my-4 bg-red-500 md:w-5/12 w-9/12 justify-center align-middle" />
          <div className="grid md:grid-cols-4 grid-cols-1 w-screen mt-10 place-items-center container ">
            {followUsImageList.map((socialLink) => (
              <Link
                key={socialLink.alt}
                href={socialLink.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div key={socialLink.alt} className="md:py-0 py-16">
                  <Image
                    isZoomed
                    removeWrapper
                    fallbackSrc={'/images/smartbuys_logo.png'}
                    loading="lazy"
                    shadow="none"
                    radius="sm"
                    alt={socialLink.alt}
                    className={`${
                      socialLink.width
                    } h-36 object-cover z-0 cursor-pointer ${
                      process.env.NODE_ENV === 'production'
                        ? 'pointer-events-none'
                        : ''
                    }`}
                    src={socialLink.source}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="container ">
          <div className="md:py-36 md:px-10 py-24 px-5">
            <Card
              radius="lg"
              shadow="lg"
              className="border-2 border-solid border-[#ff0000]"
              isHoverable
              fullWidth
              disableRipple
            >
              <iframe
                className="gmap_iframe w-full aspect-auto rounded-lg pointer-events-none"
                width="100%"
                height={631}
                title="SmartBuys Philippines"
                loading="lazy"
                src="https://maps.google.com/maps?width=2000&amp;height=631&amp;hl=en&amp;q=smartbuys Philippines&amp;t=&amp;z=19&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              />
            </Card>
          </div>
        </section>
        <section>
          <div className="grid lg:grid-cols-3 grid-cols-1 w-screen place-items-center container">
            {weAreImageList.map((contact) => (
              <div
                key={contact.alt}
                className="flex flex-col place-items-center justify-start gap-10 h-[calc(33vh)] lg:h-full my-10"
              >
                <div
                  className={classNames({
                    'place-items-top rounded-full justify-top': true,
                    'hover:scale-125 relative shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transform transition-transform-opacity ':
                      true,
                    'motion-reduce:transition-none !duration-300 object-cover z-0 cursor-pointer':
                      true,
                  })}
                >
                  {contact.icon}
                </div>
                <div className="justify-center align-middle mb-10">
                  {contact.info}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <div className="grid grid-cols-1 w-screen place-items-center mb-16">
            <div className="mt-10 mb-5">
              <p className="text-[#1a3d57] md:text-6xl text-4xl transform-none font-normal text-center leading-tight tracking-widest">
                Contact Us
              </p>
            </div>
            <Divider className="my-2 bg-red-500 md:w-5/12 w-9/12 justify-center align-middle" />
            <div className="flex flex-col md:w-8/12 w-full md:px-0 px-5 md:py-0 py-10 mt-10">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
