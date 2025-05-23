import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const checkUser = createAsyncThunk('user/checkUser', async () => {
  try {
    if (getCookie('accessToken')) {
      const data = await getUserApi();
      return data.user;
    }
  } catch {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
});

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    localStorage.setItem('refreshToken', data.refreshToken);
    setCookie('accessToken', data.accessToken);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData) => {
    const data = await registerUserApi({ email, name, password });
    localStorage.setItem('refreshToken', data.refreshToken);
    setCookie('accessToken', data.accessToken);
    return data.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ email, name, password }: Partial<TRegisterData>) => {
    const data = await updateUserApi({ email, name, password });
    return data.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  logoutApi()
    .then(() => {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    })
    .catch(() => {
      console.log('Ошибка при выходе');
    });
});
