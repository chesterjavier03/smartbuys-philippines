import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  errorGlobal,
  successGlobal,
} from 'store/reducers/notifications.reducer';

export const adminFetchUserList = createAsyncThunk(
  'admin/fetchUserList',
  async (userToken, { dispatch }) => {
    try {
      const { data } = await axios.get('/api/admin/user/user-list', {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });
      return data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);

export const adminFetchProductList = createAsyncThunk(
  'admin/fetchProductList',
  async (userToken, { dispatch }) => {
    try {
      const { data } = await axios.get('/api/admin/product/product-list', {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });
      return data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);

export const adminFilterProductListByType = createAsyncThunk(
  'admin/filterProductListByType',
  async ({ type, userToken }, { dispatch }) => {
    try {
      const { data } = await axios.get(
        `/api/products/filter/byType?type=${type}`,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);

export const adminFilterProductListByCategory = createAsyncThunk(
  'admin/filterProductListByCategory',
  async ({ category, userToken }, { dispatch }) => {
    try {
      const { data } = await axios.get(
        `/api/products/filter/byCategory?category=${category}`,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);

export const adminDeleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async ({ productName, userToken }, { dispatch }) => {
    try {
      const { data } = await axios.delete(
        `/api/admin/product/delete-product/${productName}`,
        {
          headers: { authorization: `Bearer ${userToken}` },
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

export const adminFetchOrderList = createAsyncThunk(
  'admin/fetchOrderList',
  async (userToken, { dispatch }) => {
    try {
      const { data } = await axios.get('/api/admin/order/order-list', {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });
      return data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
