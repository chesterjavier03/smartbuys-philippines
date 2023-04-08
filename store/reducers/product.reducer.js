import { createSlice } from '@reduxjs/toolkit';

import { fetchOrderList } from 'store/actions/cart.actions';
import { createNewProduct, updateProduct } from 'store/actions/product.actions';

const DEFAULT_STATE = {
  loading: false,
  products: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState: DEFAULT_STATE,
  reducers: {
    signOutUserProduct: (state) => {
      state.products = [];
      state.loading = false;
    },
    // updateProduct: (state, action) => {
    //   state.products = action.payload;
    // },
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
      .addCase(createNewProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.auth = true;
      })
      .addCase(createNewProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.auth = true;
      })
      .addCase(updateProduct.rejected, (state) => {
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
  // updateProduct
  deleteProduct,
  createProduct,
  cartClear,
  cartRemoveItem,
  savePaymentMethod,
  saveShippingAddress,
  updateDarkMode,
  signOutUserProduct,
} = productSlice.actions;
export default productSlice.reducer;
