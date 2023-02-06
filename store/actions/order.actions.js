import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { errorGlobal } from 'store/reducers/notifications.reducer';

export const fetchOrders = createAsyncThunk(
  '/order/history',
  async ({ values, router }, { dispatch }) => {
    const { redirect } = router.query;
    try {
      const { data } = await axios.get('/api/orders/history', values.orderId, {
        headers: {
          authorization: `Bearer ${values.token}`,
        },
      });
      router.push(redirect || '/user/order-history', undefined, {
        shallow: true,
      });
      return data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
