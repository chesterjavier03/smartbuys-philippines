import { Card, Grid, Loading, Row, Spacer, Text } from '@nextui-org/react';
import axios from 'axios';
import CheckoutWizard from 'components/checkoutwizard';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartClear } from 'store/reducers/user.reducer';
import { moneyFormat } from 'utils/functions';
import OrderList from './component/order-list';
import TotalDetails from './component/total-details';

const PlaceOrder = () => {
  const router = useRouter();
  const { paymentMethod, cartItems } = useSelector((state) => state.user.cart);
  const shippingAddress = useSelector((state) => state.user.shipping);
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
    // if (!paymentMethod) {
    //   router.push('/payment', undefined, { shallow: 'true' });
    // }
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
      submitOrders(data);
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
  };

  const submitOrders = async (data) => {
    const order = {
      name: userInfo.name,
      email: userInfo.email,
      items: cartItems,
      orders: data,
      itemsPrice: moneyFormat(itemsPrice),
      shippingPrice: moneyFormat(shippingPrice),
      taxPrice: moneyFormat(taxPrice),
      totalPrice: moneyFormat(totalPrice),
    };
    axios({
      method: 'POST',
      url: '/api/order-form',
      data: order,
    });
    enqueueSnackbar(
      'Order received! We will review your purchase and get back to you the soonest.',
      { variant: 'success' }
    );
  };

  return (
    <>
      <Row>
        <Card
          css={{
            backgroundColor: '$backgroundAlpha',
            border: '1px solid red',
            marginTop: '.5rem',
            height: '70vh',
            '@xs': {
              backgroundColor: '$backgroundAlpha',
              marginTop: '1.2rem',
              marginRight: '.5rem',
              height: '69vh',
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
              <Spacer y={0.5} />
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
                      <Grid lg={3} xs={12}>
                        <Text h4 color="gray">
                          Shipping Address
                        </Text>
                      </Grid>
                      <Grid lg={5} xs={12}>
                        <Text h4 color="$gray600">
                          {shippingAddress?.fullName},{' '}
                          {shippingAddress?.address}, {shippingAddress?.city},{' '}
                          {shippingAddress?.mobile}
                        </Text>
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
                          height: '39vh',
                          paddingBottom: '1rem',
                          '@xs': {
                            paddingBottom: '0rem',
                            height: '46vh',
                          },
                        }}
                      >
                        <OrderList cartItems={cartItems} router={router} />
                      </Grid.Container>
                    </Grid>
                  </Card>
                </Grid>
              </Grid.Container>
            </Grid>
          )}
        </Card>
      </Row>
      <TotalDetails
        itemsPrice={itemsPrice}
        shippingPrice={shippingPrice}
        taxPrice={taxPrice}
        totalPrice={totalPrice}
        placeOrderHandler={placeOrderHandler}
      />
    </>
  );
};

export default PlaceOrder;
