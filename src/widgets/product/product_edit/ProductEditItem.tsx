import { clsx } from 'clsx';
import React, { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import style from './product_edit.module.css';
import { ProductAddInput, ProductUpdateInput } from '../../../entities/products.types';

export interface IProductEditItemProps {
  name: string;
  title: string;
  className?: string;
  type?: string;
  step?: string;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const ProductEditItem = forwardRef<
  HTMLInputElement,
  IProductEditItemProps & ReturnType<UseFormRegister<ProductAddInput | ProductUpdateInput>>
>(({ name, title, className, type, step, error, onBlur, onChange }: IProductEditItemProps, ref) => (
  <div className={clsx(className, style.item)}>
    <div className={style.item_title}>{title}</div>
    <input
      name={name}
      ref={ref}
      type={type}
      step={step}
      className={style.item_value_input}
      onChange={onChange}
      onBlur={onBlur}
    />
    {error && <span className={style.error_msg}>{error}</span>}
  </div>
));
ProductEditItem.displayName = 'ProductEditItem';
export default ProductEditItem;
