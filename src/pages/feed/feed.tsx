import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getFeeds } from '../../services/feeds/feedsSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedsThunk } from '../../services/feeds/feedsActions';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getFeeds);

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedsThunk());
      }}
    />
  );
};
