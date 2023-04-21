import {
  Button,
  Card,
  Col,
  Grid,
  Image,
  Row,
  Spacer,
  Text,
} from '@nextui-org/react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { moneyFormat } from 'utils/functions';
import SizeSection from 'components/product/size_section';
import QuantityButton from 'components/product/quantity_button';
import { useSnackbar } from 'notistack';
import { ShoppingCart } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { cartAddItem } from 'store/reducers/user.reducer';
import ModalProductImage from './component/modal.product.image';
import { setSingleProduct } from 'store/reducers/product.reducer';
import { sizeDataList } from 'database/data';

const ProductDetails = () => {
  const router = useRouter();
  const [itemCount, setItemCount] = useState(1);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const [selectedSize, setSelectedSize] = useState();
  const [isPressed, setIsPressed] = useState(false);
  const [sizeList] = useState(sizeDataList);
  const { enqueueSnackbar } = useSnackbar();
  const [visible, setVisible] = useState(false);

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (Object.keys(router.query).length !== 0) {
      if (product._id !== router.query.id)
        dispatch(setSingleProduct(JSON.parse(router.query.product)));
    }
  }, [dispatch, product, router.query, router.query.id, router.query.product]);

  const _colorSetByCategoryType = (categoryType) => {
    switch (categoryType) {
      case 'Boys':
        return '$blue500';
      case 'Girls':
        return '$pink500';
      default:
        return '$green600';
    }
  };

  const _addToCart = async (product) => {
    if (product.category !== 'Food') {
      if (!selectedSize) {
        enqueueSnackbar('Please select size', {
          variant: 'error',
        });
        return;
      }
      const item = {
        product,
        itemCount,
        selectedSize,
        subTotal: product.price * itemCount,
      };
      dispatch(cartAddItem({ item, router }));
      enqueueSnackbar(`${product.name} added to cart!`, {
        variant: 'success',
      });
    } else {
      const item = {
        product,
        itemCount,
        subTotal: product.price * itemCount,
      };
      dispatch(cartAddItem({ item, router }));
      enqueueSnackbar(`${product.name} added to cart!`, {
        variant: 'success',
      });
    }
    setItemCount(1);
    setSelectedSize(null);
  };

  return (
    <>
      <Spacer y={0.5} />
      <Col span={12} css={{ '@xs': { marginLeft: '7.84%' } }}>
        <Button
          auto
          size={'md'}
          color={'error'}
          onPress={() => router.push('/', undefined, { shallow: true })}
          icon={
            <ArrowBackIosIcon
              style={{
                color: 'white',
                fontSize: '1.5rem',
              }}
            />
          }
          css={{
            marginLeft: '$6',
            '&:hover': {
              transform: 'translateY(-5px)',
              '&:after': {
                transform: 'scaleX(1.5) scaleY(1.6)',
                opacity: 0,
              },
            },
          }}
        >
          <Text
            h5
            css={{ margin: '0 auto', zIndex: -1 }}
            color={'white'}
            weight="medium"
            size="$lg"
          >
            Back
          </Text>
        </Button>
      </Col>
      <Grid.Container gap={1}>
        <Grid xs={0} lg={1}></Grid>
        <Grid xs={12} lg={5}>
          <Card
            css={{
              height: '70vh',
              borderColor: 'red',
              borderWidth: 'medium',
              '@xs': { height: '80vh' },
            }}
            isPressable
            variant="bordered"
            onPress={handler}
          >
            <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
              <Col>
                <Text css={{ fontWeight: '$medium', color: '$gray100' }}>
                  {product.name}
                </Text>
              </Col>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
              <Image
                priority
                src={product.image}
                height="100%"
                width="100%"
                objectFit="cover"
                alt={product.name}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} lg={5}>
          <Grid.Container gap={1} alignContent="space-around">
            <Grid xs={12} lg={12}>
              <Text
                h1
                css={{
                  fontFamily: 'Ubuntu',
                  fontWeight: '$medium',
                  color: '$gray800',
                }}
              >
                {product.name}
              </Text>
            </Grid>
            <Grid xs={12} lg={12}>
              <Text
                h3
                css={{
                  fontFamily: 'Ubuntu',
                  fontWeight: '$medium',
                  color: '$gray700',
                  lineHeight: '$lg',
                  letterSpacing: '$wide',
                }}
                color="gray"
              >
                {product.description}
              </Text>
            </Grid>
            <Grid xs={12} lg={12}>
              <Text
                h2
                css={{
                  fontFamily: 'Ubuntu',
                  fontWeight: '$medium',
                  color: 'orange',
                }}
                color="gray"
              >
                {moneyFormat(product.price)}
              </Text>
            </Grid>
            <Grid xs={12} sm={12} lg={12} md={12} xl={12}>
              <Row
                css={{
                  justifyContent: 'space-between',
                  justifyItems: 'center',
                }}
              >
                <Text
                  h4
                  css={{
                    fontFamily: 'Ubuntu',
                    fontWeight: '$normal',
                    color: '$gray600',
                  }}
                >
                  Category:
                </Text>
                <Text
                  h3
                  css={{
                    fontFamily: 'Ubuntu',
                    fontWeight: '$medium',
                    color: _colorSetByCategoryType(product.category),
                  }}
                  color="gray"
                >
                  {product.category}
                </Text>
              </Row>
              <Spacer x={1} />
            </Grid>
            <Grid xs={12} sm={12} lg={12} md={12} xl={12}>
              <Text
                h4
                css={{
                  fontFamily: 'Ubuntu',
                  fontWeight: '$normal',
                  color: '$gray600',
                  textAlign: 'center',
                }}
                color="gray"
              >
                Type:
              </Text>
              <Text
                h3
                css={{
                  fontFamily: 'Ubuntu',
                  fontWeight: '$medium',
                  color: _colorSetByCategoryType(product.category),
                }}
                color="gray"
              >
                {product.type}
              </Text>
            </Grid>
            {product.category !== 'Food' && (
              <SizeSection
                setItemCount={setItemCount}
                sizeList={sizeList}
                selectedSize={selectedSize}
                isPressed={isPressed}
                setIsPressed={setIsPressed}
                setSelectedSize={setSelectedSize}
              />
            )}
            <Grid xs={12} lg={12}>
              <Row
                css={{ w: '100vw' }}
                align="center"
                justify="space-between"
                alignContent="space-between"
              >
                <Text
                  h4
                  css={{
                    fontFamily: 'Ubuntu',
                    fontWeight: '$normal',
                    color: '$gray600',
                  }}
                >
                  Quantity:
                </Text>
                <QuantityButton
                  product={product}
                  itemCount={itemCount}
                  incrementItem={() => {
                    product.category == 'Food'
                      ? setItemCount(itemCount + 1)
                      : selectedSize
                      ? setItemCount(itemCount + 1)
                      : enqueueSnackbar('Please select size', {
                          variant: 'error',
                        });
                  }}
                  decrementItem={() => {
                    product.category == 'Food'
                      ? setItemCount(itemCount > 1 ? itemCount - 1 : 1)
                      : selectedSize
                      ? setItemCount(itemCount > 1 ? itemCount - 1 : 1)
                      : enqueueSnackbar('Please select size', {
                          variant: 'error',
                        });
                  }}
                />
              </Row>
            </Grid>
            <Spacer y={4} />
            <Grid xs={12} lg={12}>
              <Row
                css={{
                  justifyContent: 'space-between',
                  justifyItems: 'center',
                }}
              >
                <Text
                  h2
                  css={{
                    fontFamily: 'Ubuntu',
                    fontWeight: '$normal',
                    color: '$gray600',
                  }}
                >
                  Total:
                </Text>

                <Text
                  h2
                  css={{
                    fontFamily: 'Ubuntu',
                    fontWeight: '$medium',
                    color: 'orange',
                  }}
                >
                  {moneyFormat(
                    itemCount == 0 ? product.price : product.price * itemCount
                  )}
                </Text>
              </Row>
            </Grid>
            <Grid xs={12} lg={12}>
              <Row
                css={{
                  justifyContent: 'flex-end',
                  justifyItems: 'center',
                }}
              >
                <Button
                  auto
                  size="lg"
                  type="button"
                  onPress={() => _addToCart(product)}
                  css={{
                    backgroundColor: 'Orange',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      '&:after': {
                        transform: 'scaleX(1.5) scaleY(1.6)',
                        opacity: 0,
                      },
                    },
                  }}
                  icon={<ShoppingCart fill="currentColor" />}
                >
                  Add to Cart
                </Button>
              </Row>
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid xs={0} lg={1}></Grid>
      </Grid.Container>
      <Spacer y={1.5} />
      <ModalProductImage
        visible={visible}
        closeHandler={closeHandler}
        handler={handler}
        product={product}
      />
    </>
  );
};

export default ProductDetails;
