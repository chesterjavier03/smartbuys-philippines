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
  Spacer,
  Text,
} from '@nextui-org/react';
import { Button as Buttn } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

const EditProductModal = ({
  visible,
  closeHandler,
  handler,
  handleSubmit,
  control,
  errors,
  setValue,
  imageSet,
  setImageSet,
  setImageFile,
}) => {
  const { enqueueSnackbar } = useSnackbar();
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
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    const result = await convertToBase64(file);
    setImageFile(file);
    setImageSet(result.split(',')[1]);
    bodyFormData.append('base64', result.split(',')[1]);
    try {
      // dispatch({ type: 'UPLOAD_REQUEST' });
      // await axios.post('/api/admin/upload', bodyFormData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     authorization: `Bearer ${userInfo.token}`,
      //   },
      // });
      // dispatch({ type: 'UPLOAD_SUCCESS' });
      setValue('productImage', result.split(',')[1]);
    } catch (error) {
      // errorHelper(dispatch, error, enqueueSnackbar);
      console.log('ERROR');
      enqueueSnackbar(error, { variant: 'error' });
    }
  };
  return (
    <Modal
      blur
      width="66vw"
      fullWidth="true"
      noPadding="true"
      justify="center"
      animated="true"
      autoMargin="true"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Body>
        <Card
          justify="center"
          css={{
            borderColor: 'red',
            borderWidth: 'thin',
          }}
          variant="bordered"
          onPress={handler}
        >
          <Card.Body css={{ p: 0 }} autoMargin>
            <form onSubmit={handleSubmit}>
              <Container
                justify="center"
                display="flex"
                fluid
                responsive
                alignItems="center"
              >
                <Text
                  h1
                  color={'Red'}
                  css={{
                    margin: '0 auto',
                    fontSize: '2.5rem',
                    '@xs': { fontSize: '3rem' },
                  }}
                >
                  Edit Product
                </Text>
              </Container>
              <Card.Body>
                <Grid.Container>
                  <Grid lg={3} md={3} xl={3} sm={12} xs={12}>
                    <Grid.Container justify="center">
                      <Grid>
                        {imageSet && (
                          <>
                            <Image
                              // src={`data:image/webp;base64, ` + imageSet}
                              src={imageSet}
                              style={{
                                // border: '1.5px solid red',
                                borderRadius: '.5rem',
                              }}
                              width="100%"
                              objectFit="cover"
                              alt=""
                              css={{ backgroundColor: 'transparent' }}
                              maxDelay="1000"
                              onClick={() => {
                                // handleItemDetails(product);
                              }}
                            />
                            <Spacer y={1} />
                          </>
                        )}
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
                          Upload / Replace Image
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
                            name="productName"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="productName"
                                label="Product Name"
                                inputProps={{
                                  type: 'text',
                                }}
                                error={Boolean(errors.productName)}
                                helperText={
                                  errors.productName
                                    ? errors.productName.type === 'minLength'
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
                            name="productDescription"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="productDescription"
                                label="Product Description"
                                inputProps={{
                                  type: 'text',
                                }}
                                error={Boolean(errors.productDescription)}
                                helperText={
                                  errors.productDescription
                                    ? errors.productDescription.type ===
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
                            name="productCategory"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="productCategory"
                                label="Product Category"
                                inputProps={{
                                  type: 'text',
                                }}
                                error={Boolean(errors.productCategory)}
                                helperText={
                                  errors.productCategory
                                    ? errors.productCategory.type ===
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
                            name="productPrice"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="productPrice"
                                label="Product Price"
                                inputProps={{
                                  type: 'text',
                                }}
                                error={Boolean(errors.productPrice)}
                                helperText={
                                  errors.productPrice
                                    ? errors.productPrice.type === 'minLength'
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
                            name="productType"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="productType"
                                label="Product Type"
                                inputProps={{
                                  type: 'text',
                                }}
                                error={Boolean(errors.productType)}
                                helperText={
                                  errors.productType
                                    ? errors.productType.type === 'minLength'
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
  );
};

export default EditProductModal;
