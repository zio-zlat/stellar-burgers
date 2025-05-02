import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsThunk, getOrdersThunk } from './actions';

type TFeedsState = {
  feeds: TOrder[];
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | undefined;
};

const initialState: TFeedsState = {
  feeds: [],
  orders: [],
  total: 0,
  totalToday: 0,
  error: undefined
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeeds: (state) => state.feeds,
    getFeedsTotal: (state) => state.total,
    getFeedsTotalToday: (state) => state.totalToday,
    getOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = undefined;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.error = undefined;
      });
  }
});

export const { getFeeds, getFeedsTotal, getFeedsTotalToday, getOrders } =
  feedsSlice.selectors;
