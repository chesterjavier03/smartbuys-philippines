import { Box } from '@mui/material';
import {
  Card,
  Col,
  Collapse,
  Divider,
  Grid,
  Image,
  Loading,
  Row,
  Spacer,
  Text,
  Avatar,
} from '@nextui-org/react';
import db from 'database/db';
import Order from 'models/order';
import User from 'models/user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  convertBufferToImage,
  formatDate,
  moneyFormat,
  toJson,
} from 'utils/functions';
import AdminLeftPanelMenu from '../component/admin.left.panel.menu';
import { adminFetchOrderList } from 'store/actions/admin.actions';

const OrderHistory = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const userToken = userInfo.token;
  const loading = useSelector((state) => state.admin.loading);
  const orders = useSelector((state) => state.admin.orders);

  useEffect(() => {
    if (!userInfo) {
      router.push('/', undefined, { shallow: 'true' });
    }
    dispatch(adminFetchOrderList(userToken));
  }, []);

  return (
    <Grid.Container
      css={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        height: '90vh',
      }}
    >
      <Grid lg={3} md={3} xl={3} sm={3} xs={12}>
        <AdminLeftPanelMenu />
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
          <Grid.Container
            fluid="true"
            responsive="true"
            justify="center"
            css={{
              overflow: 'auto',
              height: '100vh',
              paddingBottom: '27rem',
              '@xs': {
                overflow: 'auto',
                height: '100vh',
                paddingBottom: '6rem',
                marginTop: '0 auto',
              },
            }}
          >
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
                          <>
                            <Row align="center" justify="space-between">
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
                                    Payment:
                                  </Text>
                                  <Spacer x={0.5} />
                                  <Text h5 color="orange">
                                    {order.isPaid ? 'Paid' : 'Pending'}
                                  </Text>
                                </Row>
                              </Grid>
                              <Grid xs={12} lg={12} sm={12} md={12} xl={12}>
                                <Row>
                                  <Text span color="$accents6">
                                    Status Delivery:
                                  </Text>
                                  <Spacer x={0.5} />
                                  <Text h5 color="orange">
                                    {order.isDelivered
                                      ? 'Delivered'
                                      : 'In Transit'}
                                  </Text>
                                </Row>
                              </Grid>
                            </Row>
                            <Row align="center" justify="space-between">
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
                          </>
                        }
                        contentLeft={
                          <Avatar
                            text={order?.user ? order.user.name : ''}
                            textColor="default"
                            color="success"
                            bordered
                            zoomed
                            as="button"
                            size="md"
                            name={order.user.name}
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
                        }
                        borderWeight="bold"
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
                                          // src={
                                          //   `data:image/webp;base64, ` +
                                          //   convertBufferToImage(
                                          //     item.product.image
                                          //   )
                                          // }
                                          src={item.product.image}
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
                                        marginLeft: 'calc(-5.0px) !important',
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
                                              : item.selectedSize === 'medium'
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
                                  <Row justify="space-around" align="center">
                                    <Grid>
                                      <Text h4 color="red">
                                        {item.itemCount}{' '}
                                        {item.itemCount > 1 ? 'pcs' : 'pc'}
                                      </Text>
                                    </Grid>
                                    <Grid>
                                      <Text h3 color="orange">
                                        {moneyFormat(item.subTotal)}
                                      </Text>
                                    </Grid>
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
          </Grid.Container>
        )}
      </Grid>
    </Grid.Container>
  );
};

export default OrderHistory;

export const getServerSideProps = async () => {
  await db.connect();
  try {
    const orderList = await Order.find({})
      .populate({ path: 'orderItems', populate: 'product' })
      .populate({ path: 'user', model: User })
      .lean();
    await db.disconnect();
    return { props: { orderList: toJson(orderList) } };
  } catch (error) {
    await db.disconnect();
    return { props: { orderList: [] } };
  }
};
