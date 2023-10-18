import { Badge, Image, Navbar, Spacer } from '@nextui-org/react';
import Link from 'next/link';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { Divider } from '@mui/material';
import MobileViewNav from './component/mobileviewnav';
import LoggedInNav from './component/loggedinNav';

const CustomNav = ({
  handleSelected,
  userInfo,
  router,
  isAuth,
  cartItems,
  collapseItems,
}) => {
  return (
    <Navbar
      variant="floating"
      maxWidth="lg"
      isBordered={true}
      css={{
        zIndex: 999,
        cursor: 'pointer',
      }}
    >
      <Navbar.Brand href="/" as={Link} shallow>
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
          href={'https://sofos-factory.vercel.app/'}
          target="_blank"
        >
          Sofos
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
                fontSize: '2rem',
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
        <Link
          shallow
          href="https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/apk%2Fsmartbuys.apk?alt=media&token=7503dfcc-f37b-47f9-bea0-4634d48d310a"
          target="_blank"
        >
          <Image
            src="/static/GooglePlay.webp"
            alt="Google Play"
            width={100}
            height={100}
            objectFit="contain"
            css={{ cursor: 'pointer' }}
          />
        </Link>
        <Spacer x={0.5} />
        <Link
          shallow
          href="https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/apk%2Fsmartbuys.apk?alt=media&token=7503dfcc-f37b-47f9-bea0-4634d48d310a"
          target="_blank"
        >
          <Image
            src="/static/AppStore.webp"
            alt="Google Play"
            width={100}
            height={100}
            objectFit="contain"
            css={{ cursor: 'pointer' }}
          />
        </Link>
      </Navbar.Content>
      <MobileViewNav
        isAuth={isAuth}
        handleSelected={handleSelected}
        userInfo={userInfo}
        cartItems={cartItems}
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
              onClick={() => {
                document.body?.scrollTo(0, 0), [];
                router.push(item.url, undefined, { shallow: true });
              }}
            >
              {item.name}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNav;
