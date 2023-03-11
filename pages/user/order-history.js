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
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderList } from 'store/actions/user.actions';
import { convertBufferToImage, moneyFormat } from 'utils/functions';
import LeftPanelMenu from './component/left.panel.menu';

const OrderHistory = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const orderList = useSelector((state) => state.user.orders);

  useEffect(() => {
    if (!userInfo) {
      router.push('/');
    }
    const userToken = userInfo.token;
    dispatch(fetchOrderList(userToken));
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
            {orderList.length === 0 && (
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
            )}
            <Col align="start" justify="flex-start">
              {orderList.map((order) =>
                order.orderItems.map((item) => (
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
                                  convertBufferToImage(item.product.image)
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
                                        product: JSON.stringify(item.product),
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

// export const getServerSideProps = async (context) => {
//   await db.connect();
//   if (context.query.email) {
//     const user = await User.findOne({
//       email: JSON.parse(context.query.email),
//     }).lean();
//     const orderList = await Order.find({ user: user })
//       .populate({ path: 'orderItems', populate: 'product' })
//       .populate({ path: 'user', model: User })
//       .lean();

//     await db.disconnect();

//     return { props: { orders: toJson(orderList) } };
//   }
//   return { props: { orders: [] } };
// };
