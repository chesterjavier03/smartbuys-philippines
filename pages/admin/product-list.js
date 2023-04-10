import { TextField } from '@mui/material';
import {
  Button,
  Card,
  Col,
  Container,
  Grid,
  Image,
  Loading,
  Modal,
  Row,
  Spacer,
  Text,
} from '@nextui-org/react';
import axios from 'axios';
import db from 'database/db';
import Product from 'models/product';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toJson } from 'utils/functions';
import AdminLeftPanelMenu from './component/admin.left.panel.menu';

const ProductList = ({ products }) => {
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

  const handler = (product) => {
    setVisible(true);
    setValue('productName', product?.name);
    setValue('productDescription', product?.email);
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
      axios.put('/api/admin/product/update-product', values, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      enqueueSnackbar('Product successfully updated!', { variant: 'success' });
      setVisible(false);
      router.push('/admin/product-list');
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
                  >
                    Add New Product
                  </Button>
                </Container>
              </Card>
              <Spacer y={0.5} />
              <Grid.Container
                gap={1}
                justify="flex-start"
                css={{
                  overflow: 'auto',
                  maxHeight: '100%',
                  height: '79.5vh',
                  paddingBottom: '27rem',
                  '@xs': {
                    paddingBottom: '1rem',
                  },
                }}
              >
                {products &&
                  products.map((product) => (
                    <Grid
                      xs={6}
                      lg={3}
                      xl={3}
                      md={3}
                      sm={3}
                      key={product._id}
                      css={{ cursor: 'pointer' }}
                    >
                      <Card
                        css={{
                          w: '100%',
                          h: '380px',
                          borderColor: 'red',
                          borderWidth: 'thin',
                        }}
                        isHoverable
                        isPressable
                        variant="bordered"
                        onPress={() => handler(product._id)}
                      >
                        <Card.Header
                          css={{ position: 'absolute', zIndex: 1, top: 5 }}
                        >
                          <Col>
                            <Text
                              css={{ fontWeight: '$medium', color: '$gray100' }}
                            >
                              {product.name}
                            </Text>
                          </Col>
                        </Card.Header>
                        <Card.Body
                          css={{ p: 0, backgroundColor: 'transparent' }}
                        >
                          <Image
                            maxDelay="1000"
                            // src={`data:image/webp;base64, ` + product.image}
                            src={product.image}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            alt={product.name}
                            css={{ backgroundColor: 'transparent' }}
                            onClick={() => {
                              // handleItemDetails(product);
                            }}
                          />
                        </Card.Body>
                        <Card.Footer
                          isBlurred
                          css={{
                            position: 'absolute',
                            bgBlur: 'rgba(0,0,0,0.3)',
                            borderTop:
                              '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
                            bottom: 0,
                            zIndex: 1,
                          }}
                        >
                          <Row>
                            <Button
                              variant="contained"
                              auto
                              size={'md'}
                              ripple
                              animated
                              type="submit"
                              css={{
                                margin: '0 auto',
                                backgroundColor: '$blue600',
                                color: 'White',
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              auto
                              color="primary"
                              size={'md'}
                              ripple
                              animated
                              type="submit"
                              css={{
                                margin: '0 auto',
                                backgroundColor: 'Red',
                                color: 'White',
                              }}
                            >
                              Delete
                            </Button>
                          </Row>
                        </Card.Footer>
                      </Card>
                    </Grid>
                  ))}
              </Grid.Container>
            </Col>
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
        )}
      </Grid>
    </Grid.Container>
  );
};

export default ProductList;

export const getServerSideProps = async () => {
  await db.connect();
  // const productList = await Product.find({}).lean();
  const productList = await Product.aggregate([{ $sample: { size: 2000 } }]);
  await db.disconnect();

  return { props: { products: toJson(productList) } };
};
