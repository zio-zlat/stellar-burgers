import { TIngredient } from '@utils-types';
import {
  addIngredient,
  burgerConstructorSlice,
  deleteBurgerIngredients,
  initialState,
  removeIngredient,
  sortIngredients,
  TBurgerConstructor
} from './burgerConstructorSlice';

const bun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
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
};

const main: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
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
};

const sauce: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
};

const oldState: TBurgerConstructor = {
  bun: { ...bun, id: '1' },
  ingredients: [
    { ...main, id: '2' },
    { ...sauce, id: '3' }
  ]
};

describe('проверка редьюсеров слайса burgerConstructor', () => {
  it('проверка редьюсера', () => {
    const state = burgerConstructorSlice.reducer(initialState, { type: ''});
    expect(state).toEqual(initialState)
  })

  describe('addIngredient', () => {
    it('добавление bun', () => {
      const action = addIngredient(bun);
      const state = burgerConstructorSlice.reducer(initialState, action);

      expect(state.bun).toEqual({ ...bun, id: expect.any(String) });
      expect(state.ingredients).toHaveLength(0);
    });

    it('добавление main', () => {
      const action = addIngredient(main);
      const state = burgerConstructorSlice.reducer(initialState, action);

      expect(state.bun).toBeNull();
      expect(state.ingredients[0]).toEqual({ ...main, id: expect.any(String) });
    });

    it('добавление sauce', () => {
      const action = addIngredient(sauce);
      const state = burgerConstructorSlice.reducer(initialState, action);

      expect(state.bun).toBeNull();
      expect(state.ingredients[0]).toEqual({
        ...sauce,
        id: expect.any(String)
      });
    });
  });

  describe('удаление ингредиентов', () => {
    it('removeIngredient', () => {
      const finishState: TBurgerConstructor = {
        bun: { ...bun, id: '1' },
        ingredients: [{ ...sauce, id: '3' }]
      };
      const action = removeIngredient({ ...main, id: '2' });
      const state = burgerConstructorSlice.reducer(oldState, action);

      expect(state).toEqual(finishState);
    });
  });

  describe('сортировка ингредиентов', () => {
    const finishState: TBurgerConstructor = {
        bun: { ...bun, id: '1' },
        ingredients: [
          { ...sauce, id: '3' },
          { ...main, id: '2' }
        ]
      };
    it('sortIngredients вниз', () => {
      const action = sortIngredients({from: 0, to: 1})
      const state = burgerConstructorSlice.reducer(oldState, action);

      expect(state).toEqual(finishState);
    });

    it('sortIngredients вверх', () => {
      const action = sortIngredients({from: 1, to: 0})
      const state = burgerConstructorSlice.reducer(finishState, action);

      expect(state).toEqual(oldState);
    });
  });

  describe('удаление ингредиентов', () => {
    it('deleteBurgerIngredients', () => {
      const action = deleteBurgerIngredients()
      const state = burgerConstructorSlice.reducer(oldState, action);

      expect(state).toEqual(initialState)
    })
  })
});
