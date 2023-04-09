import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HomeIcon from '@mui/icons-material/Home';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import bcrypt from 'bcryptjs';
import { Image } from '@nextui-org/react';

export const socialData = [
  {
    name: 'Shopee',
    image: '/static/social/shopee.webp',
    link: 'https://shp.ee/gwha2zv',
  },
  {
    name: 'Tiktok',
    image: '/static/social/tiktok.webp',
    link: 'https://www.tiktok.com/@smartbuysphilippines',
  },
  {
    name: 'Instagram',
    image: '/static/social/instagram.webp',
    link: 'https://www.instagram.com/smartbuysphilippines/',
  },
  {
    name: 'Facebook',
    image: '/static/social/efbee.webp',
    link: 'https://www.facebook.com/smartbuysphil',
  },
];

export const weDoProductList = [
  {
    name: 'clothes',
    description: 'SmartBuys Philippines Wholesale Clothes Supplier',
    width: '70%',
    height: '100%',
    color: 'lime',
    image: '/static/clothes_web.webp',
    contentTitle: 'Wholesale and Retails Prices are available',
    contentDetails:
      'All SM Department Store display brands include HUMAN, MCBETH, TEE, and BENCH (Brand new mall pull outs, bodega sale, and direct from manufacturer, respectively)',
    icon: (
      <ShoppingCartIcon
        style={{ color: 'Lime', fontSize: '4rem', marginTop: '1.8rem' }}
      />
    ),
  },
  {
    name: 'food',
    description: 'SmartBuys Philippines Frozen Food Products',
    width: '70%',
    height: '100%',
    color: 'red',
    image: '/static/food_web.webp',
    contentTitle: 'Frozen Food Official Distributor and Supplier',
    contentDetails:
      'Zingy Bites, KingBites and SnackOn are open for distributors, resellers, and retailers',
    icon: (
      <FastfoodIcon
        style={{ color: 'Red', fontSize: '4rem', marginTop: '1.7rem' }}
      />
    ),
  },
  {
    name: 'home',
    description: 'SmartBuys Philippines Home Essential Products',
    width: '70%',
    height: '100%',
    color: 'gold',
    image: '/static/home.webp',
    contentTitle: 'Home Essential Official Distributor',
    contentDetails:
      'SmartBuys Philippines is an official distributor of well-known local and international brands, available everyday, all year round! in addition to kitchenware, cookware, baking needs, home appliances, bedroom essentials, bathroom essentials, and more, we also offer a wide variety of other products!',
    icon: (
      <HomeIcon
        style={{
          color: 'Gold',
          fontSize: '4rem',
          marginTop: '1.7rem',
        }}
      />
    ),
  },
  {
    name: 'tech',
    description: 'SmartBuys Philippines Digital Content',
    width: '70%',
    height: '100%',
    color: 'blue',
    image: '/static/tech_web.webp',
    contentTitle: 'Web and Mobile Application Development',
    contentDetails:
      'We offer a variety of services, including Enterprise Application Development, Website Development, Mobile Application Development (for Android and iOS), Cloud Services, Custom Domains, SEO and much more!',
    icon: (
      <DeveloperModeIcon
        style={{
          color: 'Blue',
          fontSize: '4rem',
          marginTop: '1.7rem',
        }}
      />
    ),
  },
];

export const weAreProductList = [
  {
    name: 'foody',
    description: 'Foody',
    width: '70%',
    height: '100%',
    image: '/static/foody.webp',
  },
  {
    name: 'kingbites',
    description: 'KingBites ',
    width: '100%',
    height: '100%',
    image: '/static/kb.webp',
  },
  {
    name: 'horus',
    description: 'Horus Tech',
    width: '90%',
    height: '100%',
    image: '/static/horus_tech.webp',
  },
  {
    name: 'casey_lucas',
    description: 'Casey & Lucas',
    width: '90%',
    height: '100%',
    image: '/static/casey_lucas.webp',
  },
  {
    name: 'happy_app',
    description: 'Happy App',
    width: '45%',
    height: '100%',
    image: '/static/happy_app.webp',
  },
];

