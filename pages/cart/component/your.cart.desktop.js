import { Button, Card, Grid, Row, Spacer, Text } from '@nextui-org/react';

const YourCartDesktop = ({ cartItems, _calculateTotalItems, router }) => {
  return (
    <Grid.Container
      gap={1}
      align="flex-start"
      justify="flex-start"
      alignContent="flex-start"
      css={{
        marginTop: '11px',
        '@xs': {
          marginTop: '',
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
        <Text h2 color="Gray" justify="center" align="center">
          Your Cart
        </Text>
        <Row>
          <Text
            h3
            css={{
              color: '$gray700',
              paddingLeft: '1rem',
              paddingTop: '1rem',
            }}
          >
            Total Items Count:
          </Text>
          <Text
            h3
            justify="center"
            css={{
              color: '$gray700',
              paddingLeft: '1rem',
              paddingTop: '1rem',
              textAlign: 'center',
              justifyContent: 'flex-end',
            }}
          >
            {_calculateTotalItems(cartItems)}
          </Text>
        </Row>
        <Row>
          <Text
            h3
            css={{
              color: '$gray700',
              paddingLeft: '1rem',
              paddingTop: '1rem',
            }}
          >
            Total Items Price:
          </Text>
          <Text
            h3
            justify="center"
            css={{
              color: 'Orange',
              paddingLeft: '1rem',
              paddingTop: '1rem',
              textAlign: 'center',
              justifyContent: 'flex-end',
            }}
          >
            ₱
            {cartItems
              .reduce((a, v) => (a = a + v.subTotal), 0)
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
          </Text>
        </Row>
        <Spacer y={1} />
        <Row justify="center" css={{ margin: '0 auto' }}>
          <Button
            size="lg"
            css={{ backgroundColor: 'Orange' }}
            onPress={() =>
              router.push('/shipping', undefined, { shallow: 'true' })
            }
          >
            Checkout
          </Button>
        </Row>
        <Spacer y={1} />
      </Card>
    </Grid.Container>
  );
};

export default YourCartDesktop;
