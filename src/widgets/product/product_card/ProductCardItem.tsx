import React from 'react';
import style from './product_card.module.css';
import { clsx } from 'clsx';

export interface IProductCardItemProps {
  title: string;
  value: string | number;
  className?: string;
}

export function ProductCardItem({ title, value, className }: IProductCardItemProps) {
  return (
    <div className={clsx(className, style.item)}>
      <div className={style.item_title}>{title}</div>
      <div className={style.item_value}>{value}</div>
    </div>
  );
}
export default ProductCardItem;