export const reviewList = [
  {
    name: 'shop_rating_1',
    image: '/static/shop_review/shop_rating_1.webp',
  },
  {
    name: 'shop_rating_2',
    image: '/static/shop_review/shop_rating_2.webp',
  },
  {
    name: 'shop_rating_3',
    image: '/static/shop_review/shop_rating_3.webp',
  },
  {
    name: 'shop_rating_4',
    image: '/static/shop_review/shop_rating_4.webp',
  },
  {
    name: 'shop_rating_5',
    image: '/static/shop_review/shop_rating_5.webp',
  },
  {
    name: 'shop_rating_6',
    image: '/static/shop_review/shop_rating_6.webp',
  },
  {
    name: 'shop_rating_7',
    image: '/static/shop_review/shop_rating_7.webp',
  },
  {
    name: 'shop_rating_8',
    image: '/static/shop_review/shop_rating_8.webp',
  },
];

export const userSeed = {
  users: [
    {
      name: 'SmartBuys Philippines',
      email: process.env.SUPER_ROOT_USERNAME,
      password: bcrypt.hashSync(process.env.SUPER_ROOT_PASSWORD || ''),
      isAdmin: true,
    },
    {
      name: 'SmartBuys Philippines Admin',
      email: process.env.SUPER_ADMIN_USERNAME,
      password: bcrypt.hashSync(process.env.SUPER_ADMIN_PASSWORD || ''),
      isAdmin: false,
    },
  ],
};

export const productSeed = {
  products: [
    {
      name: 'Disney Elsa Anna',
      price: 189,
      description: 'Disney Elsa Anna Frozen',
      image: '',
      category: 'Girls',
      type: 'Terno',
    },
  ],
};

export const appCostCalculator = [
  {
    image: (
      <Image
        showSkeleton
        src="/static/devices/android.webp"
        width="50%"
        height="100%"
        objectFit="contain"
        alt="SmartBuys Philippines Android App"
      />
    ),
  },
  {
    image: (
      <Image
        showSkeleton
        src="/static/devices/mac.webp"
        width="100%"
        height="100%"
        objectFit="contain"
        alt="SmartBuys Philippines Desktop App"
      />
    ),
  },
  {
    image: (
      <Image
        showSkeleton
        src="/static/devices/ios.webp"
        width="50%"
        height="100%"
        objectFit="contain"
        alt="SmartBuys Philippines iOS"
      />
    ),
  },
];

const ternoPrice = 210;
const joggerPrice = 250;
const dressPrice = 210;
const shortsPrice = 220;
const shirtPrice = 250;
const sandoPrice = 230;

