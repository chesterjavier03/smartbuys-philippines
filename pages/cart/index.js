import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartRemoveItem, cartUpdateItem } from 'store/reducers/user.reducer';
import { useSnackbar } from 'notistack';
import YourCartMobile from './component/your.cart.mobile';
import YourCartDesktop from './component/your.cart.desktop';
import YourCartEmpty from './component/your.cart.empty';
import CartListMobile from './component/cartList.mobile';
import CartListDesktop from './component/cartList.desktop';
import { useRouter } from 'next/router';
const { Text, Col, Grid } = require('@nextui-org/react');

const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.user.cart.cartItems);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {}, []);

  if (!cartItems) {
    return (
      <Col css={{ margin: '0 auto' }}>
        <Text h1 color="error">
          cartItems not found
        </Text>
      </Col>
    );
  }

  const _incrementItem = (item) => {
    if (item.itemCount <= 19) {
      const update = {
        product: item,
        itemCount: item.itemCount + 1,
        subTotal: item.subTotal + item.product.price,
      };
      dispatch(cartUpdateItem(update));
    } else {
      enqueueSnackbar('Item count exeed maximum', { variant: 'error' });
    }
  };

  const _decrementItem = (item) => {
    const update = {
      product: item,
      itemCount: item.itemCount > 1 ? item.itemCount - 1 : 1,
      subTotal: item.subTotal - item.product.price,
    };

    if (item.itemCount > 1) {
      dispatch(cartUpdateItem(update));
    }
  };

  const _calculateTotalItems = () => {
    return cartItems.reduce((a, v) => (a = a + v.itemCount), 0);
  };

  const _removeItem = (item) => {
    dispatch(cartRemoveItem(item));
    enqueueSnackbar(`Product ${item.name} was removed`, {
      variant: 'success',
    });
  };

  return (
    <>
      <Grid.Container
        css={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          height: '90vh',
        }}
      >
        {cartItems.length === 0 && (
          <Grid lg={12} md={12} xl={12} sm={12} xs={12}>
            <YourCartEmpty />
          </Grid>
        )}
        {cartItems.length > 0 && (
          <>
            <Grid lg={0} md={0} xl={0} sm={0} xs={12}>
              <YourCartMobile
                cartItems={cartItems}
                _calculateTotalItems={_calculateTotalItems}
                router={router}
              />
            </Grid>
            <Grid lg={9} md={9} xl={9} sm={9} xs={12}>
              <Grid.Container
                gap={1}
                justify="flex-start"
                alignContent="flex-start"
                alignItems="flex-start"
                css={{
                  overflow: 'auto',
                  maxHeight: '100%',
                  height: '100vh',
                  marginTop: '5px',
                  paddingBottom: '27rem',
                  '@xs': {
                    marginTop: '',
                    paddingBottom: '7rem',
                  },
                }}
              >
                {cartItems &&
                  cartItems.map((item) => (
                    <>
                      <Grid xl={12} lg={12} md={12} xs={0} sm={12} key={item}>
                        <CartListDesktop
                          item={item}
                          _decrementItem={_decrementItem}
                          _incrementItem={_incrementItem}
                          _removeItem={_removeItem}
                          // router={router}
                        />
                      </Grid>
                      <Grid xl={0} lg={0} md={0} xs={12} sm={0} key={item}>
                        <CartListMobile
                          item={item}
                          _incrementItem={_incrementItem}
                          _decrementItem={_decrementItem}
                          _removeItem={_removeItem}
                          // router={router}
                        />
                      </Grid>
                    </>
                  ))}
              </Grid.Container>
            </Grid>
            <Grid lg={3} md={3} xl={3} sm={3} xs={0}>
              <YourCartDesktop
                cartItems={cartItems}
                _calculateTotalItems={_calculateTotalItems}
                router={router}
              />
            </Grid>
          </>
        )}
      </Grid.Container>
    </>
  );
};

export default Cart;
