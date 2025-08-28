import { clsx } from 'clsx';
import React, { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import style from './product_edit.module.css';
import { Category } from '../../../entities/categories.types';
import { ProductAddInput, ProductUpdateInput } from '../../../entities/products.types';

export interface IProductEditSelectProps {
  name: string;
  title: string;
  className?: string;
  type?: string;
  step?: string;
  error?: string;
  dataList: Category[];
  initValue?: string | null;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
}

export const ProductEditSelect = forwardRef<
  HTMLSelectElement,
  IProductEditSelectProps & ReturnType<UseFormRegister<ProductAddInput | ProductUpdateInput>>
>(({ name, title, className, error, onBlur, onChange, dataList, initValue }: IProductEditSelectProps, ref) => (
  <div className={clsx(className, style.item)}>
    <div className={style.item_title}>{title}</div>
    <select
      name={name}
      ref={ref}
      className={style.item_select}
      defaultValue={initValue && true ? initValue : ''}
      onChange={onChange}
      onBlur={onBlur}
    >
      <option value="" disabled>
        {title}
      </option>
      {dataList.map((dataItem) => (
        <option key={dataItem.id} value={dataItem.id}>
          {dataItem.name}
        </option>
      ))}
    </select>
    {error && <span className={style.error_msg}>{error}</span>}
  </div>
));
ProductEditSelect.displayName = 'ProductEditSelect';
export default ProductEditSelect;
