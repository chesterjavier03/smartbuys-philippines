import { TextField } from '@mui/material';
import { Button, Card, Grid, Spacer, Text } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'store/reducers/user.reducer';
import LeftPanelMenu from './component/left.panel.menu';

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!userInfo) {
      router.push('/', undefined, { shallow: 'true' });
    }
    setValue('name', userInfo?.name);
    setValue('email', userInfo?.email);
    setValue('password', userInfo?.password);
  }, []);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar("Password don't match", { variant: 'error' });
      return;
    }
    try {
      const values = {
        name,
        email,
        password,
      };
      const { data } = await axios.put('/api/users/profile', values, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch(updateUser(data));
      enqueueSnackbar('Profile successfully updated!', { variant: 'success' });
      router.push('/', undefined, { shallow: 'true' });
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <Grid.Container gap={1}>
      <Grid lg={3} md={3} xl={3} sm={3} xs={12}>
        <LeftPanelMenu />
      </Grid>
      <Grid xl={9} lg={9} md={9} xs={12} sm={9}>
        <Card
          css={{
            backgroundColor: '$backgroundAlpha',
            border: '1px solid red',
            marginBottom: '1.2rem',
            '@xs': {
              marginTop: '1.2rem',
              marginRight: '.5rem',
              marginBottom: '1.2rem',
            },
          }}
          isHoverable
          variant="bordered"
          borderWeight="normal"
        >
          <form onSubmit={handleSubmit(submitHandler)}>
            <Card.Header>
              <Text h1 color={'Red'} css={{ margin: '0 auto' }}>
                Profile
              </Text>
            </Card.Header>
            <Card.Body>
              <Grid
                justify="center"
                css={{
                  display: 'flex',
                  width: '80%',
                  margin: '0 auto',
                }}
              >
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="name"
                      label="Full Name"
                      inputProps={{
                        type: 'text',
                      }}
                      error={Boolean(errors.name)}
                      helperText={
                        errors.name
                          ? errors.name.type === 'minLength'
                            ? 'Full name length is more than 2'
                            : 'Full name is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                />
              </Grid>
              <Spacer y={1} />
              <Grid
                justify="center"
                alignContent="center"
                alignItems="center"
                css={{
                  display: 'flex',
                  margin: '0 auto',
                  width: '80%',
                }}
              >
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
                />
              </Grid>
              <Spacer y={1} />
              <Grid
                justify="center"
                about="center"
                alignContent="center"
                alignItems="center"
                css={{
                  display: 'flex',
                  margin: '0 auto',
                  width: '80%',
                }}
              >
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
                />
              </Grid>
              <Spacer y={1} />
              <Grid
                justify="center"
                about="center"
                alignContent="center"
                alignItems="center"
                css={{
                  display: 'flex',
                  margin: '0 auto',
                  width: '80%',
                }}
              >
                <Controller
                  name="confirmPassword"
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
                      id="confirmPassword"
                      label="Confirm Password"
                      inputProps={{
                        type: 'password',
                      }}
                      error={Boolean(errors.confirmPassword)}
                      helperText={
                        errors.confirmPassword
                          ? errors.confirmPassword.type === 'minLength'
                            ? 'Confirm Password length is more than 5'
                            : 'Confirm Password is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                />
              </Grid>
            </Card.Body>
            <Card.Footer>
              <Grid.Container>
                <Grid lg={12} xs={12} sm={12} md={12} xl={12}>
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
                    Update
                  </Button>
                </Grid>
              </Grid.Container>
            </Card.Footer>
            <Spacer y={1} />
          </form>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default Profile;
