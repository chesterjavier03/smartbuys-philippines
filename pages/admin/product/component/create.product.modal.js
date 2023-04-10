import { TextField } from '@mui/material';
import {
  Button,
  Card,
  Col,
  Grid,
  Image,
  Loading,
  Modal,
  Spacer,
  Text,
} from '@nextui-org/react';
import { Button as Buttn } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

const CreateProductModal = ({
  newProductVisible,
  closeNewProductHandler,
  newProductHandler,
  handleSubmit,
  control,
  errors,
  imageSet,
  setImageSet,
  setImageFile,
}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isLoading] = useState(false);

  useEffect(() => {}, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    // const bodyFormData = new FormData();
    // bodyFormData.append('file', file);
    const result = await convertToBase64(file);
    setImageFile(file);
    setImageSet(result.split(',')[1]);
    // bodyFormData.append('base64', result.split(',')[1]);
    try {
      closeSnackbar();
      // const values = {
      //   name,
      //   category: req.body.category,
      //   type: req.body.type,
      //   image: req.body.image,
      //   price: req.body.price,
      //   description: req.body.description,
      //   name,
      //   email,
      //   password,
      // };
      // dispatch(craeteNewProduct({ values, router }));
      // await axios.post('/api/admin/create-product', bodyFormData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     authorization: `Bearer ${userInfo.token}`,
      //   },
      // });
      // dispatch({ type: 'UPLOAD_REQUEST' });
      // await axios.post('/api/admin/upload', bodyFormData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     authorization: `Bearer ${userInfo.token}`,
      //   },
      // });
      // dispatch({ type: 'UPLOAD_SUCCESS' });
      // setValue('productImage', result.split(',')[1]);
    } catch (error) {
      // errorHelper(dispatch, error, enqueueSnackbar);
      console.log('ERROR');
      enqueueSnackbar(error, { variant: 'error' });
    }
  };
  return (
    <Modal
      blur
      width="55vw"
      noPadding
      animated
      autoMargin
      open={newProductVisible}
      onClose={closeNewProductHandler}
    >
      <Modal.Body>
        <Card
          css={{
            borderColor: 'red',
            borderWidth: 'thin',
          }}
          variant="bordered"
          onPress={newProductHandler}
        >
          <Card.Body css={{ p: 0 }} autoMargin>
            <form onSubmit={handleSubmit}>
              <Grid
                justify="center"
                align="center"
                xl
                css={{ paddingTop: '2rem' }}
              >
                <Text h1 color={'Red'} css={{ margin: '0 auto' }}>
                  Create New Product
                </Text>
              </Grid>
              <Card.Body>
                <Grid.Container>
                  <Grid lg={3} md={3} xl={3} sm={12} xs={12}>
                    <Grid.Container justify="center">
                      <Grid>
                        <>
                          <Image
                            src={
                              !imageSet
                                ? '/static/smartbuys_wings.webp'
                                : `data:image/webp;base64, ` + imageSet
                            }
                            style={{
                              // border: '1.5px solid red',
                              borderRadius: '.5rem',
                              backgroundColor: 'transparent',
                            }}
                            width="100%"
                            objectFit="cover"
                            alt=""
                            maxDelay="1000"
                            onClick={() => {
                              // handleItemDetails(product);
                            }}
                          />
                          <Spacer y={1} />
                        </>
                      </Grid>
                      <Grid>
                        <Buttn
                          auto
                          variant="contained"
                          component="label"
                          size="large"
                          style={{
                            textTransform: 'capitalize',
                            margin: '0 auto',
                          }}
                        >
                          Upload Image
                          <input type="file" onChange={uploadHandler} hidden />
                        </Buttn>
                      </Grid>
                      {isLoading && <Loading />}
                    </Grid.Container>
                  </Grid>
                  <Spacer x={1} />
                  <Grid xl={8} lg={8} md={8} xs={12} sm={12}>
                    <Grid.Container gap={2}>
                      <Col>
                        <Grid css={{}}>
                          <Controller
                            name="newProductName"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="newProductName"
                                label="New Product Name"
                                inputProps={{
                                  type: 'text',
                                }}
                                error={Boolean(errors.newProductName)}
                                helperText={
                                  errors.newProductName
                                    ? errors.newProductName.type === 'minLength'
                                      ? 'Product name length is more than 5'
                                      : 'Product name is required'
                                    : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          />
                        </Grid>
                        <Grid>
                          <Controller
                            name="newProductDescription"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="newProductDescription"
                                label="New Product Description"
                                inputProps={{
                                  type: 'text',
                                }}
                                error={Boolean(errors.newProductDescription)}
                                helperText={
                                  errors.newProductDescription
                                    ? errors.newProductDescription.type ===
                                      'minLength'
                                      ? 'Product description length is more than 7'
                                      : 'Product description is required'
                                    : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          />
                        </Grid>
                        <Grid>
                          <Controller
                            name="newProductCategory"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="newProductCategory"
                                label="New Product Category"
                                inputProps={{
                                  type: 'text',
                                }}
                                error={Boolean(errors.newProductCategory)}
                                helperText={
                                  errors.newProductCategory
                                    ? errors.newProductCategory.type ===
                                      'minLength'
                                      ? 'Product Category length is more than 7'
                                      : 'Product Category is required'
                                    : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          />
                        </Grid>
                        <Grid css={{}}>
                          <Controller
                            name="newProductPrice"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="newProductPrice"
                                label="New Product Price"
                                inputProps={{
                                  type: 'text',
                                }}
                                error={Boolean(errors.newProductPrice)}
                                helperText={
                                  errors.newProductPrice
                                    ? errors.newProductPrice.type ===
                                      'minLength'
                                      ? 'Product Price length is more than 7'
                                      : 'Product Price is required'
                                    : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          />
                        </Grid>
                        <Grid css={{}}>
                          <Controller
                            name="newProductType"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="newProductType"
                                label="New Product Type"
                                inputProps={{
                                  type: 'text',
                                }}
                                error={Boolean(errors.newProductType)}
                                helperText={
                                  errors.newProductType
                                    ? errors.newProductType.type === 'minLength'
                                      ? 'Product Type length is more than 7'
                                      : 'Product Type is required'
                                    : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          />
                        </Grid>
                      </Col>
                    </Grid.Container>
                  </Grid>
                </Grid.Container>
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
                      Create
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
  );
};

export default CreateProductModal;
