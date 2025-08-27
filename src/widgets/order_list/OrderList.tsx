import { useQuery } from '@apollo/client';
import { Collapse, message } from 'antd';
import type { CollapseProps } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomSpin from '../spin/CustomSpin';
import styles from './order_list.module.css';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';
import { GET_ORDER, GetOrderResponseQueries } from '../../shared/graphql/orders/query';
import { Order } from '../../entities/orders.types';

const OrderList: React.FC = () => {
  const { t } = useTranslation();
  const styleName = useThemeStyles(styles.list, {
    light: styles.light,
    dark: styles.dark,
  });

  const [orders, setOrders] = useState<Order[]>([]);

  const { loading: orderLoading } = useQuery<GetOrderResponseQueries>(GET_ORDER, {
    onCompleted: (data) => {
      if (data) {
        setOrders(data.orders.getMany.data);
        console.log('Orders loading success= ', JSON.stringify(data.orders.getMany.data));
      }
    },
    onError: (error) => {
      message.error(t(`errors.${error.message}`));
    },
    fetchPolicy: 'network-only',
  });

  if (orderLoading) {
    return <CustomSpin />;
  }

  if (!orderLoading && orders.length === 0) {
    return <span className={styles.empty}>{t('widgets.orders.no_orders')}</span>;
  }

  const items: CollapseProps['items'] = orders.map((order) => {
    const label = (
      <>
        <span className={styles.left}>
          {t('widgets.orders.order_num')} {order.id} {t('widgets.orders.at')} {order.createdAt}
        </span>
        <span className={styles.right}>
          {t('widgets.orders.status')} {order.status}
        </span>
      </>
    );
    const children = (
      <ul className={styles.child_list}>
        {order.products.map((orderProduct) => (
          <li key={orderProduct.id}>
            <span className={styles.left}>{orderProduct.product.name}</span>
            <span className={styles.right}>
              {orderProduct.product.price} x {orderProduct.quantity} ={' '}
              {orderProduct.product.price * orderProduct.quantity} ₽
            </span>
          </li>
        ))}
      </ul>
    );
    return { key: order.id, label: label, children: children };
  });

  return <Collapse className={styleName} items={items} />;
};

export default OrderList;
