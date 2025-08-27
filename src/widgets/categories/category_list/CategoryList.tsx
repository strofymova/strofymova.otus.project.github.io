import { clsx } from 'clsx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Category, CategoryAddInput, CategoryUpdateInput } from '../../../entities/categories.types';
import { useAdminRight } from '../../../shared/hooks/useAdminRight';
import { useModalManager } from '../../../shared/hooks/useModalManager';
import { categoriesSelectors } from '../../../store/categories';
import { profileSelectors } from '../../../store/profile';
import AddButton from '../../add_button/AddButton';
import Modal from '../../modal/Modal';
import CustomSpin from '../../spin/CustomSpin';
import CategoryCard from '../category/CategoryCard';
import CategoryEdit from '../category_edit/CategoryEdit';
import style from './category_list.module.css';

export interface ICategoryList {
  className?: string;
}

const mapCategoryToEditForm = ({ name, photo }: Category) => ({
  name: name ?? '',
  photo: photo ?? null,
});

export const CategoryList: React.FC<ICategoryList> = React.memo(({ className }: ICategoryList): React.ReactNode => {
  const { t } = useTranslation();
  const categories: Category[] = useSelector(categoriesSelectors.get);
  const profile = useSelector(profileSelectors.get);
  const { isModalOpen, openModal, closeModal } = useModalManager();

  const [editCategory, setEditCategory] = useState<CategoryAddInput | CategoryUpdateInput>();
  const [selectedId, setSelectedId] = useState<string>();
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAdminRight(profile);

  useEffect(()=>{
    console.log("need update")
  },[profile]);

  const handleOnClickCategory = (id: string) => {
    navigate(`/category/${id}`);
  };

  const handleOnClickEditCategory = (id: string) => {
    const selectedCategory = categories.find((category) => category.id === id);
    console.log('categoryId = ', id);
    setSelectedId(id);
    if (selectedCategory) {
      setEditCategory(mapCategoryToEditForm(selectedCategory));
      openModal();
    }
  };

  const handleOnSaveCategory = () => {
    setEditCategory(null);
    closeModal();
  };

  const handleOnClickAddCategory = () => {
    const addCategory: CategoryAddInput | CategoryUpdateInput = {
      photo: null,
      name: undefined,
    };
    setSelectedId(null);
    setEditCategory(addCategory);
    openModal();
  };

  if (isLoading) {
    return <CustomSpin />;
  }

  return (
    <div className={clsx(style.main, className)}>
      {isAdmin && (
        <AddButton
          className={style.category_add}
          onClick={handleOnClickAddCategory}
          title={t('widgets.category.card')}
        />
      )}
      {categories.map((category) => (
        <CategoryCard
          onClickEdit={handleOnClickEditCategory}
          key={category.id}
          enableEdit={isAdmin}
          category={category}
          onClick={handleOnClickCategory}
        />
      ))}
      <Modal visible={isModalOpen} onClose={closeModal} title={t('widgets.product.edit')}>
        <CategoryEdit id={selectedId} categoryEdit={editCategory} onSave={handleOnSaveCategory} />
      </Modal>
    </div>
  );
});

CategoryList.displayName = 'CategoryList';
export default CategoryList;
