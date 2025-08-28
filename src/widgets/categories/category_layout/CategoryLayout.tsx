import React, { useEffect, useState } from 'react';
import { CategoryList } from '../category_list/CategoryList';
import style from './category_layout.module.css';
import { useSelector } from 'react-redux';
import { profileSelectors } from 'src/store/profile';
import { useAdminRight } from 'src/shared/hooks/useAdminRight';
import CustomSpin from 'src/widgets/spin/CustomSpin';

const CategoryLayout: React.FC = () => {
  const profile = useSelector(profileSelectors.get);
  const { isAdmin, isLoading } = useAdminRight(profile);

  return (
    <div className={style.main}>
      {isLoading && <CustomSpin />}
      {!isLoading && <CategoryList className="category_list" isAdmin={isAdmin} />}
    </div>
  );
};

export default CategoryLayout;
