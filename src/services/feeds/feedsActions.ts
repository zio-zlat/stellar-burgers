import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeedsThunk = createAsyncThunk('feeds/getFeed', async () =>
  getFeedsApi()
);

export const getOrdersThunk = createAsyncThunk('feeds/getOrder', async () =>
  getOrdersApi()
);
