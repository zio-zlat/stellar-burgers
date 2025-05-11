import { TNewOrderResponse } from '@api';
import { orderBurgerThunk } from './orderActions';
import {
  deleteMyOrder,
  initialState,
  orderSlice,
  setOrderRequest,
  setSuccessOrder
} from './orderSlice';

const orderRes: TNewOrderResponse = {
  success: true,
  order: {
    _id: '1',
    ingredients: ['2'],
    status: 'done',
    name: 'Флюоресцентный фалленианский бургер',
    createdAt: '2025-05-11T12:00:34.283Z',
    updatedAt: '2025-05-11T12:00:34.939Z',
    number: 1
  },
  name: 'order'
};

describe('проверка редьюсеров слайса order', () => {
  it('проверка редьюсера', () => {
    const state = orderSlice.reducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('orderBurgerThunk pending', () => {
    const action = { type: orderBurgerThunk.pending.type };
    const state = orderSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, orderRequest: true });
  });

  it('orderBurgerThunk rejected', () => {
    const action = {
      type: orderBurgerThunk.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = orderSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, error: 'Ошибка' });
  });

  it('orderBurgerThunk fulfilled', () => {
    const action = {
      type: orderBurgerThunk.fulfilled.type,
      payload: orderRes
    };
    const state = orderSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      success: orderRes.success,
      order: orderRes.order
    });
  });

  it('deleteMyOrder', () => {
    const action = {
      type: orderBurgerThunk.fulfilled.type,
      payload: orderRes
    };
    const state = orderSlice.reducer(
      orderSlice.reducer(initialState, action),
      deleteMyOrder()
    );

    expect(state.order).toBe(null);
  });

  it('setOrderRequest', () => {
    const state = orderSlice.reducer(initialState, setOrderRequest(true));

    expect(state).toEqual({...initialState, orderRequest: true});
  });

  it('setOrderRequest', () => {
    const state = orderSlice.reducer(initialState, setSuccessOrder(true));

    expect(state).toEqual({...initialState, success: true});
  });
});
