import React, { forwardRef } from 'react';
import style from './product_card.module.css';
import unknowImageUrl from '../../../assets/not_found.png';
import ProductCardItem from './ProductCardItem';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../../entities/products.types';
import { useThemeStyles } from '../../../shared/hooks/useThemeStyles';
import { basketActions, basketSelectors } from '../../../store/basket';
import { BasketProduct } from '../../../entities/base.types';
import { BasketButtonWidget } from '../../../widgets/basket_button';

export interface IProductCardProps {
  product: Product;
  disable?: boolean;
  onClick?: (id: string) => void;
}

export const ProductCard = forwardRef<HTMLDivElement, IProductCardProps>(
  ({ product: { id, price, name, desc, photo, commandId, category, createdAt, updatedAt }, disable, onClick }, ref) => {
    const { t } = useTranslation();
    const styleName = useThemeStyles(style.main, {
      light: style.light,
      dark: style.dark,
    });

    const dispatch = useDispatch();
    const basketItems = useSelector(basketSelectors.get);
    const productInBasket: BasketProduct | undefined = basketItems?.find(
      (basketProduct) => basketProduct.product.id === id
    );
    const _count = productInBasket?.count || 0;

    const handleIncrement = (count: number) => {
      dispatch(
        basketActions.add({
          product: { id, price, name, desc, photo, commandId, category, createdAt, updatedAt },
          count: count,
        })
      );
    };

    const handleDecrement = (count: number) => {
      if (count > 1) {
        dispatch(
          basketActions.add({
            product: { id, price, name, desc, photo, commandId, category, createdAt, updatedAt },
            count: count,
          })
        );
      } else {
        dispatch(basketActions.remove(id));
      }
    };
    return (
      <div className={styleName} ref={ref}>
        <div className={style.title}>
          {t('widgets.product.card')}
          {!disable && (
            <Button
              type="primary"
              icon={<EditOutlined className={style.edit_button} />}
              size="small"
              onClick={() => onClick(id)}
            />
          )}
        </div>

        <div className={style.container}>
          <div className={style.img_container}>
            <img className={style.img} src={photo === null ? unknowImageUrl : photo} />
          </div>
          <div className={style.info}>
            <ProductCardItem title={t('widgets.product.cost')} value={price} />
            <ProductCardItem title={t('widgets.product.name')} value={name} />
            <ProductCardItem className={style.desc} title={t('widgets.product.description')} value={desc} />
            <BasketButtonWidget
              initCount={_count}
              disabled={false}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = 'Product';
export default ProductCard;
