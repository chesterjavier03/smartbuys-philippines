import { createSlice } from '@reduxjs/toolkit';

import { fetchOrderList } from 'store/actions/cart.actions';
import { registerUser, signInUser } from 'store/actions/user.actions';

const DEFAULT_STATE = {
  loading: false,
  products: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState: DEFAULT_STATE,
  reducers: {
    updateProduct: (state, action) => {
      state.products = action.payload;
    },
    deleteProduct: (state, action) => {
      const productList = state.products.filter(
        (item) => item._id !== action.payload._id
      );
      state.products = productList;
    },
    createProduct: (state, action) => {
      const newItem = action.payload;
      const existItem = state.products.find((item) => item._id === newItem._id);
      const productList = existItem
        ? state.products.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.products, newItem];
      state.products = productList;
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
      });
  },
});

export const {
  updateProduct,
  deleteProduct,
  createProduct,
  cartClear,
  cartRemoveItem,
  savePaymentMethod,
  saveShippingAddress,
  updateDarkMode,
} = productSlice.actions;
export default productSlice.reducer;
