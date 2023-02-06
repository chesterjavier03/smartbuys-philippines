import { createSlice } from '@reduxjs/toolkit';
import { fetchOrders } from 'store/actions/order.actions';

const DEFAULT_STATE = {
  loading: false,
  orders: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: DEFAULT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;
