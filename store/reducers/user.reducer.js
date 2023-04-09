import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  signInUser,
  fetchOrderList,
  saveShippingToUser,
  fetchUserShippingAddress,
} from 'store/actions/user.actions';

const DEFAULT_STATE = {
  loading: false,
  darkMode: false,
  userInfo: null,
  cart: {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: 'cash',
  },
  auth: false,
  orders: [],
  shipping: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState: DEFAULT_STATE,
  reducers: {
    updateUser: (state, action) => {
      state.userInfo = action.payload;
    },
    signOutUser: (state) => {
      state.userInfo = null;
      state.cart.cartItems = [];
      state.darkMode = false;
      state.loading = false;
      state.cart.paymentMethod = '';
      state.cart.shippingAddress = {};
      state.auth = false;
      state.orders = [];
      state.shipping = {};
    },
    updateDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    cartAddItem: (state, action) => {
      const newItem = action.payload.item;
      const existItem = state.cart.cartItems.find((item) =>
        item.product._id === newItem.product._id
          ? item.product.category !== 'Food'
            ? item.selectedSize.name === newItem.selectedSize.name
              ? true
              : false
            : true
          : false
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.product._id === existItem.product._id
              ? item.product.category !== 'Food'
                ? item.selectedSize
                  ? item.selectedSize.name === existItem.selectedSize.name
                    ? {
                        ...item,
                        itemCount:
                          item.itemCount + action.payload.item.itemCount,
                        subTotal: item.subTotal + action.payload.item.subTotal,
                      }
                    : {
                        ...item,
                        itemCount: item.itemCount,
                        subTotal: item.subTotal,
                      }
                  : item
                : {
                    ...item,
                    itemCount: item.itemCount + action.payload.item.itemCount,
                    subTotal: item.subTotal + action.payload.item.subTotal,
                  }
              : item
          )
        : [...state.cart.cartItems, newItem];
      state.cart.cartItems = cartItems;
    },
    cartUpdateItem: (state, action) => {
      const updateItem = action.payload.product;
      const cartItems = state.cart.cartItems.map((item) =>
        item.product._id === updateItem.product._id &&
        item.selectedSize.name === updateItem.selectedSize.name
          ? {
              ...item,
              itemCount: action.payload.itemCount,
              subTotal: action.payload.subTotal,
            }
          : item
      );
      state.cart.cartItems = cartItems;
    },
    cartRemoveItem: (state, action) => {
      const cartItems = state.cart.cartItems.filter((item) =>
        item.product._id === action.payload.product._id
          ? item.product.category !== 'Food'
            ? item.selectedSize.name === action.payload.selectedSize.name
              ? false
              : true
            : false
          : true
      );
      state.cart.cartItems = cartItems;
    },
    cartClear: (state) => {
      state.cart.cartItems = [];
    },
    saveShippingAddress: (state, action) => {
      state.cart.shippingAddress = action.payload.shipping;
    },
    savePaymentMethod: (state, action) => {
      state.cart.paymentMethod = action.payload.paymentMethod;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.auth = true;
      })
      .addCase(signInUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.auth = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchOrderList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderList.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(saveShippingToUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveShippingToUser.fulfilled, (state, action) => {
        state.loading = false;
        state.shipping = action.payload;
      })
      .addCase(saveShippingToUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserShippingAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserShippingAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.shipping = action.payload;
      })
      .addCase(fetchUserShippingAddress.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  signOutUser,
  updateUser,
  updateDarkMode,
  cartAddItem,
  cartUpdateItem,
  cartClear,
  cartRemoveItem,
  savePaymentMethod,
  saveShippingAddress,
} = userSlice.actions;
export default userSlice.reducer;
