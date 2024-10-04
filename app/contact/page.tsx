'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AtSign, Headset, MapIcon, MapPin, MapPinned } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from './contact-form';

const followUsImageList = [
  {
    source: '/images/shopee.webp',
    alt: 'Shopee - SmartBuys Philippines',
    width: 65,
    href: 'https://shp.ee/gwha2zv',
  },
  {
    source: '/images/tiktok.webp',
    alt: 'Tiktok - SmartBuys Philippines',
    width: 65,
    href: 'https://www.tiktok.com/@smartbuysphilippines',
  },
  {
    source: '/images/youtube.webp',
    alt: 'YouTube - SmartBuys Philippines',
    width: 108,
    href: 'https://www.youtube.com/@smartbuysphilippines',
  },
  {
    source: '/images/instagram.webp',
    alt: 'Instagram - SmartBuys Philippines',
    width: 65,
    href: 'https://www.instagram.com/smartbuysphilippines/',
  },
  {
    source: '/images/efbee.webp',
    alt: 'Facebook - SmartBuys Philippines',
    width: 65,
    href: 'https://www.facebook.com/smartbuysphil',
  },
];

const contactList = [
  {
    alt: 'Email',
    icon: <AtSign className="w-36 h-36" color="#1de9a3" />,
    info: (
      <p className="py-3 text-2xl text-[#1a3d57] font-medium tracking-widest text-center">
        smartbuys@duck.com
      </p>
    ),
  },
  {
    alt: 'Call',
    icon: <Headset className="w-36 h-36" color="#ff0000" />,
    info: (
      <p className="py-2 text-2xl text-[#1a3d57] font-medium tracking-widest text-center">
        09953005644 <br />
        09497309994
      </p>
    ),
  },
  {
    alt: 'Location',
    icon: <MapPinned className="w-36 h-36" color="#1a3d57" />,
    info: (
      <p className="py-3 text-2xl text-[#1a3d57] font-medium tracking-widest text-center">
        Las Pinas City, PHILIPPINES
      </p>
    ),
  },
];

const Contact = () => {
  return (
    <div>
      <section className="mt-8 flex-col items-center flex">
        <div className="mt-10 mb-5">
          <h1 className="text-SBP_BLUE md:text-3xl text-2xl font-medium transform-none text-center leading-tight tracking-widest">
            Follow Us
          </h1>
        </div>
        <Separator className="my-4 bg-SBP_RED w-1/2 justify-center align-middle" />
        <div className="grid grid-cols-5 sm:mt-10 gap-5 place-items-center container ">
          {followUsImageList.map((social) => (
            <Link
              key={social.alt}
              href={social.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                src={social.source}
                alt={social.alt}
                width={social.width}
                height={100}
                loading="eager"
                fetchPriority="high"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                className={`object-cover hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer ${
                  process.env.NODE_ENV === 'production'
                    ? 'pointer-events-none'
                    : ''
                }`}
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="w-full py-28 px-5 sm:px-0">
        <Card className="border-2 border-solid border-[#ff0000] shadow-2xl">
          <iframe
            className="gmap_iframe w-full aspect-auto rounded-lg pointer-events-none"
            width="100%"
            height={631}
            title="SmartBuys Philippines"
            loading="lazy"
            src="https://maps.google.com/maps?width=2000&amp;height=631&amp;hl=en&amp;q=smartbuys Philippines&amp;t=&amp;z=19&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          />
        </Card>
      </section>
      <section className="w-full pb-20 px-5 sm:px-0">
        <div className="grid md:grid-cols-3 grid-cols-1 mt-5 gap-2 place-items-center justify-center items-start">
          {contactList.map((contact) => (
            <div
              key={contact.alt}
              className="items-center justify-center flex flex-col gap-y-5"
            >
              {contact.icon}
              {contact.info}
            </div>
          ))}
        </div>
      </section>
      <section className="pb-28 px-5 sm:px-0 flex-col items-center flex">
        <div className="mt-10 mb-5">
          <h1 className="text-SBP_BLUE md:text-3xl text-2xl font-medium transform-none text-center leading-tight tracking-widest">
            Contact Us
          </h1>
        </div>
        <Separator className="my-4 bg-SBP_RED w-1/2 justify-center align-middle" />
        <div className="flex container px-5 items-center justify-center">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default Contact;
