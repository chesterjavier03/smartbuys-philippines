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
    url: '',
  },
  {
    name: 'kingbites',
    description: 'KingBites ',
    width: '100%',
    height: '100%',
    image: '/static/kb.webp',
    url: 'https://king-bites.vercel.app/',
  },
  {
    name: 'horus',
    description: 'Horus Tech',
    width: '90%',
    height: '100%',
    image: '/static/horus_tech.webp',
    url: 'https://horustech.ml/#/',
  },
  {
    name: 'casey_lucas',
    description: 'Casey & Lucas',
    width: '90%',
    height: '100%',
    image: '/static/casey_lucas.webp',
    url: '',
  },
  {
    name: 'happy_app',
    description: 'Happy App',
    width: '45%',
    height: '100%',
    image: '/static/happy_app.webp',
    url: '',
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
