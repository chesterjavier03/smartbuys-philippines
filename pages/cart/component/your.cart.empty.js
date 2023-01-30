import { Box } from '@mui/system';
import { Card, Grid, Spacer, Text } from '@nextui-org/react';
import Link from 'next/link';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const YourCartEmpty = () => {
  return (
    <Card
      css={{
        width: '100vw',
        backgroundColor: 'rgb(255,255,255,.5)',
        border: '1px solid red',
        marginTop: '1.2rem',
        marginBottom: '1.2rem',
        '@xs': {
          marginTop: '1.2rem',
          marginRight: '.5rem',
          marginBottom: '1.2rem',
          width: '100vw',
        },
      }}
      isHoverable
      variant="bordered"
      borderWeight="normal"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100%"
      >
        <Grid justify="center">
          <RemoveShoppingCartIcon
            style={{
              display: 'flex',
              margin: '0 auto',
              fontSize: '9rem',
              color: 'red',
              '@xs': {
                fontSize: '8rem',
              },
            }}
          />
          <Spacer y={0.4} />
          <Text
            h1
            css={{
              textAlign: 'center',
              letterSpacing: '$widest',
              color: 'rgb(206, 209, 212, .9)',
              fontSize: '1.3rem',
              '@xs': {
                fontSize: '2rem',
              },
            }}
          >
            Your shopping cart is empty.
          </Text>
          <Spacer y={0.4} />
          <Text
            h1
            css={{
              color: 'DarkOrange',
              textAlign: 'center',
              letterSpacing: '$widest',
              fontSize: '2.5rem',
              '@xs': {
                fontSize: '3rem',
              },
            }}
          >
            <Link href="/">SHOP NOW!</Link>
          </Text>
          <Spacer y={0.4} />
          <Text
            h1
            color="error"
            css={{
              textAlign: 'center',
              letterSpacing: '$widest',
              color: 'rgb(206, 209, 212, .9)',
              fontSize: '1.3rem',
              '@xs': {
                fontSize: '2rem',
              },
            }}
          >
            Don&apos;t miss out on our daily sulit offers!
          </Text>
        </Grid>
      </Box>
    </Card>
  );
};

export default YourCartEmpty;
