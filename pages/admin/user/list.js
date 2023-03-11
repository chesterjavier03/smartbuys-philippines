import {
  Button,
  Card,
  Col,
  Container,
  Grid,
  Loading,
  Row,
  Spacer,
  Text,
  Tooltip,
} from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AdminLeftPanelMenu from '../component/admin.left.panel.menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditUserModal from './component/edit-user';
import CreateUserModal from './component/create-user';
import {
  errorGlobal,
  successGlobal,
} from 'store/reducers/notifications.reducer';
import { adminFetchUserList } from 'store/actions/admin.actions';
import { adminAddUser, adminRemoveUser } from 'store/reducers/admin.reducer';

const UserList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const loading = useSelector((state) => state.user.loading);
  const userList = useSelector((state) => state.admin.users);
  const [visibleEditUserModal, setVisibleEditUserModal] = useState(false);
  const [visibleCreateUserModal, setVisibleCreateUserModal] = useState(false);
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const editUserModalhandler = (user) => {
    setVisibleEditUserModal(true);
    setValue('name', user?.name);
    setValue('email', user?.email);
    setValue('isAdmin', user?.isAdmin);
  };

  const createUserModalhandler = () => {
    setVisibleCreateUserModal(true);
  };

  const closeEditUserModalHandler = () => {
    setVisibleEditUserModal(false);
  };

  const closeCreateUserModalHandler = () => {
    setVisibleCreateUserModal(false);
  };

  useEffect(() => {
    if (!userInfo) {
      router.push('/', undefined, { shallow: 'true' });
    }
    dispatch(adminFetchUserList(userInfo.token));
  }, []);

  const editUserModalSubmitHandler = async ({ email, isAdmin }) => {
    closeSnackbar();
    try {
      const values = {
        email,
        isAdmin,
      };
      await axios.put('/api/admin/user/update-user', values, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      enqueueSnackbar('Profile successfully updated!', { variant: 'success' });
      setVisibleEditUserModal(false);
      router.push('/admin/user/list', undefined, { shallow: 'true' });
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const deleteUserHandler = async (user) => {
    closeSnackbar();
    try {
      const { data } = await axios.delete(
        `/api/admin/user/delete-user/${user.email}`,
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch(successGlobal(data.message));
      dispatch(adminRemoveUser(user));
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const createUserModalSubmitHandler = async ({
    newUserName,
    newUserEmail,
    newUserPassword,
    newUserConfirmPassword,
    newUserIsAdmin,
  }) => {
    closeSnackbar();
    try {
      if (newUserPassword !== newUserConfirmPassword) {
        enqueueSnackbar("Password don't match", { variant: 'error' });
        return;
      }
      const values = {
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
        isAdmin: newUserIsAdmin,
      };
      const { data } = await axios.post('/api/admin/user/create-user', values, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch(successGlobal(data.message));
      dispatch(adminAddUser(values));
      reset();
      setVisibleCreateUserModal(false);
    } catch (error) {
      reset();
      setVisibleCreateUserModal(false);
      dispatch(errorGlobal(error.response.data.message));
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
          <>
            <Col css={{ paddingTop: '1.3rem' }}>
              <Card
                css={{
                  border: '1px solid red',
                  borderRadius: '$xs',
                  backgroundColor: 'transparent',
                  height: '8vh',
                  justifyContent: 'center',
                }}
              >
                <Container
                  justify="center"
                  css={{
                    display: 'flex',
                    margin: '0 auto',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    auto
                    color={'error'}
                    size={'lg'}
                    css={{ borderRadius: '$xs' }}
                    onPress={() => createUserModalhandler()}
                  >
                    Create New User
                  </Button>
                </Container>
              </Card>
              <Spacer y={0.5} />
              <Grid.Container
                gap={1}
                justify="flex-start"
                css={{
                  overflow: 'auto',
                  '@xs': { marginTop: '.5rem' },
                }}
              >
                {userList.map((user) => (
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
                        onPress={() => editUserModalhandler(user)}
                      >
                        <Card.Body
                          css={{
                            height: 'auto',
                            backgroundColor: '$backgroundAlpha',
                            justifyContent: 'center',
                            align: 'center',
                          }}
                        >
                          <Grid justify="center" align="center">
                            <Text
                              css={{
                                color: '$gray600',
                                fontWeight: '$bold',
                                width: user.name > 10 ? '80vw' : 'fit-content',
                                fontSize: user.name.length > 15 ? '$lg' : '$xl',
                              }}
                            >
                              {user.name}
                            </Text>
                          </Grid>
                          <Grid justify="center" align="center">
                            <Text
                              h5
                              css={{
                                color: '$blue500',
                              }}
                            >
                              {user.email}
                            </Text>
                          </Grid>
                          <Grid justify="center" align="center">
                            <Tooltip
                              content={user.isAdmin ? 'Admin' : 'User'}
                              color={user.isAdmin ? 'warning' : 'success'}
                            >
                              {user.isAdmin ? (
                                <AdminPanelSettingsIcon
                                  style={{ color: 'orange', fontSize: '2rem' }}
                                />
                              ) : (
                                <AccountCircleIcon
                                  style={{
                                    color: 'LimeGreen',
                                    fontSize: '2rem',
                                  }}
                                />
                              )}
                            </Tooltip>
                          </Grid>
                        </Card.Body>
                        <Card.Footer
                          isBlurred
                          css={{
                            // position: 'absolute',
                            bgBlur: 'rgba(0,0,0,0.3)',
                            // borderTop:
                            // '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
                            bottom: 0,
                            zIndex: 1,
                          }}
                        >
                          <Row align="center" justify="center">
                            <Button
                              auto
                              size="md"
                              color="error"
                              onPress={() => deleteUserHandler(user)}
                            >
                              Delete
                            </Button>
                          </Row>
                        </Card.Footer>
                      </Card>
                    </Grid>
                  </>
                ))}
              </Grid.Container>
            </Col>
            <CreateUserModal
              visible={visibleCreateUserModal}
              closeHandler={closeCreateUserModalHandler}
              handler={createUserModalhandler}
              handleSubmit={handleSubmit}
              submitHandler={createUserModalSubmitHandler}
              control={control}
              errors={errors}
            />
            <EditUserModal
              visible={visibleEditUserModal}
              closeHandler={closeEditUserModalHandler}
              handler={editUserModalhandler}
              handleSubmit={handleSubmit}
              submitHandler={editUserModalSubmitHandler}
              control={control}
              errors={errors}
            />
          </>
        )}
      </Grid>
    </Grid.Container>
  );
};

export default UserList;

// export const getServerSideProps = async () => {
//   await db.connect();
//   const userList = await User.find({}).lean();
//   await db.disconnect();

//   return { props: { users: toJson(userList) } };
// };
