import {
  Container,
  createTheme,
  NextUIProvider,
  Loading,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { signOutUser } from 'store/reducers/user.reducer';
import { useSnackbar } from 'notistack';
import { clearNotifications } from 'store/reducers/notifications.reducer';
import NavBar from './nav/navbar';
import { signOutAdminUser } from 'store/reducers/admin.reducer';
import { signOutUserProduct } from 'store/reducers/product.reducer';

const collapseItems = [
  {
    name: 'Shop',
    url: '/',
  },
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'Horus',
    url: '/',
  },
  {
    name: 'Contact',
    url: '/contact',
  },
  {
    name: 'Cart',
    url: '/cart',
  },
  {
    name: 'Account',
    url: '/account',
  },
];

const Layout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.user.darkMode);
  const isAuth = useSelector((state) => state.user.auth);
  const userInfo = useSelector((state) => state.user.userInfo);
  const cartItems = useSelector((state) => state.user.cart.cartItems);
  const { enqueueSnackbar } = useSnackbar();
  const notifications = useSelector((state) => state.notifications);
  const loading = useSelector((state) => state.user.loading);

  const theme = createTheme({
    type: darkMode ? 'dark' : 'light',
    theme: {
      colors: {
        textLight: '$white',
        text: '$white',
        link: '$blue500',
        linkLight: '$green',
        primaryLight: 'rgba(255,255,0,0.2)',
        primaryLightHover: 'rgba(255,255,0,0.5)',
        primaryLightActive: 'rgba(255,255,0,0.4)',
        primaryLightContrast: 'rgba(255,255,0,0.6)',
        primaryDark: '$white',
        primaryDarkHover: '$white',
        primaryDarkActive: '$white',
        primaryDarkContrast: '$white',
        primary: 'rgba(255,255,0,0.9)',
        primaryBorder: 'rgba(255,255,0,0.5)',
        primaryBorderHover: 'rgba(255,255,0,0.6)',
        primarySolidHover: 'rgba(255,255,0,0.7)',
        primarySolidContrast: '$white',
        primaryShadow: 'rgba(255,255,0,0.5)',
        secondaryLight: 'rgba(255,0,0,0.2)',
        secondaryLightHover: 'rgba(255,0,0,0.5)',
        secondaryLightActive: 'rgba(255,0,0,0.4)',
        secondaryLightContrast: 'rgba(255,0,0,0.6)',
        secondary: 'rgba(255,255,0,0.9)',
        secondaryBorder: 'rgba(255,0,0,0.5)',
        secondaryBorderHover: 'rgba(255,0,0,0.6)',
        secondarySolidHover: 'rgba(255,0,0,0.7)',
        secondarySolidContrast: '$white',
        secondaryShadow: 'rgba(255,0,0,0.5)',
        gradient:
          'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
        myColor: 'rgb(255, 0, 0, 1)',
        red: 'rgb(255, 0, 0, 1)',
        gold: 'rgba(255,255,0,0.9)',
        grey: 'rgb( 206, 209,212, 0.6)',
        error: 'rgb(255,0,0,0.9)',
      },
    },
  });

  useEffect(() => {
    if (notifications && notifications.global.error) {
      const msg = notifications.global.message
        ? notifications.global.message
        : 'Error';
      enqueueSnackbar(msg, {
        variant: 'error',
      });
      dispatch(clearNotifications());
    }
    if (notifications && notifications.global.success) {
      const msg = notifications.global.message
        ? notifications.global.message
        : 'Good!';
      enqueueSnackbar(msg, { variant: 'success' });
      dispatch(clearNotifications());
    }
  }, [dispatch, enqueueSnackbar, notifications]);

  const handleSelected = (value) => {
    switch (value) {
      case 'logout':
        dispatch(signOutUser());
        dispatch(signOutAdminUser());
        dispatch(signOutUserProduct());
        enqueueSnackbar('Logout successful', { variant: 'success' });
        router.push('/');
        return;
      case 'profile':
        router.push('/user/profile', undefined, { shallow: 'true' });
        return;
      case 'order-history':
        router.push(
          {
            pathname: '/user/order-history',
            query: { email: JSON.stringify(userInfo.email) },
          },
          '/user/order-history'
        );
        // router.push('/user/order-history', undefined, { shallow: 'true' });
        return;
      case 'shipping-address':
        router.push('/user/shipping-address', undefined, { shallow: 'true' });
        return;
      case 'admin':
        userInfo.isAdmin
          ? router.push('/admin/user/list', undefined, { shallow: 'true' })
          : router.push('/', undefined, { shallow: 'true' });
        return;
      case 'shop':
        router.push('/', undefined, { shallow: 'true' });
        return;
      case 'about':
        router.push('/about', undefined, { shallow: 'true' });
        return;
      case 'horus':
        router.push('/about', undefined, { shallow: 'true' });
        return;
      case 'contact':
        router.push('/contact', undefined, { shallow: 'true' });
        return;
      case 'cart':
        router.push('/cart', undefined, { shallow: 'true' });
        return;
      case 'login':
        router.push('/login', undefined, { shallow: 'true' });
        return;
      default:
        return '$green600';
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <NextUIProvider theme={theme}>
        <NavBar
          handleSelected={handleSelected}
          userInfo={userInfo}
          router={router}
          isAuth={isAuth}
          cartItems={cartItems}
          collapseItems={collapseItems}
        />
        <Container
          lg
          gap={1}
          as="main"
          display="flex"
          fluid
          responsive
          justify="center"
          alignItems="flex-start"
        >
          {children}
        </Container>
      </NextUIProvider>
    </>
  );
};

export default Layout;
