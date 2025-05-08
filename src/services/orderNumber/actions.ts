import { getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderByNumberThunk = createAsyncThunk(
  'orderNumber/getOrder',
  async (number: number) => {
    const data = getOrderByNumberApi(number);
    return data;
  }
);
