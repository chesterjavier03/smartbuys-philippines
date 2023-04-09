import { Box } from '@mui/material';
import {
  Card,
  Col,
  Divider,
  Grid,
  Image,
  Loading,
  Row,
  Spacer,
  Collapse,
  Text,
} from '@nextui-org/react';
import db from 'database/db';
import Order from 'models/order';
import User from 'models/user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  convertBufferToImage,
  formatDate,
  moneyFormat,
  toJson,
} from 'utils/functions';
import LeftPanelMenu from './component/left.panel.menu';

const OrderHistory = ({ orders }) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    if (!userInfo) {
      router.push('/');
    }
  }, []);

  return (
    <Grid.Container gap={1}>
      <Grid lg={3} md={3} xl={3} sm={3} xs={12}>
        <LeftPanelMenu />
      </Grid>
      <Grid xl={9} lg={9} md={9} xs={12} sm={9}>
        {loading ? (
          <Grid.Container
            fluid="true"
            responsive="true"
            justify="center"
            css={{
              paddingTop: '2vh',
              '@xs': {
                paddingTop: '35vh',
              },
            }}
          >
            <Grid>
              <Loading type="default" size="xl" color={'error'} />
            </Grid>
          </Grid.Container>
        ) : (
          <Card
            css={{
              backgroundColor: 'transparent',
              border: '1px solid red',
              height: '80vh',
              borderRadius: '$xs',
              '@xs': {
                marginTop: '1.2rem',
                marginRight: '.5rem',
                height: '86vh',
                borderRadius: '$xs',
              },
            }}
            variant="bordered"
            borderWeight="normal"
          >
            <Grid.Container
              gap={1}
              justify="flex-start"
              alignContent="flex-start"
              align="start"
              alignItems="flex-start"
              css={{
                overflow: 'auto',
                marginTop: '.2rem',
                height: '80vh',
                paddingBottom: '2rem',
                '@xs': {
                  paddingBottom: '2rem',
                  height: '89vh',
                  marginTop: '.4rem',
                },
              }}
            >
              {orders && orders.length === 0 ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight="100%"
                  minWidth="100%"
                >
                  <Grid justify="center" align="center">
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
                      You have not purchased anything yet....
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
                    ></Text>
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
              ) : (
                <Col align="start" justify="flex-start">
                  <Collapse.Group splitted>
                    {orders &&
                      orders.map((order) => (
                        <>
                          <Collapse
                            bordered
                            shadow
                            title={
                              <>
                                <Grid xs={0}>
                                  <Row align="center" justify="flex-start">
                                    <Text h3 color="$accents6">
                                      Order ID:
                                    </Text>
                                    <Spacer x={0.5} />
                                    <Text h4 color="orange">
                                      {order._id}
                                    </Text>
                                  </Row>
                                </Grid>
                                <Grid xs={12}>
                                  <Row align="center" justify="flex-start">
                                    <Text h4 color="$accents6">
                                      Order ID:
                                    </Text>
                                    <Spacer x={0.5} />
                                    <Text h4 color="orange">
                                      {order._id}
                                    </Text>
                                  </Row>
                                </Grid>
                              </>
                            }
                            subtitle={
                              <Grid>
                                <Row align="center" justify="space-around">
                                  <Grid xs={0} lg={12} sm={12} md={12} xl={12}>
                                    <Row align="center" justify="space-between">
                                      <Text span color="$accents6">
                                        Created:
                                      </Text>
                                      <Spacer x={0.5} />
                                      <Text h5 color="orange">
                                        {formatDate(order.createdAt)}
                                      </Text>
                                    </Row>
                                  </Grid>
                                  <Grid xs={12} lg={12} sm={12} md={12} xl={12}>
                                    <Row>
                                      <Text span color="$accents6">
                                        Item Count:
                                      </Text>
                                      <Spacer x={0.5} />
                                      <Text h5 color="orange">
                                        {order.orderItems.length}
                                      </Text>
                                    </Row>
                                  </Grid>
                                  <Grid xs={0} lg={12} sm={12} md={12} xl={12}>
                                    <Row>
                                      <Text span color="$accents6">
                                        Tax:
                                      </Text>
                                      <Spacer x={0.5} />
                                      <Text h5 color="orange">
                                        {moneyFormat(order.taxPrice)}
                                      </Text>
                                    </Row>
                                  </Grid>
                                  <Grid xs={0} lg={12} sm={12} md={12} xl={12}>
                                    <Row>
                                      <Text span color="$accents6">
                                        Shipping:
                                      </Text>
                                      <Spacer x={0.5} />
                                      <Text h5 color="orange">
                                        {moneyFormat(order.shippingPrice)}
                                      </Text>
                                    </Row>
                                  </Grid>
                                  <Grid xs={12} lg={12} sm={12} md={12} xl={12}>
                                    <Row>
                                      <Text span color="$accents6">
                                        Total Amount:
                                      </Text>
                                      <Spacer x={0.5} />
                                      <Text h5 color="orange">
                                        {moneyFormat(order.totalPrice)}
                                      </Text>
                                    </Row>
                                  </Grid>
                                </Row>
                              </Grid>
                            }
                            css={{
                              border: '1px solid Red !important',
                              color: '$accents9',
                              '.nextui-collapse-title': {
                                color: '$accents6',
                              },
                              '.nextui-collapse-subtitle': {
                                color: '$gray800',
                              },
                            }}
                          >
                            {order &&
                              order.orderItems.map((item) => (
                                <>
                                  <Spacer y={0.1} />
                                  <Card
                                    css={{
                                      backgroundColor: '$backgroundAlpha',
                                      border: '1px solid red',
                                      marginLeft: '.5rem',
                                      marginRight: '.5rem',
                                      marginBottom: '.3rem',
                                      width: 'auto',
                                      borderRadius: '$xs',
                                      '@xs': {
                                        width: 'auto',
                                        borderRadius: '$xs',
                                      },
                                    }}
                                    isHoverable
                                    variant="shadow"
                                    borderWeight="bold"
                                  >
                                    <Box
                                      display="flex"
                                      justifyContent="flex-start"
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
                                                convertBufferToImage(
                                                  item.product.image
                                                )
                                              }
                                              autoResize
                                              width={120}
                                              height={180}
                                              objectFit="cover"
                                              alt={item.product.name}
                                              onClick={() =>
                                                router.push(
                                                  {
                                                    pathname: `/product/${item.product._id}`,
                                                    query: {
                                                      product: JSON.stringify(
                                                        item.product
                                                      ),
                                                    },
                                                  },
                                                  `/product/${item.product._id}`
                                                )
                                              }
                                            />
                                          </Card>
                                        </Grid>
                                        <Spacer
                                          shallow
                                          css={{
                                            marginLeft:
                                              'calc(-5.0px) !important',
                                            '@xs': {
                                              marginLeft:
                                                'calc(9.66667px) !important',
                                            },
                                          }}
                                        />
                                        <Grid>
                                          <Text
                                            h3
                                            css={{
                                              fontSize: '1.25rem',
                                              '@xs': {
                                                fontSize: '1.5rem',
                                              },
                                            }}
                                            color="gray"
                                          >
                                            {item.product.name}
                                          </Text>
                                          <Text
                                            h4
                                            color="$gray700"
                                            css={{
                                              width: '2rem',
                                              fontSize: '1rem',
                                              '@xs': {
                                                fontSize: '1.25rem',
                                                width: '14rem',
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
                                                  : item.selectedSize ===
                                                    'medium'
                                                  ? 'error'
                                                  : 'success'
                                              }
                                              css={{
                                                fontSize: '1rem',
                                                '@xs': {
                                                  fontSize: '1.25rem',
                                                },
                                              }}
                                            >
                                              {`${item.selectedSize}`.toUpperCase()}
                                            </Text>
                                          )}
                                          <Text h4 color="orange">
                                            {moneyFormat(item.subTotal)}
                                          </Text>
                                        </Grid>
                                      </Row>
                                      <Row justify="space-around">
                                        <Text h3 color="red">
                                          {item.itemCount}{' '}
                                          {item.itemCount > 1 ? 'pcs' : 'pc'}
                                        </Text>
                                        <Text h3 color="orange">
                                          {moneyFormat(item.subTotal)}
                                        </Text>
                                      </Row>
                                    </Box>
                                    <Divider />
                                  </Card>
                                </>
                              ))}
                          </Collapse>
                        </>
                      ))}
                  </Collapse.Group>
                </Col>
              )}
            </Grid.Container>
          </Card>
        )}
      </Grid>
    </Grid.Container>
  );
};

export default OrderHistory;

export const getServerSideProps = async (context) => {
  await db.connect();
  if (context.query.email) {
    const user = await User.findOne({
      email: JSON.parse(context.query.email),
    }).lean();
    const orders = await Order.find({ user: user })
      .populate({ path: 'orderItems', populate: 'product' })
      .populate({ path: 'user', model: User })
      .lean();

    await db.disconnect();
    return { props: { orders: toJson(orders) } };
  }
  await db.disconnect();
  return { props: { orders: [] } };
};
