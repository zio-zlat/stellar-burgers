import { getIngredientsThunk } from './ingredientsActions';
import {
  clearSelectIngredient,
  ingredientsSlice,
  initialState,
  setSelectIngredient
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const ingredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

describe('проверка редьюсеров слайса ingredients', () => {
  it('проверка редьюсера', () => {
    const state = ingredientsSlice.reducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('getIngredientsThunk pending', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isIngredientsLoading: true });
  });

  it('getOrdersThunk rejected', () => {
    const action = {
      type: getIngredientsThunk.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, error: 'Ошибка' });
  });

  it('getFeedsThunk fulfilled', () => {
    const action = {
      type: getIngredientsThunk.fulfilled.type,
      payload: ingredients
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, ingredients: ingredients });
  });

  it('setSelectIngredient and clearSelectIngredient', () => {
    const actionSet = setSelectIngredient('1');
    const state = ingredientsSlice.reducer(
      ingredientsSlice.reducer(initialState, {
        type: getIngredientsThunk.fulfilled.type,
        payload: ingredients
      }),
      actionSet
    );

    expect(state.selectIngredient).toEqual(ingredients[0]);

    const nextState = ingredientsSlice.reducer(state, clearSelectIngredient());

    expect(nextState.selectIngredient).toBe(undefined);
  });
});
