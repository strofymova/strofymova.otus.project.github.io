import { clsx } from 'clsx';
import React, { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import style from './category_edit.module.css';
import { CategoryAddInput, CategoryUpdateInput } from 'src/entities/categories.types';

export interface ICategoryEditItemProps {
  name: string;
  title: string;
  className?: string;
  type?: string;
  step?: string;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const CategoryEditItem = forwardRef<
  HTMLInputElement,
  ICategoryEditItemProps & ReturnType<UseFormRegister<CategoryAddInput | CategoryUpdateInput>>
>(({ name, title, className, type, step, error, onBlur, onChange }: ICategoryEditItemProps, ref) => (
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
    {error && <span className="error-message">{error}</span>}
  </div>
));
CategoryEditItem.displayName = 'CategoryEditItem';
export default CategoryEditItem;
