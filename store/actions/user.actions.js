import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  errorGlobal,
  successGlobal,
} from 'store/reducers/notifications.reducer';

export const signInUser = createAsyncThunk(
  '/user/signIn',
  async ({ values, router }, { dispatch }) => {
    const { redirect } = router.query;
    try {
      const { data } = await axios.post('/api/users/login', values);
      dispatch(successGlobal(`Welcome ${data.name}`));
      const userToken = data.token;
      dispatch(fetchUserShippingAddress(userToken));
      router.push(redirect || '/', undefined, { shallow: true });
      return data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ values, router }, { dispatch }) => {
    const { redirect } = router.query;
    try {
      const { data } = await axios.post('/api/users/register', values);
      dispatch(successGlobal(`User ${data.name} created!`));
      router.push(redirect || '/', undefined, { shallow: true });
      return data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);

export const fetchOrderList = createAsyncThunk(
  'user/fetchOrderList',
  async (userToken, { dispatch }) => {
    try {
      const { data } = await axios.get('/api/orders/history', {
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

export const saveShippingToUser = createAsyncThunk(
  'user/saveShipping',
  async (requestData, { dispatch }) => {
    try {
      const { data } = await axios.post(
        '/api/shipping/create',
        requestData.shippingAddress,
        {
          headers: {
            authorization: `Bearer ${requestData.userToken}`,
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

export const fetchUserShippingAddress = createAsyncThunk(
  'user/fetchUserShipping',
  async (userToken, { dispatch }) => {
    try {
      const { data } = await axios.get('/api/shipping/address', {
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
