import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './basket_list.module.css';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';
import { BasketProduct } from '../../entities/base.types';
import { basketActions, basketSelectors } from '../../store/basket';

const BasketList: React.FC = () => {
  const { t } = useTranslation();
  const styleName = useThemeStyles(styles.list, {
    light: styles.light,
    dark: styles.dark,
  });

  const products: BasketProduct[] = useSelector(basketSelectors.get);
  const totalPrice = useSelector(basketSelectors.getTotalPrice);

  const dispatcher = useDispatch();
  const handleOnClick = (id: string) => {
    dispatcher(basketActions.remove(id));
  };

  return (
    <ul className={styleName}>
      {products.map((basketProduct) => (
        <li key={basketProduct?.product.id} className={styles.item}>
          <span>{basketProduct.product.name}</span>
          <div>
            <span>
              {basketProduct.product.price} x {basketProduct.count} ={' '}
              {basketProduct.product.price * basketProduct.count} ₽
            </span>
            <span>
              <Button
                className={styles.delete_button}
                type="primary"
                icon={<DeleteOutlined className={styles.delete_button_icon} />}
                size="small"
                onClick={() => handleOnClick(basketProduct.product.id)}
              />
            </span>
          </div>
        </li>
      ))}
      {totalPrice > 0 && (
        <li className={styles.total}>
          <span>{t('screens.basket.total')}: </span>
          <span>{totalPrice} ₽</span>
        </li>
      )}
      {totalPrice === 0 && <span className={styles.empty}>{t('screens.basket.empty')}</span>}
    </ul>
  );
};

export default BasketList;
