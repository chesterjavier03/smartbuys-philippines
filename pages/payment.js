import { Box } from '@mui/material';
import { Button, Card, Grid, Row, Spacer, Text } from '@nextui-org/react';
import CheckoutWizard from 'components/checkoutwizard';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from 'store/reducers/user.reducer';

const Payment = () => {
  const cartItems = useSelector((state) => state.user.cart.cartItems);
  const shippingAddress = useSelector((state) => state.user.shipping);
  const userInfo = useSelector((state) => state.user.userInfo);
  const userPaymentMethod = useSelector(
    (state) => state.user.cart.paymentMethod
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState('');
  const { handleSubmit } = useForm();

  const { enqueueSnackbar } = useSnackbar();

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
    if (!userInfo) {
      router.push('/login', undefined, { shallow: 'true' });
    }
    if (userPaymentMethod) {
      setPaymentMethod(userPaymentMethod);
    }
  }, []);

  const submitHandler = () => {
    if (!paymentMethod) {
      enqueueSnackbar('Payment method is required', { variant: 'error' });
      return;
    }
    dispatch(savePaymentMethod({ paymentMethod, router }));
    router.push('/placeorder');
  };

  return (
    <Card
      css={{
        width: '100%',
        backgroundColor: '$backgroundAlpha',
        border: '1px solid red',
        marginTop: '1rem',
        marginBottom: '1rem',
        '@xs': {
          marginTop: '1.2rem',
          marginRight: '.5rem',
          marginBottom: '1.2rem',
          width: '100%',
        },
      }}
      isHoverable
      variant="bordered"
      borderWeight="normal"
    >
      <Grid justify="center">
        <CheckoutWizard activeStep={2} />
        <Spacer y={1} />
        <form onSubmit={handleSubmit(submitHandler)}>
          <Card.Header>
            <Text h1 color={'Red'} css={{ margin: '0 auto' }}>
              Payment Method
            </Text>
          </Card.Header>
          <Card.Body>
            <Grid.Container gap={2} justify="center">
              <Grid xs={12} lg={3}>
                <Card
                  align="center"
                  css={{
                    backgroundColor: `${
                      paymentMethod === 'paypal'
                        ? 'rgb(25,201,100, .5)'
                        : '$backgroundAlpha'
                    }`,
                    border: '1px solid red',
                    h: '20vh',
                    '@xs': {
                      h: '20vh',
                    },
                    justifyContent: 'center',
                  }}
                  isHoverable
                  isPressable
                  variant="bordered"
                  borderWeight="normal"
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <Text h2 color="Blue">
                    Paypal
                  </Text>
                </Card>
              </Grid>
              <Grid xs={12} lg={3}>
                <Card
                  align="center"
                  css={{
                    backgroundColor: `${
                      paymentMethod === 'cash'
                        ? 'rgb(25,201,100, .5)'
                        : '$backgroundAlpha'
                    }`,
                    border: '1px solid red',
                    h: '20vh',
                    '@xs': {
                      h: '20vh',
                    },
                    justifyContent: 'center',
                  }}
                  isHoverable
                  isPressable
                  variant="bordered"
                  borderWeight="normal"
                  onClick={() => setPaymentMethod('cash')}
                >
                  <Text
                    h2
                    css={{
                      color: `${
                        paymentMethod === 'cash' ? 'Yellow' : 'Orange'
                      }`,
                    }}
                  >
                    Cash
                  </Text>
                </Card>
              </Grid>
            </Grid.Container>
          </Card.Body>
          <Card.Footer>
            <Grid lg={12} xs={12} justify="center">
              <Box>
                <Row align="center" justify="center">
                  <Button
                    variant="contained"
                    fullWidth
                    size={'lg'}
                    ripple
                    animated
                    css={{
                      margin: '0 auto',
                      backgroundColor: 'Orange',
                      color: '$accents9',
                      border: '1px solid Brown',
                      minWidth: '10.5rem',
                      '@xs': {
                        minWidth: '15rem',
                      },
                    }}
                    onClick={() =>
                      router.push('/shipping', undefined, { shallow: 'true' })
                    }
                  >
                    Back
                  </Button>
                  <Spacer x={1} />
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    size={'lg'}
                    ripple
                    animated
                    type="submit"
                    css={{
                      margin: '0 auto',
                      backgroundColor: 'Red',
                      color: 'White',
                      border: '1px solid Brown',
                      minWidth: '10.5rem',
                      '@xs': {
                        minWidth: '15rem',
                      },
                    }}
                    onClick={() => {
                      if (paymentMethod) {
                        router.push('/placeorder');
                      }
                    }}
                  >
                    Continue
                  </Button>
                </Row>
              </Box>
            </Grid>
          </Card.Footer>
          <Spacer y={2} />
        </form>
      </Grid>
    </Card>
  );
};

export default Payment;
