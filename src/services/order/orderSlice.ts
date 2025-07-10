import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerThunk } from './orderActions';

type TOrderState = {
  orderRequest: boolean;
  order: TOrder | null;
  error: string | undefined;
  success: boolean;
};

export const initialState: TOrderState = {
  orderRequest: false,
  order: null,
  error: undefined,
  success: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    deleteMyOrder: (state) => {
      state.order = null;
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setSuccessOrder: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    }
  },
  selectors: {
    getMyOrder: (state) => state.order,
    getOrderRequest: (state) => state.orderRequest,
    getSuccessOrder: (state) => state.success
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.error = undefined;
        state.order = action.payload.order;
        state.success = action.payload.success;
      });
  }
});

export const { getMyOrder, getOrderRequest, getSuccessOrder } =
  orderSlice.selectors;
export const { deleteMyOrder, setOrderRequest, setSuccessOrder } =
  orderSlice.actions;
