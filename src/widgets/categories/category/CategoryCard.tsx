import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { forwardRef } from 'react';
import unknowCategory from '../../../assets/unknown_category.png';
import style from './category_card.module.css';
import { Category } from '../../../entities/categories.types';
import { useThemeStyles } from '../../../shared/hooks/useThemeStyles';

export interface ICategoryCardProps {
  category: Category;
  enableEdit?: boolean;
  onClickEdit?: (id: string) => void;
  onClick?: (id: string) => void;
}

export const CategoryCard = forwardRef<HTMLDivElement, ICategoryCardProps>(
  ({ category: { id, name, photo }, enableEdit, onClickEdit, onClick }, ref) => {
    const styleName = useThemeStyles(style.main, {
      light: style.light,
      dark: style.dark,
    });

    return (
      <div className={styleName} ref={ref}>
        <div className={style.title}>
          {name}
          {enableEdit && (
            <Button
              type="primary"
              icon={<EditOutlined className={style.edit_button} />}
              size="small"
              onClick={() => onClickEdit(id)}
            />
          )}
        </div>
        <div className={style.content} onClick={() => onClick(id)}>
          <img className={style.img} src={photo === null ? unknowCategory : photo} />
        </div>
      </div>
    );
  }
);

CategoryCard.displayName = 'CategoryCard';
export default CategoryCard;
