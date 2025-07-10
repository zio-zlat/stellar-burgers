import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredients/ingredientsSlice';
import { burgerConstructorSlice } from './burgerConstructor/burgerConstructorSlice';
import { userSlice } from './user/userSlice';
import { feedsSlice } from './feeds/feedsSlice';
import { orderSlice } from './order/orderSlice';
import { orderByNumberSlice } from './orderNumber/orderNumberSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  userSlice,
  feedsSlice,
  orderSlice,
  orderByNumberSlice
);

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
