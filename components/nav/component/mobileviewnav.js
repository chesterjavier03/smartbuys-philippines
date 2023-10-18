import {
  Avatar,
  Badge,
  Dropdown,
  Grid,
  Image,
  Link,
  Navbar,
  Text,
} from '@nextui-org/react';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/router';

const MobileViewNav = ({ isAuth, handleSelected, userInfo, cartItems }) => {
  const router = useRouter();
  return (
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
            <Dropdown.Trigger onPress={() => document.body?.scrollTo(0, 0)}>
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
                key="sofos"
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
                Sofos
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
                key="contact"
                css={{
                  color: 'white',
                  fontWeight: '$semibold',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    color: 'black',
                    backgroundColor: '#05ebb8',
                    fontWeight: '$normal',
                  },
                }}
              >
                <Link
                  shallow
                  href="https://firebasestorage.googleapis.com/v0/b/smartbuys-88b18.appspot.com/o/apk%2Fsmartbuys.apk?alt=media&token=7503dfcc-f37b-47f9-bea0-4634d48d310a"
                  target="_blank"
                >
                  <Image
                    src="/static/GooglePlay.webp"
                    alt="Google Play"
                    autoResize
                    objectFit="contain"
                    css={{
                      width: '40%',
                    }}
                    containerCss={{
                      width: '100%',
                    }}
                    onClick={() => console.log('here clicked')}
                  />
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                key="contact"
                css={{
                  color: 'white',
                  fontWeight: '$semibold',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    color: 'black',
                    backgroundColor: '#05ebb8',
                    fontWeight: '$normal',
                  },
                }}
              >
                <Image
                  autoResize
                  objectFit="fill"
                  src="/static/AppStore.webp"
                  alt="App Store"
                  css={{
                    width: '40%',
                  }}
                  containerCss={{
                    width: '100%',
                  }}
                  onClick={() => console.log('here clicked')}
                />
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
            <Dropdown.Trigger onPress={() => document.body?.scrollTo(0, 0)}>
              <Avatar
                text={userInfo?.name ? userInfo.name : ''}
                textColor="default"
                color="success"
                bordered
                zoomed
                as="button"
                size="md"
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
                key="sofos"
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
                Sofos
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
              {userInfo.isAdmin && (
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
              )}
              <Dropdown.Item
                key="contact"
                css={{
                  color: 'white',
                  fontWeight: '$semibold',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    color: 'black',
                    backgroundColor: '#05ebb8',
                    fontWeight: '$normal',
                  },
                }}
              >
                <Image
                  src="/static/GooglePlay.webp"
                  alt="Google Play"
                  autoResize
                  objectFit="contain"
                  css={{
                    width: '40%',
                  }}
                  containerCss={{
                    width: '100%',
                  }}
                  onClick={() => console.log('here clicked')}
                />
              </Dropdown.Item>
              <Dropdown.Item
                key="contact"
                css={{
                  color: 'white',
                  fontWeight: '$semibold',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    color: 'black',
                    backgroundColor: '#05ebb8',
                    fontWeight: '$normal',
                  },
                }}
              >
                <Image
                  autoResize
                  objectFit="fill"
                  src="/static/AppStore.webp"
                  alt="App Store"
                  css={{
                    width: '40%',
                  }}
                  containerCss={{
                    width: '100%',
                  }}
                  onClick={() => console.log('here clicked')}
                />
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
      <Link onPress={() => router.push('/cart', undefined, { shallow: true })}>
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
    </Navbar.Content>
  );
};

export default MobileViewNav;
