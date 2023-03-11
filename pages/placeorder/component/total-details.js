import { Button, Card, Col, Grid, Row, Spacer, Text } from '@nextui-org/react';
import { moneyFormat } from 'utils/functions';

const TotalDetails = ({
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
  placeOrderHandler,
}) => {
  return (
    <Row>
      <Card
        css={{
          backgroundColor: '$backgroundAlpha',
          border: '1px solid red',
          marginTop: '.5rem',
          '@xs': {
            backgroundColor: '$backgroundAlpha',
            marginTop: '.5rem',
            marginRight: '.5rem',
          },
        }}
        isHoverable
        variant="bordered"
        borderWeight="normal"
      >
        <Grid.Container
          justify="center"
          align="flex-start"
          css={{
            marginTop: '3.5%',
            '@xs': {
              marginTop: '1%',
            },
          }}
        >
          <Grid lg={12} xs={0} md={12} xl={12} sm={12}>
            <Grid lg={8}>
              <Spacer />
              <Row
                justify="flex-start"
                align="flex-start"
                css={{ marginTop: '1.5%' }}
              >
                <Text h4 color="$gray600">
                  Shipping:
                </Text>
                <Spacer />
                <Text h4 color="Orange">
                  {moneyFormat(shippingPrice)}
                </Text>
                <Spacer />
                <Text h4 color="$gray600">
                  Tax:
                </Text>
                <Spacer />
                <Text h4 color="Orange">
                  {moneyFormat(taxPrice)}
                </Text>
                <Spacer />
                <Text h4 color="$gray600">
                  Order Total:
                </Text>
                <Spacer />
                <Text h4 color="Orange">
                  {moneyFormat(itemsPrice)}
                </Text>
              </Row>
            </Grid>
            <Grid lg={4}>
              <Row justify="space-around">
                <Text h2 color="$gray600">
                  Total Price:
                </Text>
                <Spacer />
                <Text h2 color="Orange" css={{ fontWeight: '$extrabold' }}>
                  {moneyFormat(totalPrice)}
                </Text>
              </Row>
            </Grid>
          </Grid>
          <Grid lg={0} xs={12} md={0} xl={0} sm={0}>
            <Spacer />
            <Col justify="center" align="center">
              <Row css={{ lineHeight: '0' }}>
                <Grid xs={12}>
                  <Text h5 color="$gray600">
                    Shipping:
                  </Text>
                </Grid>
                <Grid xs={3}>
                  <Text h5 color="Orange">
                    {moneyFormat(shippingPrice)}
                  </Text>
                </Grid>
              </Row>
              <Row css={{ lineHeight: '1' }}>
                <Grid xs={12}>
                  <Text h5 color="$gray600">
                    Tax:
                  </Text>
                </Grid>
                <Grid xs={3}>
                  <Text h5 color="Orange">
                    {moneyFormat(taxPrice)}
                  </Text>
                </Grid>
              </Row>
              <Row css={{ lineHeight: '.2' }}>
                <Grid xs={12}>
                  <Text h5 color="$gray600">
                    Order Total:
                  </Text>
                </Grid>
                <Grid xs={3}>
                  <Text h5 color="Orange">
                    {moneyFormat(itemsPrice)}
                  </Text>
                </Grid>
              </Row>
              <Row css={{ lineHeight: '1' }}>
                <Grid xs={12} css={{ fontWeight: '$extrabold' }}>
                  <Text h3 color="$gray600">
                    Total Price:
                  </Text>
                </Grid>
                <Grid xs={3}>
                  <Text h3 color="Orange" css={{ fontWeight: '$extrabold' }}>
                    {moneyFormat(totalPrice)}
                  </Text>
                </Grid>
              </Row>
            </Col>
          </Grid>
          <Grid
            xs={0}
            lg={12}
            md={12}
            sm={12}
            xl={12}
            justify="center"
            css={{
              marginBottom: '.5rem',
              '@xs': {
                marginBottom: '1rem',
              },
            }}
          >
            <Button
              size="xl"
              css={{ backgroundColor: 'red' }}
              onPress={placeOrderHandler}
            >
              Place Order
            </Button>
          </Grid>
          <Grid
            xs={12}
            lg={0}
            md={0}
            sm={0}
            xl={0}
            justify="center"
            css={{
              marginBottom: '.5rem',
            }}
          >
            <Button
              size="lg"
              css={{ backgroundColor: 'red' }}
              onPress={placeOrderHandler}
            >
              Place Order
            </Button>
          </Grid>
        </Grid.Container>
      </Card>
    </Row>
  );
};

export default TotalDetails;
