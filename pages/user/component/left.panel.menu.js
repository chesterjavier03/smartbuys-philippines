import { Button, Card, Grid, Spacer, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ViewListIcon from '@mui/icons-material/ViewList';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const LeftPanelMenu = () => {
  const router = useRouter();
  const menu = [
    {
      menuTab: 'Profile',
      url: '/user/profile',
      icon: (
        <AccountCircleIcon
          style={{
            color: router.pathname === '/user/profile' ? 'White' : 'Red',
            fontSize: '2rem',
          }}
        />
      ),
    },
    {
      menuTab: 'Shipping Address',
      url: '/user/shipping-address',
      icon: (
        <LocalShippingIcon
          style={{
            color:
              router.pathname === '/user/shipping-address' ? 'White' : 'Red',
            fontSize: '2rem',
          }}
        />
      ),
    },
    {
      menuTab: 'Order History',
      url: '/user/order-history',
      icon: (
        <ViewListIcon
          style={{
            color: router.pathname === '/user/order-history' ? 'White' : 'Red',
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
        marginTop: '1.2rem',
        '@xs': {
          marginTop: '1.2rem',
          marginBottom: '1.2rem',
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
              onPress={() =>
                router.push(item.url, undefined, { shallow: 'true' })
              }
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

export default LeftPanelMenu;
