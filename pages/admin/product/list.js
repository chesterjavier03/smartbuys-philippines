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
} from '@nextui-org/react';
import Filter from 'components/filter';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminDeleteProduct,
  adminFetchProductList,
  adminFilterProductListByCategory,
  adminFilterProductListByType,
} from 'store/actions/admin.actions';
import { createNewProduct, updateProduct } from 'store/actions/product.actions';
import {
  adminAddProduct,
  adminRemoveProduct,
} from 'store/reducers/admin.reducer';
import AdminLeftPanelMenu from '../component/admin.left.panel.menu';
import CreateProductModal from './component/create.product.modal';
import EditProductModal from './component/edit.product.modal';

const ProductList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const userToken = userInfo.token;
  const adminLoading = useSelector((state) => state.admin.loading);
  const productList = useSelector((state) => state.admin.products);
  const [visible, setVisible] = useState(false);
  const [newProductVisible, setNewProductVisible] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [imageSet, setImageSet] = useState('');
  const [imageFile, setImageFile] = useState('');
  const categoryList = ['Girls', 'Boys', 'Food'];
  const typeList = ['Shirt', 'Jogger', 'Dress', 'Sando', 'Terno', 'Shorts'];
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      router.push('/', undefined, { shallow: 'true' });
    }
    dispatch(adminFetchProductList(userToken));
  }, []);

  const handler = (product) => {
    setVisible(true);
    setValue('productId', product._id);
    setValue('productName', product.name);
    setValue('productDescription', product.description);
    setValue('productCategory', product.category);
    setValue('productImage', product.image);
    setValue('productPrice', product.price);
    setValue('productType', product.type);
    setImageSet(product.image);
  };

  const newProductHandler = () => {
    setNewProductVisible(true);
    setImageSet(null);
  };

  const closeNewProductHandler = () => {
    setNewProductVisible(false);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const submitCreateNewProductHandler = async () => {
    closeSnackbar();
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('name', getValues('newProductName'));
      formData.append('category', getValues('newProductCategory'));
      formData.append('type', getValues('newProductType'));
      formData.append('price', getValues('newProductPrice'));
      formData.append('description', getValues('newProductDescription'));
      const userToken = userInfo.token;
      dispatch(createNewProduct({ formData, userToken }));
      dispatch(adminAddProduct(formData));
      setVisible(false);
      closeNewProductHandler();
      reset();
      router.push('/admin/product/list');
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const submitEditProductHandler = async () => {
    closeSnackbar();
    try {
      const formData = new FormData();
      formData.append('_id', getValues('productId'));
      if (imageFile.trim().length !== 0 || imageFile.trim() !== '') {
        formData.append('file', imageFile);
      }
      formData.append('name', getValues('productName'));
      formData.append('category', getValues('productCategory'));
      formData.append('type', getValues('productType'));
      formData.append('price', getValues('productPrice'));
      formData.append('description', getValues('productDescription'));
      const userToken = userInfo.token;
      dispatch(updateProduct({ formData, userToken }));
      setVisible(false);
      closeNewProductHandler();
      reset();
      router.push('/admin/product/list');
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const deleteProductHandler = async (product) => {
    closeSnackbar();
    try {
      const productName = product.name;
      dispatch(adminDeleteProduct({ productName, userToken }));
      dispatch(adminRemoveProduct(product));
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const filterByType = async (type) => {
    dispatch(adminFilterProductListByType({ type, userToken }));
  };

  const filterByCategory = async (category) => {
    dispatch(adminFilterProductListByCategory({ category, userToken }));
  };

  const fetchAll = async () => {
    dispatch(adminFetchProductList(userToken));
  };

  return (
    <Grid.Container gap={1}>
      <Grid lg={3} md={3} xl={3} sm={3} xs={12}>
        <Col>
          <AdminLeftPanelMenu />
          {router.pathname === '/admin/product/list' && (
            <Grid.Container
              xs={0}
              lg={12}
              md={12}
              xl={12}
              sm={12}
              align="flex-start"
              justify="flex-start"
              alignContent="flex-start"
              css={{
                '@xs': {},
              }}
            >
              <Card
                css={{
                  backgroundColor: '$backgroundAlpha',
                  border: '1px solid red',
                }}
                isHoverable
                variant="shadow"
                borderWeight="bold"
              >
                <Filter
                  darkMode={false}
                  filterByCategory={filterByCategory}
                  categoryList={categoryList}
                  typeList={typeList}
                  filterByType={filterByType}
                  setIsPressed={setIsPressed}
                  fetchAll={fetchAll}
                  isPressed={isPressed}
                />
              </Card>
            </Grid.Container>
          )}
        </Col>
      </Grid>
      <Grid xl={9} lg={9} md={9} xs={12} sm={9}>
        {adminLoading ? (
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
            <Col css={{ paddingTop: '.5rem' }}>
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
                    onPress={newProductHandler}
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
                {productList &&
                  productList.map((product) => (
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
                          <Card.Image
                            maxDelay="1000"
                            src={`data:image/webp;base64, ` + product.image}
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
                              onPress={() => handler(product)}
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
                              onPress={() => deleteProductHandler(product)}
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
            <EditProductModal
              visible={visible}
              closeHandler={closeHandler}
              handler={handler}
              handleSubmit={handleSubmit(submitEditProductHandler)}
              control={control}
              errors={errors}
              setValue={setValue}
              imageSet={imageSet}
              setImageSet={setImageSet}
              setImageFile={setImageFile}
            />
            <CreateProductModal
              newProductVisible={newProductVisible}
              closeNewProductHandler={closeNewProductHandler}
              newProductHandler={newProductHandler}
              handleSubmit={handleSubmit(submitCreateNewProductHandler)}
              control={control}
              errors={errors}
              setValue={setValue}
              imageSet={imageSet}
              setImageSet={setImageSet}
              setImageFile={setImageFile}
            />
          </>
        )}
      </Grid>
    </Grid.Container>
  );
};

export default ProductList;

// export const getServerSideProps = async () => {
//   await db.connect();
//   const productList = await Product.find({}).lean();
//   await db.disconnect();

//   return { props: { products: toJson(productList) } };
// };
