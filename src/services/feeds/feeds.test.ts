import { TFeedsResponse } from '@api';
import { getFeedsThunk, getOrdersThunk } from './feedsActions';
import { feedsSlice, initialState } from './feedsSlice';
import { TOrder } from '@utils-types';

const feedsRes: TFeedsResponse = {
  success: true,
  orders: [
    {
      _id: '2',
      ingredients: ['1'],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2025-05-11T12:01:05.253Z',
      updatedAt: '2025-05-11T12:01:06.159Z',
      number: 2
    },
    {
      _id: '1',
      ingredients: ['2'],
      status: 'done',
      name: 'Флюоресцентный фалленианский бургер',
      createdAt: '2025-05-11T12:00:34.283Z',
      updatedAt: '2025-05-11T12:00:34.939Z',
      number: 1
    }
  ],
  total: 2,
  totalToday: 2
};

describe('проверка редьюсеров слайса feeds', () => {
  it('проверка редьюсера', () => {
    const state = feedsSlice.reducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('getFeedsThunk rejected', () => {
    const action = {
      type: getFeedsThunk.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = feedsSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, error: 'Ошибка' });
  });

  it('getFeedsThunk fulfilled', () => {
    const action = {
      type: getFeedsThunk.fulfilled.type,
      payload: feedsRes
    };
    const state = feedsSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      feeds: feedsRes.orders,
      total: feedsRes.total,
      totalToday: feedsRes.totalToday
    });
  });

  it('getOrdersThunk rejected', () => {
    const action = {
      type: getOrdersThunk.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = feedsSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, error: 'Ошибка' });
  });

  it('getOrdersThunk fulfilled', () => {
    const action = { type: getOrdersThunk.fulfilled.type, payload: feedsRes.orders };
    const state = feedsSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, orders: feedsRes.orders });
  });
});
