import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  checkUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './userActions';

type TUserState = {
  isAuthChecked: boolean;
  loginUserError: string | undefined;
  registerUserError: string | undefined;
  updateUserError: string | undefined;
  user: TUser | undefined;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  loginUserError: undefined,
  registerUserError: undefined,
  updateUserError: undefined,
  user: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUser: (state) => state.user,
    getLoginUserError: (state) => state.loginUserError,
    getRegisterUserError: (state) => state.registerUserError,
    getUpdateUserError: (state) => state.updateUserError,
    getIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.loginUserError = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.loginUserError = undefined;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.registerUserError = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
        state.registerUserError = undefined;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.user = undefined;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserError = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserError = undefined;
        state.user = action.payload;
      });
  }
});

export const {
  getUser,
  getIsAuthChecked,
  getLoginUserError,
  getRegisterUserError,
  getUpdateUserError
} = userSlice.selectors;
