import { getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderByNumberThunk = createAsyncThunk(
  'orderNumber/getOrder',
  async (number: number) => {
    try {
      const data = getOrderByNumberApi(number);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
