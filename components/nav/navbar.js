import { Badge, Image, Navbar, Spacer } from '@nextui-org/react';
import Link from 'next/link';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { Divider } from '@mui/material';
import LoggedInNav from './component/loggedinNav';
import MobileViewNav from './component/mobileviewnav';

const NavBar = ({
  handleSelected,
  userInfo,
  router,
  isAuth,
  cartItems,
  collapseItems,
}) => {
  return (
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
              router.pathname === '/login' || router.pathname === '/register'
            }
            href="/login?redirect=/"
          >
            Login
          </Navbar.Link>
        )}
        {isAuth && (
          <LoggedInNav userInfo={userInfo} handleSelected={handleSelected} />
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
      <MobileViewNav
        isAuth={isAuth}
        handleSelected={handleSelected}
        userInfo={userInfo}
      />
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
  );
};

export default NavBar;
