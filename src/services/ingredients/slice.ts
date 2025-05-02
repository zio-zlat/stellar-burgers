import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsThunk } from './actions';

type TIngredientsState = {
  ingredients: TIngredient[];
  selectIngredient: TIngredient | undefined;
  isIngredientsLoading: boolean;
  error: string | undefined;
};

const initialState: TIngredientsState = {
  ingredients: [],
  selectIngredient: undefined,
  isIngredientsLoading: false,
  error: undefined
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setSelectIngredient: (state, action: PayloadAction<string>) => {
      state.selectIngredient = state.ingredients.find(
        (item) => item._id === action.payload
      );
    },
    clearSelectIngredient: (state) => {
      state.selectIngredient = undefined;
    }
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIsIngredientsLoading: (state) => state.isIngredientsLoading,
    getSelectIngredient: (state) => state.selectIngredient
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngredientsLoading = false;
        state.error = undefined;
      });
  }
});

export const { getIngredients, getIsIngredientsLoading, getSelectIngredient } =
  ingredientsSlice.selectors;
export const { setSelectIngredient, clearSelectIngredient } =
  ingredientsSlice.actions;
