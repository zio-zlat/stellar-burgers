import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getOrders } from '../../services/feeds/feedsSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersThunk } from '../../services/feeds/feedsActions';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
