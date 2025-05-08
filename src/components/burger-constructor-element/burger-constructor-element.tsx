import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorSelector,
  removeIngredient,
  setBurgerIngredients
} from '../../services/burgerConstructor/slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const burgerConstructor = useSelector(getConstructorSelector);

    let newConstructor = [...burgerConstructor.ingredients];
    let indexIngredient = newConstructor.indexOf(ingredient);
    let ingredientDown = newConstructor[indexIngredient + 1];
    let indexIngredientDown = newConstructor.indexOf(ingredientDown);
    let ingredientUp = newConstructor[indexIngredient - 1];
    let indexIngredientUp = newConstructor.indexOf(ingredientUp);

    const handleMoveDown = () => {
      [newConstructor[indexIngredient], newConstructor[indexIngredientDown]] = [
        newConstructor[indexIngredientDown],
        newConstructor[indexIngredient]
      ];
      dispatch(setBurgerIngredients(newConstructor));
    };

    const handleMoveUp = () => {
      [newConstructor[indexIngredientUp], newConstructor[indexIngredient]] = [
        newConstructor[indexIngredient],
        newConstructor[indexIngredientUp]
      ];
      dispatch(setBurgerIngredients(newConstructor));
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
