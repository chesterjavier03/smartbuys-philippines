import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Button, Card, Grid, Row, Spacer, Text } from '@nextui-org/react';
import CheckoutWizard from 'components/checkoutwizard';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from 'store/reducers/user.reducer';
import CheckIcon from '@mui/icons-material/Check';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Payment = () => {
  const cartItems = useSelector((state) => state.user.cart.cartItems);
  const shippingAddress = useSelector(
    (state) => state.user.cart.shippingAddress
  );
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
        width: '100vw',
        backgroundColor: '$backgroundAlpha',
        border: '1px solid red',
        marginTop: '1.2rem',
        marginBottom: '1.2rem',
        '@xs': {
          marginTop: '1.2rem',
          marginRight: '.5rem',
          marginBottom: '1.2rem',
          width: '100vw',
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
            {/* <FormControl component="fieldset"> */}
            {/* <Grid.Container gap={1} lg={12} xs={12}>
                <Grid lg={6} xs={12} fullWidth>
                  <Card
                    css={{
                      backgroundColor: '$backgroundAlpha',
                      border: '1px solid red',
                      '@xs': {},
                    }}
                    isHoverable
                    variant="bordered"
                    borderWeight="normal"
                  >
                    <Text h2 color="$blue500">
                      PayPal
                    </Text>
                  </Card>
                </Grid>
                <Grid lg={6} xs={12} fullWidth>
                  <Card
                    css={{
                      backgroundColor: '$backgroundAlpha',
                      border: '1px solid red',
                      '@xs': {},
                    }}
                    isHoverable
                    variant="bordered"
                    borderWeight="normal"
                  >
                    <Text h2 color="Orange">
                      Cash
                    </Text>
                  </Card>
                </Grid>
              </Grid.Container> */}
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
                    '@xs': {},
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
                    '@xs': {},
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

            {/* <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  style={{ color: 'Black', fontSize: '2rem' }}
                  label="PayPal"
                  value="PayPal"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  style={{ color: 'Black', fontSize: '2rem' }}
                  label="Cash"
                  value="Cash"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup> */}
            {/* </FormControl> */}
          </Card.Body>
          <Card.Footer>
            <Grid lg={12} xs={12} justify="center">
              <Box>
                <Row align="center">
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
          <Spacer y={4} />
        </form>
      </Grid>
    </Card>
  );
};

export default Payment;
