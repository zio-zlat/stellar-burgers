import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorSelector,
  removeIngredient,
  sortIngredients
} from '../../services/burgerConstructor/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const burgerConstructor = useSelector(getConstructorSelector);

    let indexIngredient = burgerConstructor.ingredients.indexOf(ingredient);
    let ingredientDown = burgerConstructor.ingredients[indexIngredient + 1];
    let indexIngredientDown =
      burgerConstructor.ingredients.indexOf(ingredientDown);
    let ingredientUp = burgerConstructor.ingredients[indexIngredient - 1];
    let indexIngredientUp = burgerConstructor.ingredients.indexOf(ingredientUp);

    const handleMoveDown = () => {
      dispatch(
        sortIngredients({ from: indexIngredient, to: indexIngredientDown })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        sortIngredients({ from: indexIngredient, to: indexIngredientUp })
      );
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
