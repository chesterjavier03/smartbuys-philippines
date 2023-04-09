import { MenuItem, TextField } from '@mui/material';
import { Button, Card, Grid, Spacer, Text } from '@nextui-org/react';
import CheckoutWizard from 'components/checkoutwizard';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingToUser } from 'store/actions/user.actions';
import { saveShippingAddress } from 'store/reducers/user.reducer';

const Shipping = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const shippingAddress = useSelector((state) => state.user.shipping);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const supportedCity = [
    {
      value: 'Las Pinas',
      label: 'Las Pinas',
    },
    {
      value: 'Muntinlupa',
      label: 'Muntinlupa',
    },
    {
      value: 'Paranaque',
      label: 'Paranaque',
    },
    {
      value: 'Cavite',
      label: 'Cavite',
    },
    {
      value: 'Laguna',
      label: 'Laguna',
    },
  ];

  const submitHandler = async ({ fullName, address, city, mobile }) => {
    closeSnackbar();
    try {
      const shippingAddress = {
        fullName,
        address,
        city,
        mobile,
      };
      const userToken = userInfo.token;
      dispatch(saveShippingToUser({ userToken, shippingAddress }));
      dispatch(saveShippingAddress({ shippingAddress, router }));
      // router.push('/payment', undefined, { shallow: true });
      router.push('/placeorder', undefined, { shallow: true });
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
    setValue('mobile', shippingAddress?.mobile);
  }, [
    router,
    setValue,
    shippingAddress?.address,
    shippingAddress?.city,
    shippingAddress?.fullName,
    shippingAddress?.mobile,
    userInfo,
  ]);

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
                  />
                )}
              />
            </Grid>
            <Spacer y={1} />
            <Grid
              lg={8}
              css={{ display: 'flex', margin: '0 auto', width: '100%' }}
            >
              <Controller
                name="mobile"
                control={control}
                rules={{ validate: matchIsValidTel }}
                render={({ field, fieldState }) => (
                  <MuiTelInput
                    forceCallingCode="true"
                    defaultCountry="PH"
                    id="mobile"
                    label="Mobile"
                    disableDropdown
                    focusOnSelectCountry="true"
                    {...field}
                    flagSize="sm"
                    helperText={
                      fieldState.invalid ? 'Mobile Number is invalid' : ''
                    }
                    error={fieldState.invalid}
                  />
                )}
              />
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
                  />
                )}
              />
            </Grid>
            <Spacer y={1} />
            <Grid
              lg={8}
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
                    select
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
                  >
                    {supportedCity.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
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
