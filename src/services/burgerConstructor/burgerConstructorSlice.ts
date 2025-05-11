import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TMoveInfo } from '@utils-types';

export type TBurgerConstructor = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TBurgerConstructor = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    sortIngredients: (state, action: PayloadAction<TMoveInfo>) => {
      const { from, to } = action.payload;
      const [movedItem] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, movedItem);
    },
    deleteBurgerIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructorSelector: (state) => state
  }
});

export const { getConstructorSelector } = burgerConstructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  sortIngredients,
  deleteBurgerIngredients
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
