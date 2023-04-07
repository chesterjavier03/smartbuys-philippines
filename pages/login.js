import { TextField } from '@mui/material';
import { Button, Card, Container, Grid, Spacer, Text } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from 'store/actions/user.actions';
import { clearNotifications } from 'store/reducers/notifications.reducer';

const Login = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.user.darkMode);
  const userInfo = useSelector((state) => state.user.userInfo);
  const notifications = useSelector((state) => state.notifications);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { redirect } = router.query;
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async ({ email, password }) => {
    const values = {
      email,
      password,
    };
    dispatch(signInUser({ values, router }));
    // router.push(redirect || '/', undefined, { shallow: true });
  };

  useEffect(() => {
    if (userInfo) {
      router.push(redirect || '/', undefined, { shallow: true });
    }

    if (notifications && global.error) {
      const msg = global.msg ? global.msg : 'Error';
      enqueueSnackbar(`Success! ${msg}`, { variant: 'error' });
      dispatch(clearNotifications());
    }
  }, []);

  return (
    <>
      <Card
        css={{
          margin: '0 auto',
          p: '$10',
          mw: '600px',
          marginTop: '2rem',
          backgroundColor: darkMode
            ? 'rgb(128,128,128,.8)'
            : '$backgroundAlpha',
          border: darkMode ? '1px Gold solid' : '1px Red solid',
        }}
        borderWeight="extrabold"
        variant="shadow"
        isHoverable
      >
        <Container
          fluid
          responsive
          justify="center"
          fullWidth
          display="flex"
          css={{ margin: '0 auto' }}
        >
          <Image
            fullWidth
            css={{ margin: '0 auto' }}
            priority
            src="/static/smartbuys_wings.webp"
            alt="SmartBuys Philippines"
            width={300}
            height={150}
            autoResize
          />
        </Container>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Card.Header>
            <Text
              h1
              color={darkMode ? 'Gold' : 'Red'}
              css={{ margin: '0 auto' }}
            >
              Login
            </Text>
          </Card.Header>
          <Card.Body>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
            <Spacer y={1} />
            <Controller
              name="password"
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
                  id="password"
                  label="Password"
                  inputProps={{
                    type: 'password',
                  }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 5'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </Card.Body>
          <Card.Footer>
            <Grid.Container>
              <Grid lg={12} xs={12}>
                <Button
                  size={'lg'}
                  ripple
                  animated
                  type="submit"
                  css={{
                    margin: '0 auto',
                    backgroundColor: darkMode ? 'Gold' : 'Red',
                    color: darkMode ? 'Black' : 'White',
                  }}
                >
                  Login
                </Button>
              </Grid>
              <Spacer y={1} />
              <Grid lg={12} xs={12}>
                <Text span color="$gray700" css={{ margin: '0 auto' }}>
                  Don&apos;t have an account?{' '}
                  <Link href={`/register?redirect=${redirect || '/'}`}>
                    Register
                  </Link>
                </Text>
              </Grid>
            </Grid.Container>
          </Card.Footer>
        </form>
      </Card>
    </>
  );
};

export default Login;
