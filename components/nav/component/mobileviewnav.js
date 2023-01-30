import { Avatar, Dropdown, Grid, Navbar, Text } from '@nextui-org/react';
import MenuIcon from '@mui/icons-material/Menu';

const MobileViewNav = ({ isAuth, handleSelected, userInfo }) => {
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
  );
};

export default MobileViewNav;
