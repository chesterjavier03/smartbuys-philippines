import { TextField } from '@mui/material';
import { Button, Card, Grid, Spacer, Text } from '@nextui-org/react';
import CheckoutWizard from 'components/checkoutwizard';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from 'store/reducers/user.reducer';

const Shipping = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const shippingAddress = useSelector(
    (state) => state.user.cart.shippingAddress
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submitHandler = async ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }) => {
    closeSnackbar();
    try {
      const shipping = {
        fullName,
        address,
        city,
        postalCode,
        country,
      };
      dispatch(saveShippingAddress({ shipping, router }));
      router.push('/payment', undefined, { shallow: true });
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping', undefined, { shallow: 'true' });
    }
    setValue('fullName', shippingAddress?.fullName);
    setValue('address', shippingAddress?.address);
    setValue('city', shippingAddress?.city);
    setValue('postalCode', shippingAddress?.postalCode);
    setValue('country', shippingAddress?.country);
  }, []);

  return (
    <Card
      css={{
        width: '100%',
        backgroundColor: '$backgroundAlpha',
        border: '1px solid red',
        marginTop: '1.2rem',
        marginBottom: '1.2rem',
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
        <CheckoutWizard activeStep={1} />
        <Spacer y={1} />
        <form onSubmit={handleSubmit(submitHandler)}>
          <Card.Header>
            <Text h1 color={'Red'} css={{ margin: '0 auto' }}>
              Shipping Address
            </Text>
          </Card.Header>
          <Card.Body>
            <Grid
              lg={8}
              justify="center"
              about="center"
              alignContent="center"
              alignItems="center"
              css={{ display: 'flex', margin: '0 auto', width: '100%' }}
            >
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    error={Boolean(errors.fullName)}
                    helperText={
                      errors.fullName
                        ? errors.fullName.type === 'minLength'
                          ? 'Full name length is more than 5'
                          : 'Full name is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </Grid>
            <Spacer y={1} />
            <Grid
              lg={8}
              justify="center"
              about="center"
              alignContent="center"
              alignItems="center"
              css={{ display: 'flex', margin: '0 auto', width: '100%' }}
            >
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="address"
                    label="Address"
                    error={Boolean(errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === 'minLength'
                          ? 'Address length is more than 5'
                          : 'Address is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </Grid>
            <Spacer y={1} />
            <Grid
              lg={8}
              justify="center"
              about="center"
              alignContent="center"
              alignItems="center"
              css={{ display: 'flex', margin: '0 auto', width: '100%' }}
            >
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="city"
                    label="City"
                    error={Boolean(errors.city)}
                    helperText={
                      errors.city
                        ? errors.city.type === 'minLength'
                          ? 'City length is more than 5'
                          : 'City is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </Grid>
            <Spacer y={1} />
            <Grid
              lg={8}
              justify="center"
              about="center"
              alignContent="center"
              alignItems="center"
              css={{ display: 'flex', margin: '0 auto', width: '100%' }}
            >
              <Controller
                name="postalCode"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="postalCode"
                    label="Postal"
                    error={Boolean(errors.postalCode)}
                    helperText={
                      errors.postalCode
                        ? errors.postalCode.type === 'minLength'
                          ? 'Postal length is more than 5'
                          : 'Postal is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </Grid>
            <Spacer y={1} />
            <Grid
              lg={8}
              justify="center"
              about="center"
              alignContent="center"
              alignItems="center"
              css={{ display: 'flex', margin: '0 auto', width: '100%' }}
            >
              <Controller
                name="country"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="country"
                    label="Country"
                    error={Boolean(errors.country)}
                    helperText={
                      errors.confirmPassword
                        ? errors.country.type === 'minLength'
                          ? 'Country length is more than 5'
                          : 'Country is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </Grid>
          </Card.Body>
          <Card.Footer>
            <Grid.Container justify="center">
              <Grid lg={12}>
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
                  }}
                >
                  Continue
                </Button>
              </Grid>
            </Grid.Container>
          </Card.Footer>
          <Spacer y={4} />
        </form>
      </Grid>
    </Card>
  );
};

export default Shipping;
