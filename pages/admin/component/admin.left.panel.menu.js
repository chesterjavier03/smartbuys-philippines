import { Button, Card, Grid, Spacer, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useSelector } from 'react-redux';

const AdminLeftPanelMenu = () => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);
  const menu = [
    {
      menuTab: 'User List',
      url: '/admin/user/list',
      icon: (
        <GroupsIcon
          style={{
            color: router.pathname === '/admin/user/list' ? 'White' : 'Red',
            fontSize: '2rem',
          }}
        />
      ),
    },
    {
      menuTab: 'Product List',
      url: '/admin/product/list',
      icon: (
        <InventoryIcon
          style={{
            color: router.pathname === '/admin/product/list' ? 'White' : 'Red',
            fontSize: '2rem',
          }}
        />
      ),
    },
    {
      menuTab: 'Order History',
      url: '/admin/order-history',
      icon: (
        <ViewListIcon
          style={{
            color: router.pathname === 'admin/order-history' ? 'White' : 'Red',
            fontSize: '2rem',
          }}
        />
      ),
    },
  ];
  useEffect(() => {}, []);
  return (
    <Grid.Container
      align="flex-start"
      justify="flex-start"
      alignContent="flex-start"
      css={{
        marginTop: '.5rem',
        '@xs': {
          marginTop: '.5rem',
          marginBottom: '.2rem',
        },
      }}
    >
      <Card
        css={{
          backgroundColor: '$backgroundAlpha',
          border: '1px solid red',
        }}
        isHoverable
        variant="shadow"
        borderWeight="bold"
      >
        <Spacer y={1} />
        {menu?.map((item) => (
          <>
            <Spacer y={0.1} />
            <Button
              size="xl"
              icon={item.icon}
              justify="center"
              align="center"
              iconLeftCss={{
                margin: '0 auto',
              }}
              onPress={() => {
                userInfo.isAdmin
                  ? router.push(item.url, undefined, { shallow: 'true' })
                  : router.push('/', undefined, { shallow: 'true' });
              }}
              css={{
                backgroundColor:
                  router.pathname === item.url ? 'Red' : 'transparent',
                height: 'auto',
                margin: '$5',
                paddingLeft: '$18',
                justifyContent: 'flex-start',
                '&:hover': {
                  backgroundColor:
                    router.pathname === item.url ? '' : '$gray200',
                },
              }}
            >
              <Text
                h3
                color="$gray700"
                css={{
                  color:
                    router.pathname === item.url ? 'WhiteSmoke' : '$gray700',
                  margin: '0 auto',
                }}
              >
                {item.menuTab}
              </Text>
            </Button>
            <Spacer y={0.1} />
          </>
        ))}
        <Spacer y={1} />
      </Card>
    </Grid.Container>
  );
};

export default AdminLeftPanelMenu;
