import { useMutation } from '@apollo/client';
import { Button, message } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../widgets/layout/Layout';
import styles from './basket.module.css';
import BasketList from '../../widgets/basket_list/BasketList';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';
import { basketActions, basketSelectors } from '../../store/basket';
import { ADD_ORDER, AddOrderResponse, AddOrderVars } from '../../shared/graphql/orders/mutations';
import { createErrorHandlers } from '../../shared/helpers/createErrorHandlers';
import { OrderAddInput } from '../../entities/orders.types';

const Basket: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const styleNameBtn = useThemeStyles(styles.button, {
    light: styles.light,
    dark: styles.dark,
  });

  const basketProducts = useSelector(basketSelectors.get);

  const dispatcher = useDispatch();
  const [insertOrder] = useMutation<AddOrderResponse, AddOrderVars>(ADD_ORDER, {
    fetchPolicy: 'no-cache',
  });

  const { catcher } = createErrorHandlers((code, _, error) => {
    if (code === null) {
      message.error(error.message);
    } else if (basketProducts.length === 0) {
      message.error("Please, add product to basket");
    } else {
      message.error(code);
    }
  });

  const handleOnClick = () => {
    const inputData: OrderAddInput = {
      products: basketProducts.map((basketProduct) => ({
        id: basketProduct.product.id,
        quantity: basketProduct.count,
      })),
      status: 'PendingConfirmation',
    };
    insertOrder({ variables: { input: inputData } })
      .then((res) => {
        if (res && res.data) {
          message.success(t('widgets.orders.success'));
          dispatcher(basketActions.clear());
        }
      })
      .catch(catcher);
  };

  return (
    <Layout>
      <BasketList />
      <Button className={styleNameBtn} type="primary" onClick={handleOnClick}>
        {' '}
        {t('screens.basket.send_order')}{' '}
      </Button>
    </Layout>
  );
});

Basket.displayName = 'Basket';
export default Basket;
