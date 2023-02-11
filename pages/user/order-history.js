import { Box } from '@mui/material';
import {
  Card,
  Col,
  Divider,
  Grid,
  Image,
  Row,
  Spacer,
  Text,
} from '@nextui-org/react';
import Order from 'models/order';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { moneyFormat, toJson } from 'utils/functions';
import LeftPanelMenu from './component/left.panel.menu';

const OrderHistory = ({ orders }) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);

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
            <Col align="start" justify="flex-start">
              {orders.map((item) =>
                item.orderItems.map((order) => (
                  <>
                    <Card
                      css={{
                        backgroundColor: '$backgroundAlpha',
                        border: '1px solid red',
                        margin: '1rem',
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
                        <Row justify="flex-start" align="center" gap={1}>
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
                                  order.product.image
                                }
                                autoResize
                                width={120}
                                height={180}
                                objectFit="cover"
                                alt={order.product.name}
                                onClick={() =>
                                  router.push(
                                    {
                                      pathname: `/product/${order.product._id}`,
                                      query: {
                                        product: JSON.stringify(order.product),
                                      },
                                    },
                                    `/product/${order.product._id}`
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
                                marginLeft: 'calc(9.66667px) !important',
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
                              {order.product.name}
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
                              {order.product.description}
                            </Text>
                            {order.product.category !== 'Food' && (
                              <Text
                                h5
                                color={
                                  order.selectedSize === 'large'
                                    ? 'warning'
                                    : order.selectedSize === 'medium'
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
                                {`${order.selectedSize}`.toUpperCase()}
                              </Text>
                            )}
                            <Text h4 color="orange">
                              {moneyFormat(order.product.price)}
                            </Text>
                          </Grid>
                        </Row>
                        <Row justify="space-around">
                          <Text h3 color="red">
                            {order.itemCount} pcs
                          </Text>
                          <Text h3 color="orange">
                            ₱
                            {order.subTotal
                              .toFixed(0)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                          </Text>
                        </Row>
                      </Box>
                      <Divider />
                    </Card>
                  </>
                ))
              )}
            </Col>
          </Grid.Container>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default OrderHistory;

export const getServerSideProps = async () => {
  const orderList = await Order.find({})
    .populate({ path: 'orderItems', populate: 'product' })
    .lean();

  return { props: { orders: toJson(orderList) } };
};
