import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  errorGlobal,
  successGlobal,
} from 'store/reducers/notifications.reducer';

export const createNewProduct = createAsyncThunk(
  'product/createNewProduct',
  async ({ newProduct, userToken }, { dispatch }) => {
    try {
      const { data } = await axios.post(
        '/api/admin/product/create-product',
        newProduct,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      dispatch(successGlobal(data.message));
      return data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ updateProductData, userToken }, { dispatch }) => {
    try {
      const { data } = await axios.put(
        '/api/admin/product/update-product',
        updateProductData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      dispatch(successGlobal(data.message));
      return data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
