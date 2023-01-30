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

const Payment = () => {
  const shippingAddress = useSelector(
    (state) => state.user.cart.shippingAddress
  );
  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState('');
  const { handleSubmit } = useForm();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!shippingAddress && !userInfo) {
      router.push('/placeorder', undefined, { shallow: 'true' });
    }
  }, []);

  const submitHandler = () => {
    if (!paymentMethod) {
      enqueueSnackbar('Payment method is required', { variant: 'error' });
    } else {
      const payment = {};
      dispatch(savePaymentMethod({ payment, router }));
      router.push('/placeorder');
    }
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
            <Grid
              lg={8}
              justify="center"
              about="center"
              alignContent="center"
              alignItems="center"
              css={{ display: 'flex', margin: '0 auto', width: '100vw' }}
            >
              <FormControl component="fieldset">
                <RadioGroup
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
                </RadioGroup>
              </FormControl>
            </Grid>
          </Card.Body>
          <Card.Footer>
            <Grid.Container>
              <Grid lg={12} justify="center">
                <Box>
                  <Row>
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
                    <Spacer x={2} />
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
                          router.push('/shipping');
                        }
                      }}
                    >
                      Continue
                    </Button>
                  </Row>
                </Box>
              </Grid>
            </Grid.Container>
          </Card.Footer>
          <Spacer y={4} />
        </form>
      </Grid>
    </Card>
  );
};

export default Payment;
