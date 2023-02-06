import { Button, Card, Col, Grid, Row, Spacer, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { moneyFormat, toJson } from 'utils/functions';
import Order from 'models/order';
import { Box } from '@mui/material';
import Image from 'next/image';

const OrderData = ({ order }) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    console.log('here ', order);
  }, []);

  return (
    <>
      <Row>
        <Card
          css={{
            backgroundColor: '$backgroundAlpha',
            border: '1px solid red',
            marginTop: '1.2rem',
            // height: '80vh',
            '@xs': {
              backgroundColor: '$backgroundAlpha',
              marginTop: '1.2rem',
              marginRight: '.5rem',
              // height: '87vh',
            },
          }}
          isHoverable
          variant="bordered"
          borderWeight="normal"
        >
          <Grid justify="center">
            <Grid lg={12} xs={12}>
              <Row align="center" justify="center">
                <Text h1 color="Red">
                  Thank you for your purchase!
                </Text>
              </Row>
            </Grid>
            <Grid.Container gap={1} justify={'flex-start'}>
              <Grid lg={12} xs={12}>
                <Card
                  isHoverable
                  css={{
                    backgroundColor: 'transparent',
                  }}
                >
                  <Row align="center" justify="flex-start">
                    <Spacer x={1} />
                    <Grid lg={3} xs={12}>
                      <Text h2 color="gray">
                        Shipping Address
                      </Text>
                    </Grid>
                    <Grid lg={5} xs={12}>
                      <Text h4 color="$gray600">
                        {order.shippingAddress?.fullName},{' '}
                        {order.shippingAddress?.address},{' '}
                        {order.shippingAddress?.city},{' '}
                        {order.shippingAddress?.postalCode},{' '}
                        {order.shippingAddress?.country}
                      </Text>
                    </Grid>
                  </Row>
                  <Row align="center" justify="flex-start">
                    <Spacer x={1} />
                    <Grid lg={3} xs={12}>
                      <Text h2 color="gray">
                        Payment Method
                      </Text>
                    </Grid>
                    <Grid lg={2} xs={12}>
                      <Text h3 color="Blue">
                        {order.paymentMethod === 'paypal' ? 'PayPal' : 'Cash'}
                      </Text>
                    </Grid>
                  </Row>
                  <Grid lg={12} xs={12} gap={1}>
                    <Grid.Container
                      gap={1}
                      justify="flex-start"
                      css={{
                        overflow: 'auto',
                        height: '55vh',
                        paddingBottom: '2rem',
                        '@xs': {
                          paddingBottom: '2rem',
                          height: '50vh',
                        },
                      }}
                    >
                      <Col align="start" justify="center">
                        {order.orderItems.map((item) => (
                          <>
                            <Spacer y={0.4} />
                            <Card
                              css={{
                                backgroundColor: '$backgroundAlpha',
                                border: '1px solid red',
                              }}
                              isHoverable
                              variant="shadow"
                              borderWeight="bold"
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Row
                                  justify="flex-start"
                                  align="center"
                                  gap={1}
                                >
                                  <Grid
                                    css={{
                                      paddingTop: 10,
                                      paddingBottom: 10,
                                    }}
                                  >
                                    <Card
                                      css={{
                                        borderColor: 'red',
                                        borderWidth: 'thin',
                                        borderRadius: '$xs',
                                      }}
                                      isPressable
                                      variant="bordered"
                                    >
                                      <Image
                                        priority
                                        src={
                                          `data:image/webp;base64, ` +
                                          item.product.image
                                        }
                                        autoResize
                                        width={120}
                                        height={180}
                                        objectFit="cover"
                                        alt={item.product.name}
                                        onClick={() =>
                                          router.push(
                                            `/product/${item.product._id}`,
                                            undefined,
                                            {
                                              shallow: true,
                                            }
                                          )
                                        }
                                      />
                                    </Card>
                                  </Grid>
                                  <Spacer x={0.5} />
                                  <Grid>
                                    <Text h3 color="gray">
                                      {item.product.name}
                                    </Text>
                                    <Text
                                      h4
                                      color="$gray700"
                                      css={{
                                        width: '14rem',
                                      }}
                                    >
                                      {item.product.description}
                                    </Text>
                                    {item.product.category !== 'Food' && (
                                      <Text
                                        h5
                                        color={
                                          item.selectedSize.name === 'large'
                                            ? 'warning'
                                            : item.selectedSize.name ===
                                              'medium'
                                            ? 'error'
                                            : 'success'
                                        }
                                        css={{ width: '10rem' }}
                                      >
                                        {item.selectedSize.display}
                                      </Text>
                                    )}
                                    <Text h4 color="orange">
                                      {moneyFormat(item.product.price)}
                                    </Text>
                                  </Grid>
                                </Row>
                                <Row justify="space-around">
                                  <Text h3 color="red">
                                    {item.itemCount} pcs
                                  </Text>
                                  <Text h3 color="orange">
                                    ₱
                                    {item.subTotal
                                      .toFixed(0)
                                      .replace(
                                        /(\d)(?=(\d{3})+(?!\d))/g,
                                        '$1,'
                                      )}
                                  </Text>
                                </Row>
                              </Box>
                            </Card>
                          </>
                        ))}
                      </Col>
                    </Grid.Container>
                  </Grid>
                </Card>
              </Grid>
            </Grid.Container>
            <Grid lg={12} xs={12}>
              <Spacer y={0.5}></Spacer>
              <Row align="center" justify="center">
                <Button
                  size="xl"
                  css={{ backgroundColor: 'red' }}
                  onPress={() =>
                    router.push('/', undefined, { shallow: 'true' })
                  }
                >
                  Continue Shopping!
                </Button>
              </Row>
              <Spacer y={0.5}></Spacer>
            </Grid>
          </Grid>
        </Card>
      </Row>
    </>
  );
};

export default OrderData;

export const getServerSideProps = async ({ params }) => {
  const order = await Order.findById(params.id)
    .populate({ path: 'orderItems', populate: 'product' })
    .lean();
  if (!order) {
    return {
      notFound: true,
    };
  }

  return {
    props: { order: toJson(order) },
  };
};
