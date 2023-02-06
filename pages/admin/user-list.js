import { TextField } from '@mui/material';
import {
  Button,
  Card,
  Col,
  Grid,
  Loading,
  Modal,
  Row,
  Spacer,
  Switch,
  Text,
} from '@nextui-org/react';
import axios from 'axios';
import User from 'models/user';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toJson } from 'utils/functions';
import AdminLeftPanelMenu from './component/admin.left.panel.menu';

const UserList = ({ users }) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);
  const loading = useSelector((state) => state.user.loading);
  const [visible, setVisible] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handler = (user) => {
    setVisible(true);
    setValue('name', user?.name);
    setValue('email', user?.email);
    setValue('isAdmin', user?.isAdmin);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (!userInfo) {
      router.push('/', undefined, { shallow: 'true' });
    }
  }, []);

  const submitHandler = async ({ email, isAdmin }) => {
    closeSnackbar();
    try {
      const values = {
        email,
        isAdmin,
      };
      axios.put('/api/admin/update-user', values, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      enqueueSnackbar('Profile successfully updated!', { variant: 'success' });
      setVisible(false);
      router.push('/admin/user-list');
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <Grid.Container gap={1}>
      <Grid lg={3} md={3} xl={3} sm={3} xs={12}>
        <AdminLeftPanelMenu />
      </Grid>
      <Grid xl={9} lg={9} md={9} xs={12} sm={9}>
        {loading ? (
          <Grid.Container
            fluid="true"
            responsive="true"
            justify="center"
            css={{
              paddingTop: '2vh',
              '@xs': {
                paddingTop: '35vh',
              },
            }}
          >
            <Grid>
              <Loading type="default" size="xl" color={'error'} />
            </Grid>
          </Grid.Container>
        ) : (
          <Grid.Container
            gap={1}
            justify="flex-start"
            css={{
              overflow: 'auto',
              '@xs': { marginTop: '.5rem' },
            }}
          >
            {users.map((user) => (
              <>
                <Grid
                  xs={6}
                  lg={3}
                  xl={3}
                  md={3}
                  sm={3}
                  key={user}
                  css={{ cursor: 'pointer' }}
                >
                  <Card
                    css={{
                      borderColor: 'red',
                      borderWidth: 'thin',
                    }}
                    isHoverable
                    isPressable
                    variant="bordered"
                    onPress={() => handler(user)}
                  >
                    <Card.Body
                      css={{
                        height: 'auto',
                        backgroundColor: '$backgroundAlpha',
                        justifyContent: 'center',
                      }}
                    >
                      <Row>
                        <Col align="center">
                          <Text
                            h3
                            css={{
                              color: '$gray600',
                              fontWeight: '$bold',
                            }}
                          >
                            {user.name}
                          </Text>
                          <Text
                            h4
                            css={{
                              color: '$blue500',
                            }}
                          >
                            {user.email}
                          </Text>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer
                      isBlurred
                      css={{
                        // position: 'absolute',
                        // bgBlur: 'rgba(0,0,0,0.5)',
                        // borderTop:
                        //   '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
                        bottom: 0,
                        zIndex: 1,
                      }}
                    >
                      <Row align="center" justify="center">
                        <Button auto shadow size="md" color="error">
                          Delete
                        </Button>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Grid>
                <Modal
                  noPadding
                  blur
                  animated
                  autoMargin
                  open={visible}
                  onClose={closeHandler}
                >
                  <Modal.Body>
                    <Card
                      css={{
                        borderColor: 'red',
                        borderWidth: 'thin',
                      }}
                      variant="bordered"
                      onPress={handler}
                    >
                      <Card.Body css={{ p: 0 }} autoMargin>
                        <form onSubmit={handleSubmit(submitHandler)}>
                          <Card.Header>
                            <Text h1 color={'Red'} css={{ margin: '0 auto' }}>
                              User Details
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
                                render={({ field }) => (
                                  <TextField
                                    variant="outlined"
                                    disabled
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    inputProps={{
                                      type: 'text',
                                      readOnly: true,
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
                                render={({ field }) => (
                                  <TextField
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                    id="email"
                                    label="Email"
                                    inputProps={{
                                      type: 'email',
                                      readOnly: true,
                                    }}
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
                                name="isAdmin"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <>
                                    <Row align="center" justify="center">
                                      <Switch
                                        id="isAdmin"
                                        size="xl"
                                        css={{
                                          color: '$accents9',
                                          '& .nextui-c-itiWTf-bDUxer-checked-true':
                                            {
                                              background:
                                                'rgb(255,0,0,1) !important',
                                            },
                                        }}
                                        checked={value}
                                        onChange={(e) =>
                                          onChange(e.target.checked)
                                        }
                                      />
                                      <Spacer x={0.5} />
                                      <Text
                                        h4
                                        css={{
                                          marginTop: '$6',
                                          color: '$accents7',
                                        }}
                                      >
                                        isAdmin
                                      </Text>
                                    </Row>
                                  </>
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
                      </Card.Body>
                    </Card>
                  </Modal.Body>
                </Modal>
              </>
            ))}
          </Grid.Container>
        )}
      </Grid>
    </Grid.Container>
  );
};

export default UserList;

export const getServerSideProps = async () => {
  const userList = await User.find({}).lean();

  return { props: { users: toJson(userList) } };
};
