import { Box } from '@mui/material';
import {
  Button,
  Card,
  Col,
  Grid,
  Image,
  Loading,
  Row,
  Spacer,
  Text,
} from '@nextui-org/react';
import axios from 'axios';
import CheckoutWizard from 'components/checkoutwizard';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartClear } from 'store/reducers/user.reducer';
import { moneyFormat } from 'utils/functions';

const PlaceOrder = () => {
  const router = useRouter();
  const { shippingAddress, paymentMethod, cartItems } = useSelector(
    (state) => state.user.cart
  );
  const userInfo = useSelector((state) => state.user.userInfo);
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = cartItems.reduce((a, v) => (a = a + v.subTotal), 0);
  const shippingPrice = itemsPrice > 5000 ? 0 : 35;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment', undefined, { shallow: 'true' });
    }
    if (cartItems.length === 0) {
      router.push('/cart', undefined, { shallow: 'true' });
    }
    if (!shippingAddress) {
      router.push('/shipping', undefined, { shallow: 'true' });
    }
    _reconstructOrderList(cartItems);
  }, []);

  const placeOrderHandler = async () => {
    closeSnackbar();
    try {
      setIsLoading(true);

      console.log('here ', orderList);

      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: orderList,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch(cartClear());
      setIsLoading(false);
      router.push(`/order/${data._id}`, undefined, { shallow: 'true' });
      // router.push('/', undefined, { shallow: 'true' });
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(`[ERROR] ${error.response.data.message}`, {
        variant: 'error',
      });
    }
  };

  const _reconstructOrderList = (cartItems) => {
    let list = [];
    const newData = cartItems.map((item) => {
      if (item.selectedSize) {
        const updatedData = {
          ...item,
          selectedSize: item.selectedSize ? item.selectedSize.name : '',
        };
        return updatedData;
      }
      return item;
    });
    setOrderList(newData);
    console.log('here ', list);
  };

  return (
    <>
      <Row>
        <Card
          css={{
            backgroundColor: '$backgroundAlpha',
            border: '1px solid red',
            marginTop: '1.2rem',
            height: '70vh',
            '@xs': {
              backgroundColor: '$backgroundAlpha',
              marginTop: '1.2rem',
              marginRight: '.5rem',
              height: '70vh',
            },
          }}
          isHoverable
          variant="bordered"
          borderWeight="normal"
        >
          {isLoading ? (
            <Grid.Container
              fluid="true"
              responsive="true"
              justify="center"
              css={{
                paddingTop: '50vh',
              }}
            >
              <Grid>
                <Loading type="default" size="xl" color={'error'} />
              </Grid>
            </Grid.Container>
          ) : (
            <Grid justify="center">
              <CheckoutWizard activeStep={3} />
              <Spacer y={1} />
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
                          {shippingAddress?.fullName},{' '}
                          {shippingAddress?.address}, {shippingAddress?.city},{' '}
                          {shippingAddress?.postalCode},{' '}
                          {shippingAddress?.country}
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
                          {paymentMethod === 'paypal' ? 'PayPal' : 'Cash'}
                        </Text>
                      </Grid>
                    </Row>
                    <Grid lg={12} xs={12} gap={1}>
                      <Grid.Container
                        gap={1}
                        justify="flex-start"
                        css={{
                          overflow: 'auto',
                          height: '29vh',
                          paddingBottom: '2rem',
                          '@xs': {
                            paddingBottom: '2rem',
                            height: '43vh',
                          },
                        }}
                      >
                        <Col align="start" justify="center">
                          {cartItems.map((item) => (
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
            </Grid>
          )}
        </Card>
      </Row>
      <Row>
        <Card
          css={{
            backgroundColor: '$backgroundAlpha',
            border: '1px solid red',
            marginTop: '.5rem',
            height: '16vh',
            '@xs': {
              backgroundColor: '$backgroundAlpha',
              marginTop: '.5rem',
              marginRight: '.5rem',
              height: '16vh',
            },
          }}
          isHoverable
          variant="bordered"
          borderWeight="normal"
        >
          <Grid justify="flex-start">
            <Grid.Container justify="flex-start">
              <Grid lg={12} xs={12}>
                <Card
                  isHoverable
                  css={{
                    backgroundColor: 'transparent',
                  }}
                >
                  <Row align="center" justify="flex-end" fluid wrap="wrap">
                    <Grid lg={8} xs={12}>
                      <Spacer x={2} />
                      <Text h3 color="$gray600">
                        Order Total
                      </Text>
                      <Spacer x={1} />
                      <Text h3 color="Orange">
                        ₱
                        {itemsPrice
                          .toFixed(0)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                      </Text>
                      <Spacer x={2} />
                      <Text h3 color="$gray600">
                        Shipping
                      </Text>
                      <Spacer x={1} />
                      <Text h3 color="Orange">
                        ₱
                        {shippingPrice
                          .toFixed(0)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                      </Text>
                      <Spacer x={2} />
                      <Text h3 color="$gray600">
                        Tax
                      </Text>
                      <Spacer x={1} />
                      <Text h3 color="Orange">
                        ₱{' '}
                        {taxPrice
                          .toFixed(0)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                      </Text>
                    </Grid>
                    <Grid lg={4} xs={12}>
                      <Spacer x={4} />
                      <Text h2 color="$gray600">
                        Total Price:
                      </Text>
                      <Spacer x={1} />
                      <Text h2 color="Orange">
                        ₱{' '}
                        {totalPrice
                          .toFixed(0)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                        {/* {cartItems
                          .reduce((a, v) => (a = a + v.subTotal), 0)
                          .toFixed(0)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} */}
                      </Text>
                      <Spacer x={2} />
                    </Grid>
                  </Row>
                  <Row align="center" justify="flex-end">
                    <Grid lg={3} xs={12}>
                      <Button
                        size="xl"
                        css={{ backgroundColor: 'red' }}
                        onPress={placeOrderHandler}
                      >
                        Place Order
                      </Button>
                    </Grid>
                  </Row>
                </Card>
              </Grid>
            </Grid.Container>
          </Grid>
        </Card>
      </Row>
    </>
  );
};

export default PlaceOrder;
