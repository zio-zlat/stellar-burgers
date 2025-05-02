import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredients/slice';
import { burgerConstructorSlice } from './burgerConstructor/slice';
import { userSlice } from './user/slice';
import { feedsSlice } from './feeds/slice';
import { orderSlice } from './order/slice';
import { orderByNumberSlice } from './orderNumber/slice';

const rootReducer = combineSlices(
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
