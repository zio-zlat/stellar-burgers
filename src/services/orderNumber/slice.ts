import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberThunk } from './actions';

type TOrderByNumberState = {
  order: TOrder | undefined;
  error: string | undefined;
};

const initialState: TOrderByNumberState = {
  order: undefined,
  error: undefined
};

export const orderByNumberSlice = createSlice({
  name: 'orderByNumber',
  initialState,
  reducers: {
    clearOrderByNumber: (state) => {
      state.order = undefined;
    }
  },
  selectors: {
    getOrderByNumber: (state) => state.order,
    getNumber: (state) => state.order?.number
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.error = undefined;
        state.order = action.payload?.orders[0];
      });
  }
});

export const { getOrderByNumber, getNumber } = orderByNumberSlice.selectors;
export const { clearOrderByNumber } = orderByNumberSlice.actions;
