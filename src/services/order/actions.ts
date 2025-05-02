import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const orderBurgerThunk = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => {
    try {
      const res = await orderBurgerApi(data);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
