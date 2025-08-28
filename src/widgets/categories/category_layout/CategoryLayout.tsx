import React from 'react';
import { CategoryList } from '../category_list/CategoryList';
import style from './category_layout.module.css';

const CategoryLayout: React.FC = () => (
  <div className={style.main}>
    <CategoryList className="category_list" />
  </div>
);

export default CategoryLayout;
