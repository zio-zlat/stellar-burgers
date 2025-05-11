import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import {
  getFeeds,
  getFeedsTotal,
  getFeedsTotalToday
} from '../../services/feeds/feedsSlice';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(getFeeds);
  const feedsTotal = useSelector(getFeedsTotal);
  const feedsTotalToday = useSelector(getFeedsTotalToday);
  const feed = { total: feedsTotal, totalToday: feedsTotalToday };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
