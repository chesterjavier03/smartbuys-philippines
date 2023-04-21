import { Card, Col, Grid, Loading, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSnackbar } from 'notistack';
import Filter from 'components/filter';
import { useDispatch, useSelector } from 'react-redux';
import { cartAddItem } from 'store/reducers/user.reducer';
import { moneyFormat } from 'utils/functions';
import MobileFilterView from 'components/mobile-filterview';

const Shop = ({ products }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.user.darkMode);
  const loading = useSelector((state) => state.user.loading);
  const [productList, setProductList] = useState(products);
  const [isLoading, setIsLoading] = useState(loading);
  const [isPressed, setIsPressed] = useState(false);
  const categoryList = ['Girls', 'Boys', 'Food'];
  const typeList = ['Shirt', 'Jogger', 'Dress', 'Sando', 'Terno', 'Shorts'];
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setProductList(products);
  }, [dispatch, products]);

  const handleItemDetails = (product) => {
    router.push(
      {
        pathname: `/product/${product._id}`,
        query: { product: JSON.stringify(product) },
      },
      `/product/${product._id}`
    );
  };

  const filterByType = async (type) => {
    setIsLoading(true);
    await fetchAll();
    setIsLoading(true);
    setTimeout(function () {
      setProductList(products);
      let filtered = products;
      const result = filtered.filter((item) =>
        item.type === type ? true : false
      );
      setIsLoading(false);
      setProductList(result);
    }, 10);
  };

  const filterByCategory = async (category) => {
    await fetchAll();
    setIsLoading(true);
    setTimeout(function () {
      setProductList(products);
      let filtered = products;
      const result = filtered.filter((item) =>
        item.category === category ? true : false
      );
      setIsLoading(false);
      setProductList(result);
    }, 10);
  };

  const fetchAll = async () => {
    setIsLoading(true);
    setTimeout(function () {
      setIsLoading(false);
      setProductList(products);
    }, 10);
  };

  const _addToCart = async (product) => {
    const item = {
      product,
      itemCount: 1,
      selectedSize: '',
      subTotal: product.price * 1,
    };

    dispatch(cartAddItem({ item, router }));
    enqueueSnackbar(`Item ${product.name} added to cart!`, {
      variant: 'success',
    });
  };

  return (
    <>
      <Grid.Container
        wrap="wrap"
        css={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          w: 'auto',
          height: '89vh',
        }}
      >
        <Grid lg={2} md={2} xl={2} sm={0} xs={0}>
          <Filter
            darkMode={darkMode}
            filterByCategory={filterByCategory}
            categoryList={categoryList}
            typeList={typeList}
            filterByType={filterByType}
            setIsPressed={setIsPressed}
            fetchAll={fetchAll}
            isPressed={isPressed}
          />
        </Grid>
        <Grid lg={0} md={0} xl={0} sm={12} xs={12}>
          <MobileFilterView
            filterByCategory={filterByCategory}
            categoryList={categoryList}
            typeList={typeList}
            filterByType={filterByType}
            setIsPressed={setIsPressed}
            fetchAll={fetchAll}
            isPressed={isPressed}
          />
        </Grid>
        <Grid xl={10} lg={10} md={10} xs={12} sm={12}>
          {isLoading || loading ? (
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
                <Loading
                  type="default"
                  size="xl"
                  color={darkMode ? 'primary' : 'error'}
                />
              </Grid>
            </Grid.Container>
          ) : (
            <Grid.Container
              gap={1}
              justify="flex-start"
              css={{
                overflow: 'auto',
                maxHeight: '100%',
                height: '100vh',
                paddingBottom: '27rem',
                '@xs': {
                  paddingBottom: '5rem',
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
                        borderRadius: '$xs',
                      }}
                      isHoverable
                      isPressable
                      variant="bordered"
                    >
                      <Card.Header
                        css={{ position: 'absolute', zIndex: 1, top: 5 }}
                      >
                        <Col>
                          <Text css={{ fontWeight: '$medium', color: 'white' }}>
                            {product.name}
                          </Text>
                        </Col>
                      </Card.Header>
                      <Card.Body
                        css={{
                          p: 0,
                          backgroundColor: 'transparent',
                        }}
                      >
                        <Card.Image
                          maxDelay={1000}
                          src={product.image}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                          alt={product.name}
                          css={{
                            backgroundColor: 'transparent',
                          }}
                          onClick={() => {
                            handleItemDetails(product);
                          }}
                        />
                      </Card.Body>
                      <Card.Footer
                        isBlurred
                        css={{
                          position: 'absolute',
                          bgBlur: 'rgba(0,0,0,0.5)',
                          borderTop:
                            '$borderWeights$light solid rgba(255, 255, 255, 0.5)',
                          bottom: 0,
                          borderBottomLeftRadius: '0',
                          borderBottomRightRadius: '0',
                          zIndex: 1,
                        }}
                      >
                        <Row align="center" wrap="nowrap">
                          <Col>
                            <Text
                              css={{
                                color: '$white',
                                whiteSpace: 'nowrap',
                                w: '150px',
                                '@xs': { w: '190px' },
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {product.description}
                            </Text>
                            <Text
                              css={{
                                color: 'rgba(255,255,0,0.9)',
                                fontWeight: '$semibold',
                                fontSize: '$xl',
                              }}
                            >
                              {moneyFormat(product.price)}
                            </Text>
                          </Col>
                          <Col span={1} css={{ cursor: 'pointer' }}>
                            <Row justify="flex-end" css={{ marginTop: '$5' }}>
                              <ShoppingCartIcon
                                style={{
                                  color: 'Orange',
                                  fontSize: '2.5rem',
                                  '@xs': {
                                    fontSize: '2.5rem',
                                  },
                                }}
                                onClick={() => {
                                  product.category === 'Food'
                                    ? _addToCart(product)
                                    : handleItemDetails(product);
                                }}
                              />
                            </Row>
                          </Col>
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Grid>
                ))}
            </Grid.Container>
          )}
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Shop;
