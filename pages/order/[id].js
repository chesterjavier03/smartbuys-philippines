import {
  Button,
  Card,
  Col,
  Grid,
  Image,
  Row,
  Spacer,
  Text,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { moneyFormat, toJson } from 'utils/functions';
import Order from 'models/order';
import db from 'database/db';
import { Box } from '@mui/material';

const OrderData = ({ order }) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Row>
        <Card
          css={{
            backgroundColor: '$backgroundAlpha',
            border: '1px solid red',
            marginTop: '.5rem',
            height: '80vh',
            '@xs': {
              backgroundColor: '$backgroundAlpha',
              marginTop: '1.2rem',
              marginRight: '.5rem',
              height: '75vh',
            },
          }}
          isHoverable
          variant="bordered"
          borderWeight="normal"
        >
          <Grid justify="center">
            <Spacer y={0.5} />
            <Grid lg={12} xs={12}>
              <Row align="center" justify="center">
                <Text h1 color="Red" justify="center" align="center">
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
                    <Grid xs={0} lg={1}>
                      <Spacer x={1} />
                    </Grid>
                  </Row>
                  <Row align="center" justify="flex-start">
                    <Grid xs={0} lg={1}>
                      <Spacer x={1} />
                    </Grid>
                    <Grid lg={3} xs={12}>
                      <Text h4 color="gray">
                        Payment Method
                      </Text>
                    </Grid>
                    <Grid lg={2} xs={12}>
                      <Text h4 color="Blue">
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
                        height: '45vh',
                        paddingBottom: '1rem',
                        '@xs': {
                          paddingBottom: '0rem',
                          height: '53vh',
                        },
                      }}
                    >
                      <Col align="start" justify="center">
                        {order.orderItems.map((item) => (
                          <>
                            <Card
                              css={{
                                backgroundColor: '$backgroundAlpha',
                                border: '1px solid red',
                                marginBottom: '.2rem',
                              }}
                              isHoverable
                              variant="shadow"
                              borderWeight="bold"
                            >
                              <Box
                                css={{
                                  width: 'fit-content',
                                  '@xs': {
                                    width: 'fit-content',
                                  },
                                }}
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
                                      '@xs': {},
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
                                          Buffer.from(
                                            item.product.image,
                                            'binary'
                                          ).toString('base64')
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
                                  <Grid justify="center" align="flex-start">
                                    <Text h3 color="gray">
                                      {item.product.name}
                                    </Text>
                                    <Text
                                      h4
                                      color="$gray700"
                                      css={{
                                        width:
                                          item.product.description.length < 40
                                            ? '55vw'
                                            : 'fit-content',
                                        '@xs': {
                                          width: '40vw',
                                        },
                                      }}
                                    >
                                      {item.product.description}
                                    </Text>
                                    {item.product.category !== 'Food' && (
                                      <Text
                                        h5
                                        color={
                                          item.selectedSize === 'large'
                                            ? 'warning'
                                            : item.selectedSize === 'medium'
                                            ? 'error'
                                            : 'success'
                                        }
                                      >
                                        {item.selectedSize === 'small'
                                          ? 'Small (2-3 yrs old)'
                                          : item.selectedSize === 'medium'
                                          ? 'Medium (4-6 yrs old)'
                                          : 'Large (6-8 yrs old)'}
                                      </Text>
                                    )}
                                    <Grid xs={0} lg={4} md={4} xl={4} sm={4}>
                                      <Text h4 color="orange">
                                        {moneyFormat(item.product.price)}
                                      </Text>
                                    </Grid>
                                    <Grid lg={0} xs={10} md={0} xl={0} sm={0}>
                                      <Row
                                        justify="space-between"
                                        align="flex-start"
                                      >
                                        <Text h4 color="orange">
                                          {moneyFormat(item.product.price)}
                                        </Text>
                                        <Text h4 color="red">
                                          {item.itemCount} pcs
                                        </Text>
                                        <Text h4 color="orange">
                                          {moneyFormat(item.subTotal)}
                                        </Text>
                                      </Row>
                                    </Grid>
                                  </Grid>
                                  <Grid xs={0} lg={4} md={4} xl={4} sm={4}>
                                    <Row justify="space-evenly">
                                      <Text h3 color="red">
                                        {item.itemCount} pcs
                                      </Text>
                                      <Text h3 color="orange">
                                        {moneyFormat(item.subTotal)}
                                      </Text>
                                    </Row>
                                  </Grid>
                                </Row>
                              </Box>
                            </Card>
                          </>
                        ))}
                        <Grid xs={1}>
                          <Spacer y={1} />
                        </Grid>
                      </Col>
                    </Grid.Container>
                  </Grid>
                </Card>
              </Grid>
            </Grid.Container>
          </Grid>
        </Card>
      </Row>
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
              marginTop: '2%',
              '@xs': {
                marginTop: '1%',
              },
            }}
          >
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
                onPress={() => router.push('/', undefined, { shallow: 'true' })}
              >
                Continue Shopping!
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
                onPress={() => router.push('/', undefined, { shallow: 'true' })}
              >
                Continue Shopping!
              </Button>
            </Grid>
          </Grid.Container>
        </Card>
      </Row>
    </>
  );
};

export default OrderData;

export const getServerSideProps = async ({ params }) => {
  await db.connect();
  const order = await Order.findById(params.id)
    .populate({ path: 'orderItems', populate: 'product' })
    .lean();

  await db.disconnect();
  if (!order) {
    return {
      notFound: true,
    };
  }

  return {
    props: { order: toJson(order) },
  };
};
