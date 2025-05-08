import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getConstructorSelector } from '../../services/burgerConstructor/slice';
import { orderBurgerThunk } from '../../services/order/actions';
import { getUser } from '../../services/user/slice';
import { useNavigate } from 'react-router-dom';
import {
  deleteMyOrder,
  getMyOrder,
  getOrderRequest,
  getSuccessOrder,
  setOrderRequest
} from '../../services/order/slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const constructorItems = useSelector(getConstructorSelector);
  const orderRequest = useSelector(getOrderRequest);
  const successOrder = useSelector(getSuccessOrder);
  const orderModalData = useSelector(getMyOrder);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!user) {
      return navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) {
      return console.log('Ошибка при создании заказа');
    }

    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(orderBurgerThunk(order));
  };

  const closeOrderModal = () => {
    if (orderRequest) {
      return dispatch(setOrderRequest(false));
    }
    if (orderModalData) {
      return dispatch(deleteMyOrder());
    }
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      successOrder={successOrder}
    />
  );
};
