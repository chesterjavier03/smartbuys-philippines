import { Avatar, Dropdown, Grid, Text } from '@nextui-org/react';

const LoggedInNav = ({ userInfo, handleSelected }) => {
  return (
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
  );
};

export default LoggedInNav;
