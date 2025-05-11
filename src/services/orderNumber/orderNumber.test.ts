import { TOrderResponse } from '@api';
import { getOrderByNumberThunk } from './orderNumberActions';
import {
  clearOrderByNumber,
  initialState,
  orderByNumberSlice
} from './orderNumberSlice';

const orderRes: TOrderResponse = {
  success: true,
  orders: [
    {
      _id: '1',
      ingredients: ['2'],
      status: 'done',
      name: 'Флюоресцентный фалленианский бургер',
      createdAt: '2025-05-11T12:00:34.283Z',
      updatedAt: '2025-05-11T12:00:34.939Z',
      number: 1
    }
  ]
};

describe('проверка редьюсеров слайса orderNumber', () => {
  it('проверка редьюсера', () => {
    const state = orderByNumberSlice.reducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('getOrderByNumberThunk rejected', () => {
    const action = {
      type: getOrderByNumberThunk.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = orderByNumberSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, error: 'Ошибка' });
  });

  it('getOrderByNumberThunk fulfilled', () => {
    const action = {
      type: getOrderByNumberThunk.fulfilled.type,
      payload: orderRes
    };
    const state = orderByNumberSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, order: orderRes.orders[0] });
  });

  it('clearOrderByNumber', () => {
    const action = {
      type: getOrderByNumberThunk.fulfilled.type,
      payload: orderRes
    };
    const state = orderByNumberSlice.reducer(
      orderByNumberSlice.reducer(initialState, action),
      clearOrderByNumber()
    );

    expect(state).toEqual(initialState);
  });
});
