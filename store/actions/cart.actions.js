import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { errorGlobal } from 'store/reducers/notifications.reducer';

export const fetchOrderList = createAsyncThunk(
  '/user/orderList',
  async ({ values, router }, { dispatch }) => {
    try {
      const { data } = await axios.post('/api/orders/history', values);
      router.push('/order-history', undefined, { shallow: true });
      return data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
