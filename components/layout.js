import {
  Container,
  createTheme,
  Navbar,
  NextUIProvider,
  Image,
  Spacer,
  Avatar,
  Text,
  Dropdown,
  Grid,
  Badge,
  Loading,
} from '@nextui-org/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Link from 'next/link';
import { signOutUser } from 'store/reducers/user.reducer';
import { Divider } from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { useSnackbar } from 'notistack';
import { clearNotifications } from 'store/reducers/notifications.reducer';
import MenuIcon from '@mui/icons-material/Menu';

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

const Layout = ({ title, description, children }) => {
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
        enqueueSnackbar('Logout successful', { variant: 'success' });
        router.push('/');
        return;
      case 'profile':
        router.push('/user/profile', undefined, { shallow: 'true' });
        return;
      case 'order-history':
        router.push('/user/order-history', undefined, { shallow: 'true' });
        return;
      case 'shipping-address':
        router.push('/user/shipping-address', undefined, { shallow: 'true' });
        return;
      case 'admin':
        router.push('/admin/dashboard', undefined, { shallow: 'true' });
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
      <Head>
        <title>
          {title ? `${title} - SmartBuys Philippines` : 'SmartBuys Philippines'}
        </title>
        {description && <meta name="description" content={description} />}
      </Head>
      <NextUIProvider theme={theme}>
        <Navbar
          isBordered={true}
          maxWidth="fluid"
          variant="floating"
          css={{ zIndex: 201 }}
        >
          {/* <Navbar.Toggle showIn="xs" aria-label="toggle navigation" css={{}} /> */}
          <Navbar.Brand
            css={{
              '@xs': {
                w: '12%',
              },
            }}
            href="/"
            as={Link}
            shallow
          >
            <Image
              priority
              src="/static/smartbuys.webp"
              alt="SmartBuys Philippines"
              width={80}
              height={80}
              autoResize
              showSkeleton
            />
          </Navbar.Brand>
          <Navbar.Content
            hideIn="xs"
            activeColor={'primary'}
            variant="highlight"
            maxWidth="fluid"
            enableCursorHighlight={true}
          >
            <Navbar.Link
              href="/"
              as={Link}
              shallow
              isActive={router.pathname === '/'}
            >
              Shop
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              shallow
              isActive={router.pathname === '/about'}
              href="/about"
            >
              About
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              shallow
              href={'https://horustech.ml/'}
              target="_blank"
            >
              Horus
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              shallow
              isActive={router.pathname === '/contact'}
              href="/contact"
            >
              Contact
            </Navbar.Link>
            {!isAuth && (
              <Navbar.Link
                as={Link}
                shallow
                isActive={
                  router.pathname === '/login' ||
                  router.pathname === '/register'
                }
                href="/login?redirect=/"
              >
                Login
              </Navbar.Link>
            )}
            {isAuth && (
              <Grid>
                <Dropdown placement="bottom-left" type="menu">
                  <Dropdown.Trigger>
                    <Avatar
                      text={userInfo?.name ? userInfo.name : ''}
                      textColor="default"
                      color="success"
                      bordered
                      zoomed
                      as="button"
                      size="md"
                      // icon={
                      //   <AccountCircleIcon
                      //     style={{ color: 'Red', fontSize: '2rem' }}
                      //   />
                      // }
                      name={userInfo.name}
                      css={{
                        $$nextUiA: {
                          backgroundColor: 'Orange',
                        },
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    />
                  </Dropdown.Trigger>
                  <Dropdown.Menu
                    color="primary"
                    aria-label="User Actions"
                    variant="solid"
                    isVirtualized="true"
                    containerCss={{
                      color: 'blue',
                      backgroundColor: 'white',
                    }}
                    onAction={handleSelected}
                  >
                    <Dropdown.Item
                      key="userinfo"
                      css={{
                        height: '$18',
                        backgroundColor: '$backgroundAlpha',
                      }}
                    >
                      <Text b css={{ d: 'flex', color: 'Grey' }}>
                        Signed in as
                      </Text>
                      <Text
                        b
                        color="error"
                        css={{
                          d: 'flex',
                          color: '$blue500',
                          fontFamily: 'Ubuntu',
                        }}
                      >
                        {userInfo.email}
                      </Text>
                    </Dropdown.Item>
                    <Dropdown.Item
                      withDivider
                      key="profile"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="shipping-address"
                      color="success"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    >
                      Shipping Address
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="order-history"
                      color="success"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    >
                      Order History
                    </Dropdown.Item>
                    <Dropdown.Item
                      color="success"
                      key="admin"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    >
                      Admin Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="logout"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                      withDivider
                      color="success"
                    >
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Grid>
            )}
            <Spacer x={0.5} />
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              style={{ borderColor: 'Gold' }}
            />
            <Spacer y={1} />
            <Link shallow href="/cart">
              <Badge
                color="success"
                content={cartItems.length}
                isInvisible={cartItems.length === 0}
              >
                <ShoppingCart
                  style={{
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: '1.5rem',
                    margin: '0 auto',
                  }}
                />
              </Badge>
            </Link>
            <Spacer x={1} />
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              style={{ borderColor: 'Gold' }}
            />
            <Spacer x={0.5} />
            <Image
              src="/static/GooglePlay.webp"
              alt="Google Play"
              width={100}
              height={100}
              objectFit="contain"
              css={{ cursor: 'pointer' }}
            />
            <Spacer x={0.5} />
            <Image
              src="/static/AppStore.webp"
              alt="Google Play"
              width={100}
              height={100}
              objectFit="contain"
              css={{ cursor: 'pointer' }}
            />
          </Navbar.Content>
          <Navbar.Content
            showIn="xs"
            css={{
              '@xs': {
                w: '12%',
                jc: 'flex-end',
              },
            }}
          >
            {!isAuth && (
              <Navbar.Item>
                <Dropdown placement="bottom-left" type="menu">
                  <Dropdown.Trigger>
                    <MenuIcon
                      style={{
                        width: '2rem',
                        height: '2rem',
                        fontWeight: 'lighter',
                        cursor: 'pointer',
                      }}
                    />
                  </Dropdown.Trigger>
                  <Dropdown.Menu
                    color="primary"
                    aria-label="User Actions"
                    variant="solid"
                    isVirtualized="true"
                    containerCss={{
                      color: 'blue',
                      backgroundColor: 'white',
                    }}
                    onAction={handleSelected}
                  >
                    <Dropdown.Item
                      key="shop"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    >
                      Shop
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="about"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    >
                      About
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="horus"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    >
                      Horus
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="contact"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    >
                      Contact
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="cart"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    >
                      Cart
                    </Dropdown.Item>
                    <Dropdown.Item
                      withDivider
                      key="login"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    >
                      Login
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Navbar.Item>
            )}
            {isAuth && (
              <Grid>
                <Dropdown placement="bottom-left" type="menu">
                  <Dropdown.Trigger>
                    <Avatar
                      text={userInfo?.name ? userInfo.name : ''}
                      textColor="default"
                      color="success"
                      bordered
                      zoomed
                      as="button"
                      size="md"
                      // icon={
                      //   <AccountCircleIcon
                      //     style={{ color: 'Red', fontSize: '2rem' }}
                      //   />
                      // }
                      name={userInfo.name}
                      css={{
                        $$nextUiA: {
                          backgroundColor: 'Orange',
                        },
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    />
                  </Dropdown.Trigger>
                  <Dropdown.Menu
                    color="primary"
                    aria-label="User Actions"
                    variant="solid"
                    isVirtualized="true"
                    containerCss={{
                      color: 'blue',
                      backgroundColor: 'white',
                    }}
                    onAction={handleSelected}
                  >
                    <Dropdown.Item
                      key="userinfo"
                      css={{
                        height: '$18',
                        backgroundColor: '$backgroundAlpha',
                      }}
                    >
                      <Text b css={{ d: 'flex', color: 'Grey' }}>
                        Signed in as
                      </Text>
                      <Text
                        b
                        color="error"
                        css={{
                          d: 'flex',
                          color: '$blue500',
                          fontFamily: 'Ubuntu',
                        }}
                      >
                        {userInfo.email}
                      </Text>
                    </Dropdown.Item>
                    <Dropdown.Item
                      withDivider
                      key="profile"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="shipping-address"
                      color="success"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    >
                      Shipping Address
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="order-history"
                      color="success"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    >
                      Order History
                    </Dropdown.Item>
                    <Dropdown.Item
                      color="success"
                      key="admin"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                    >
                      Admin Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="logout"
                      css={{
                        color: 'Gray',
                        fontWeight: '$semibold',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: 'White',
                          backgroundColor: 'Red',
                          fontWeight: '$normal',
                        },
                      }}
                      withDivider
                      color="success"
                    >
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Grid>
            )}
          </Navbar.Content>
          <Navbar.Collapse>
            {collapseItems.map((item) => (
              <Navbar.CollapseItem
                isActive={router.pathname === item.url ? true : false}
                onChange={router.pathname === item.url ? false : true}
                key={item.name}
              >
                <Link
                  color="inherit"
                  css={{
                    minWidth: '100%',
                  }}
                  href={item.url}
                >
                  {item.name}
                </Link>
              </Navbar.CollapseItem>
            ))}
          </Navbar.Collapse>
        </Navbar>
        <Container
          gap={2}
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