export const productList = [
  {
    _id: 1,
    name: 'Disney Elsa Anna',
    description: 'Disney Elsa Anna Frozen',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD1.webp?alt=media&token=f85c7048-cdb9-47e8-a9b9-265eda5ea56e',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 2,
    name: 'Disney Believe',
    description: 'Disney Paw Patrol Believe',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD2.webp?alt=media&token=0c1eddbe-ba09-44f2-9900-cc05b63e43e8',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 3,
    name: 'Disney Happy',
    description: 'Disney Happy Together',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD3.webp?alt=media&token=19c53637-5a55-40e0-bf3a-2d968e65fa81',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 4,
    name: 'Disney Unicorn',
    description: 'Disney Minnie Unicorn Rainbow',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD4.webp?alt=media&token=b83f3099-43de-4b85-8ead-f291ead8a94a',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 5,
    name: 'Pony Unicorn',
    description: 'My Little Pony Unicorn',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD5.webp?alt=media&token=4ed434d4-a35f-48d8-bb4a-87e6f98fb1e2',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 6,
    name: 'Barbie Unicorn',
    description: 'Disney Princess Barbie Unicorn',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD7.webp?alt=media&token=d443ee93-3274-46e8-9f80-5ed27da64ebd',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 7,
    name: 'Barbie Heart',
    description: 'Barbie Heart',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD8.webp?alt=media&token=cf088189-5c6c-4449-9003-0a0e378b1ad0',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 8,
    name: 'Unicorn Magic',
    description: 'Disney Unicorn Magic',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD9.webp?alt=media&token=6bc4d76b-655b-419e-8793-3f369c49f589',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 9,
    name: 'Disney Belle',
    description: 'Disney Princess Belle',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD10.webp?alt=media&token=b8df504b-c17c-41a3-b84d-29f8266a97a3',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 10,
    name: 'Disney Minnie',
    description: 'Disney Minnie',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD11.webp?alt=media&token=48d7e664-f12a-460c-9a1a-6eff33fe49d7',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 11,
    name: 'Disney Little Mermaid',
    description: 'My Little Mermaid',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD12.webp?alt=media&token=d3f5241e-15f9-438c-8d40-08421ca6600e',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 12,
    name: 'Disney Minnie',
    description: 'Disney Minnie Mouse',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD13.webp?alt=media&token=ec438e4a-229b-4228-a037-e14352ef5181',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 13,
    name: 'Disney Minnie',
    description: 'Disney Minnie Mouse Two Hearts',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD14.webp?alt=media&token=596ab218-3136-4959-a096-06fd53709393',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 14,
    name: 'Disney Belle',
    description: 'Disney Belle So Magical',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD15.webp?alt=media&token=169cbea6-811a-4008-a3ab-404fb3987284',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 15,
    name: 'Disney Barbie',
    description: 'Disney Barbie Happiness',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD16.webp?alt=media&token=15fbfb1c-7fcc-49b6-9769-f1d9d56d7967',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 16,
    name: 'Hello Kittye',
    description: 'Helly Kitty Sanrio',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD17.webp?alt=media&token=154c3e00-9950-42ad-9f29-a9e8ae4433fb',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 17,
    name: 'Paw Patrol Sky',
    description: 'Paw Patrol Sky',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD19.webp?alt=media&token=a367cdcb-68e8-43da-ab7f-9a0493f2d098',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 18,
    name: 'Disney Minnie',
    description: 'Disney Minnie Mouse Pink',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD20.webp?alt=media&token=0a9728ea-5378-4636-97de-1a4097bc6da5',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 19,
    name: 'Disney Barbie',
    description: 'Disney Barbie Pink',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD21.webp?alt=media&token=974aa1cf-89c0-4fc2-bcfc-fa508d0a1b67',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 20,
    name: 'Disney Elsa',
    description: 'Disney Elsa Yellow',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD25.webp?alt=media&token=268de1b1-7ed5-4e45-a83b-b98f2bc0b018',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 21,
    name: 'Disney Elsa',
    description: 'Disney Elsa Frozen',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD26.webp?alt=media&token=0172179b-7553-4e1b-ada9-4247445087f2',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 22,
    name: 'My Little Pony',
    description: 'My Little Pony Friendships are Magical',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD27.webp?alt=media&token=81d137e0-519e-4bda-97f4-36db72c0d576',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 23,
    name: 'Paw Patrol Skye',
    description: 'Paw Patrol Sky High Flying Skye',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD28.webp?alt=media&token=7b54d11b-ea02-46be-a65d-27dd73c4226f',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 24,
    name: 'Paw Patrol Skye',
    description: 'Paw Patrol Sky Believe',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD29.webp?alt=media&token=b413b4c3-efc5-40a2-91c3-1347e912759a',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 25,
    name: 'Disney Minnie Mouse',
    description: 'Disney Minnie Mouse Unicorn',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD30.webp?alt=media&token=f61a4528-09f5-4b43-9f30-82fe1eb25651',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 26,
    name: 'Disney Minnie Mouse',
    description: 'Disney Minnie Mouse Red',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD31.webp?alt=media&token=b50c80b4-8023-4422-9230-f24e2a27c211',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 27,
    name: 'Disney Unicorn',
    description: 'Disney Unicorn You Are Magical',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD34.webp?alt=media&token=0c522cd9-755c-4cc2-b4ac-19f9a0f30da4',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 28,
    name: 'Disney Mickey Gang',
    description: 'Disney Mickey Gang Happy Together',
    price: ternoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/disney%2FD36.webp?alt=media&token=22774315-effe-4a77-bd88-d1d1e91943df',
    category: 'Girls',
    type: 'Terno',
  },
  {
    _id: 29,
    name: 'Hello Kitty Red',
    description: 'Hello Kitty Red',
    price: dressPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/dress%2FDS1.webp?alt=media&token=349b0d25-8a16-4983-8a58-33e007b6d92d',
    category: 'Girls',
    type: 'Dress',
  },
  {
    _id: 30,
    name: 'Disney Little Mermaid',
    description: 'Disney My Little Mermaid',
    price: dressPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/dress%2FDS2.webp?alt=media&token=cb85ee9a-aaf8-432e-b054-ef085da7a1ab',
    category: 'Girls',
    type: 'Dress',
  },
  {
    _id: 31,
    name: 'Disney Barbie',
    description: 'Disney Barbie Purple',
    price: dressPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/dress%2FDS3.webp?alt=media&token=db2a8e4d-3ee5-4b25-aa06-b53636e8837e',
    category: 'Girls',
    type: 'Dress',
  },
  {
    _id: 32,
    name: 'Disney Barbie',
    description: 'Disney Barbie Beauty',
    price: dressPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/dress%2FDS4.webp?alt=media&token=9f316606-5795-4128-9fe5-b4cec9a24c4d',
    category: 'Girls',
    type: 'Dress',
  },
  {
    _id: 33,
    name: 'My Little Pony',
    description: 'Disney My Little Pony',
    price: dressPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/dress%2FDS5.webp?alt=media&token=8a7b25e3-c2a7-4c53-b3cd-9be4722e5ee2',
    category: 'Girls',
    type: 'Dress',
  },
  {
    _id: 34,
    name: 'Disney Minnie Mouse',
    description: 'Disney Minnie Mouse Bow',
    price: dressPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/dress%2FDS6.webp?alt=media&token=6d6becf7-9aff-4a51-add7-6211b264dde6',
    category: 'Girls',
    type: 'Dress',
  },
  {
    _id: 35,
    name: 'LOL',
    description: 'LOL',
    price: dressPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/dress%2FDS7.webp?alt=media&token=dbecab6a-0ac7-4ce4-9207-bc2354ea5182',
    category: 'Girls',
    type: 'Dress',
  },
  {
    _id: 36,
    name: 'Disney My Little Pony',
    description: 'Disney My Little Pony Purple',
    price: dressPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/dress%2FDS8.webp?alt=media&token=f7669b90-1f1c-48eb-9152-edbecc13a68b',
    category: 'Girls',
    type: 'Dress',
  },
  {
    _id: 37,
    name: 'Disney Minnie Mouse',
    description: 'Disney Minnie Mouse Red',
    price: dressPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/dress%2FDS9.webp?alt=media&token=a7a1613e-ad25-4a1a-ae1f-25a6954500e4',
    category: 'Girls',
    type: 'Dress',
  },
  {
    _id: 38,
    name: 'Disney Minnie Mouse',
    description: 'Disney Minnie Mouse Blue Greem',
    price: dressPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/dress%2FDS11.webp?alt=media&token=1110683f-36c9-4f96-83ac-6a119e09c613',
    category: 'Girls',
    type: 'Dress',
  },
  {
    _id: 39,
    name: 'Jordan Sando',
    description: 'Jordan Rise Above All',
    price: sandoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ1.webp?alt=media&token=4592b0d5-12f5-4d5a-9ba5-63918dd1fb66',
    category: 'Boys',
    type: 'Sando',
  },
  {
    _id: 40,
    name: 'Jordan 23 Sando',
    description: 'Jordan 23 Sando Black',
    price: sandoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ2.webp?alt=media&token=482ca27d-8313-48a0-9fb2-d0b32bd1e693',
    category: 'Boys',
    type: 'Sando',
  },
  {
    _id: 41,
    name: 'Jordan Rise Above All',
    description: 'Jordan Rise Above All Yellow',
    price: sandoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ3.webp?alt=media&token=779c4f9c-d12c-4c99-af3d-64529d44a1f6',
    category: 'Boys',
    type: 'Sando',
  },
  {
    _id: 42,
    name: 'Micheal Jordan 23',
    description: 'Michael Jordan 23 Sando',
    price: sandoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ4.webp?alt=media&token=b905021f-8110-4788-8afd-fe422109150b',
    category: 'Boys',
    type: 'Sando',
  },
  {
    _id: 43,
    name: 'Jordan Flight',
    description: 'Jordan Flight Sando Black',
    price: sandoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ5.webp?alt=media&token=36e9e4a6-5c6f-48d1-8dd4-8881168fac6f',
    category: 'Boys',
    type: 'Sando',
  },
  {
    _id: 44,
    name: 'Jordan 23',
    description: 'Jordan 23 Yellow',
    price: sandoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ6.webp?alt=media&token=f4f31dd3-894e-451c-ac32-331d4aa62c71',
    category: 'Boys',
    type: 'Sando',
  },
  {
    _id: 45,
    name: 'Nike Check',
    description: 'Nike Check Comoflouge',
    price: sandoPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ7.webp?alt=media&token=a946b9f5-e5fb-4c38-a77d-82602102eb7b',
    category: 'Boys',
    type: 'Sando',
  },
  {
    _id: 46,
    name: 'Nike Athletic Department',
    description: 'Nike Athletic Department Blue Shirt',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ8.webp?alt=media&token=7b871fb3-cd50-493a-b377-4e74c57e8d21',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 47,
    name: 'Michael Jordan Blue',
    description: 'Michael Jordan Blue',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ9.webp?alt=media&token=dcc4e4ba-d1ea-4ebb-a4c4-6e0afc91cfc1',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 48,
    name: 'Jordan Hard Times',
    description: 'Jordan Hard Times Good Times',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ10.webp?alt=media&token=7fd614e1-4ad6-40de-8e25-886788b794de',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 49,
    name: 'Nike Check',
    description: 'Nike Check Blue',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ11.webp?alt=media&token=2f6cddfc-5e9d-4f3a-8a84-883a827da83d',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 50,
    name: 'Nike Check',
    description: 'Nike Check Black',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ12.webp?alt=media&token=2472acb3-7d7f-4951-8c90-97f266e9c7f6',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 51,
    name: 'Nike Legend',
    description: 'Nike The Legend Lives On',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ13.webp?alt=media&token=244c3648-2f41-4065-9e54-2cf650540235',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 52,
    name: 'Nike Bred Up',
    description: 'Nike Get Your Bred Up',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ14.webp?alt=media&token=ef7974f0-1956-4494-9d63-c5f0d7eb81ed',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 53,
    name: 'Nike Jordan',
    description: 'Nike Jordan',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ15.webp?alt=media&token=7032b449-ebd9-4327-9853-c65e8ae863b1',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 54,
    name: 'Nike Just Do It',
    description: 'Nike Just Do It',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ16.webp?alt=media&token=f8ad6b7b-6db6-4bd9-ad2b-ff6e38a22b60',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 55,
    name: 'Nike Just Do It',
    description: 'Nike Just Do It Check Orange',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ17.webp?alt=media&token=65e537a7-6d7b-451a-bd4a-3eb307f57337',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 56,
    name: 'Nike Air Jordan',
    description: 'Nike Air Jordan',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ19.webp?alt=media&token=f1492278-8c96-47b7-854d-15fdc289477a',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 57,
    name: 'Nike Air Jordan',
    description: 'Nike Air Michael Jordan',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ30.webp?alt=media&token=e7566af4-94df-414c-b4e7-3c35a5f7a8dd',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 58,
    name: 'Nike Air Jordan',
    description: 'Nike Air Michael Jordan Brand Of Flight',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ31.webp?alt=media&token=e273eea8-ef39-4bf3-aa7b-053b91e77894',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 59,
    name: 'Nike Check',
    description: 'Nike Check',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ36.webp?alt=media&token=5036f1f0-61f0-4d00-9e34-43c05da0e431',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 60,
    name: 'Nike Michael Jordan 23',
    description: 'Nike Michael Jordan 23',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ39.webp?alt=media&token=85d44c74-19ce-468b-941d-1600b5690b30',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 61,
    name: 'Nike One More Pair',
    description: 'Nike Just One More Pair',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ40.webp?alt=media&token=2ad80d73-eb78-4466-a1b9-a7d4eac112ac',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 62,
    name: 'Nike Rise',
    description: 'Nike Rise Above All',
    price: shirtPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jordan%2FJ41.webp?alt=media&token=6a17acb7-f243-41e1-a89c-2fb5b756d241',
    category: 'Boys',
    type: 'Shirt',
  },
  {
    _id: 63,
    name: 'Nike Jordan',
    description: 'Nike Jordan Shorts Yellow',
    price: shortsPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/shorts%2FS1.webp?alt=media&token=9cd74236-54e9-4e49-99eb-cb5582c9e8f2',
    category: 'Boys',
    type: 'Shorts',
  },
  {
    _id: 64,
    name: 'Nike Jordan',
    description: 'Nike Jordan Shorts Green',
    price: shortsPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/shorts%2FS2.webp?alt=media&token=d3070ea2-b8eb-4b27-a007-0a6e68842b65',
    category: 'Boys',
    type: 'Shorts',
  },
  {
    _id: 65,
    name: 'Just Do It',
    description: 'Just Do It Grey',
    price: shortsPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/shorts%2FS3.webp?alt=media&token=749ae52d-1461-415c-82cb-85aa992ed3a4',
    category: 'Boys',
    type: 'Shorts',
  },
  {
    _id: 66,
    name: 'Nike Shorts',
    description: 'Nike Shorts White',
    price: shortsPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/shorts%2FS4.webp?alt=media&token=75f3e29c-4280-4e0e-86b3-1c7cd09c2c5d',
    category: 'Boys',
    type: 'Shorts',
  },
  {
    _id: 67,
    name: 'Nike Shorts',
    description: 'Nike Shorts Orange',
    price: shortsPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/shorts%2FS5.webp?alt=media&token=31feefbf-936d-4ce5-88e8-7f5a1fb6dcfa',
    category: 'Boys',
    type: 'Shorts',
  },
  {
    _id: 68,
    name: 'Nike Jordan',
    description: 'Nike Jordan Blue',
    price: shortsPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/shorts%2FS6.webp?alt=media&token=90e32a03-c143-4ab1-879d-9e48df6bd4a1',
    category: 'Boys',
    type: 'Shorts',
  },
  {
    _id: 69,
    name: 'Nike Jump Man',
    description: 'Nike Jordan Jump Man Yellow',
    price: shortsPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/shorts%2FS7.webp?alt=media&token=c5630839-f091-4421-b006-5b457c56bbdb',
    category: 'Boys',
    type: 'Shorts',
  },
  {
    _id: 70,
    name: 'Nike Air Jordan',
    description: 'Nike Air Jordan Blue',
    price: shortsPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/shorts%2FS8.webp?alt=media&token=3bd98d94-8296-4457-a725-bcbe34f18264',
    category: 'Boys',
    type: 'Shorts',
  },
  {
    _id: 71,
    name: 'Nike Jordan',
    description: 'Nike Jordan Blue',
    price: shortsPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/shorts%2FS9.webp?alt=media&token=cab71361-68d2-4d53-8212-58e993ac1287',
    category: 'Boys',
    type: 'Shorts',
  },
  {
    _id: 72,
    name: 'Nike Jordan',
    description: 'Nike Jordan Black',
    price: shortsPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/shorts%2FS10.webp?alt=media&token=3d462a9a-6072-4188-9289-6ef6489fa1a1',
    category: 'Boys',
    type: 'Shorts',
  },
  {
    _id: 73,
    name: 'Jordan 23',
    description: 'Jordan 23 Yellow',
    price: shortsPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/shorts%2FS11.webp?alt=media&token=32bdacb7-259d-4005-b368-f71cfbd7ea90',
    category: 'Boys',
    type: 'Shorts',
  },
  {
    _id: 74,
    name: 'Jordan Jogger',
    description: 'Jordan Jogger Grey',
    price: joggerPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jogger%2FJG1.webp?alt=media&token=098d08be-2576-4182-8ece-d8ccf161be58',
    category: 'Boys',
    type: 'Jogger',
  },
  {
    _id: 75,
    name: 'Jordan Jogger',
    description: 'Jordan Jogger Yellow',
    price: joggerPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jogger%2FJG2.webp?alt=media&token=d98bb5c8-828d-4d12-8462-aa6c8910de8b',
    category: 'Boys',
    type: 'Jogger',
  },
  {
    _id: 76,
    name: 'Jordan Jogger',
    description: 'Jordan Jogger Black',
    price: joggerPrice,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/jogger%2FJG3.webp?alt=media&token=b828f77a-8783-43ea-ad3f-7a6a56ffa124',
    category: 'Boys',
    type: 'Jogger',
  },
  {
    _id: 77,
    name: 'Chicken Nuggets',
    description: 'Famous Original Chicken Nuggets',
    price: 180,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/food%2Fnuggets.webp?alt=media&token=c1bea4f2-b63f-4237-9315-2669d3201273',
    category: 'Food',
    type: 'Food',
  },
  {
    _id: 78,
    name: 'Potato Fries',
    description: 'Original Potato Fries',
    price: 110,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/food%2Ffries.webp?alt=media&token=15cc0466-ae40-4d62-a53e-b2777ad8d9fe',
    category: 'Food',
    type: 'Food',
  },
  {
    _id: 79,
    name: 'Famous Crispy Bacon',
    description: 'Famous Original Crispy Bacon',
    price: 210,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/food%2Fbacon.webp?alt=media&token=daa77442-6ab1-43c4-b9c3-d37932b37c91',
    category: 'Food',
    type: 'Food',
  },
  {
    _id: 80,
    name: 'Famous Siomai',
    description: 'Famous Authentic Siomai',
    price: 190,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/food%2Fsiomai.webp?alt=media&token=164cb7d9-6694-4507-887e-a4bf645cf326',
    category: 'Food',
    type: 'Food',
  },
  {
    _id: 81,
    name: 'Famous Longganisa',
    description: 'Famous Authentic Skinless Longganisa',
    price: 100,
    image:
      'https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/food%2Flongganisa.webp?alt=media&token=1e45d907-b28b-40f9-968a-84459729aeff',
    category: 'Food',
    type: 'Food',
  },
];
