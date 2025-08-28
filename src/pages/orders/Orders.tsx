import React from 'react';
import Layout from '../../widgets/layout/Layout';
import styles from './orders.module.css';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import OrderList from '../../widgets/order_list/OrderList';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';

const Orders: React.FC = React.memo(() => {
  const styleNameBtn = useThemeStyles(styles.button, {
    light: styles.light,
    dark: styles.dark,
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleOnClickBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <OrderList />
      <Button className={styleNameBtn} type="primary" onClick={handleOnClickBack}>
        {' '}
        {t('widgets.back')}{' '}
      </Button>
    </Layout>
  );
});
Orders.displayName = 'Orders';
export default Orders;
