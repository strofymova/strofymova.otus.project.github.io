import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, message } from 'antd';
import { clsx } from 'clsx';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import unknowCategory from '../../../assets/unknown_category.png';
import style from './category_edit.module.css';
import CategoryEditItem from './CategoryEditItem';
import { CategoryAddInput, CategoryUpdateInput } from '../../../entities/categories.types';
import { useThemeStyles } from '../../../shared/hooks/useThemeStyles';
import { createErrorHandlers } from '../../../shared/helpers/createErrorHandlers';
import {
  ADD_CATEGORY,
  AddCategoryResponse,
  AddCategoryVars,
  PUT_CATEGORY,
  PutCategoryVars,
  UpdateCategoryResponse,
} from '../../../shared/graphql/categories/mutations';
import { categoriesActions } from '../../../store/categories';

const categorySchema = z.object({
  name: z.string().nonempty('errors.is_required'),
  photo: z.union([z.string(), z.null()]).optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export interface ICategoryEdit {
  categoryEdit: CategoryAddInput | CategoryUpdateInput;
  onSave?: (editCategory: ICategoryEdit) => void;
  id?: string;
}

export function CategoryEdit({ id, categoryEdit: { name, photo }, onSave: onSave }: ICategoryEdit) {
  const { t } = useTranslation();
  const styleName = useThemeStyles(style.main, {
    light: style.light,
    dark: style.dark,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name, photo },
    mode: 'onBlur',
  });

  const { catcher } = createErrorHandlers((code, _, error) => {
    if (code === null) {
      message.error(t(`errors.${error.message}`));
    } else {
      message.error(t(`errors.${code}`));
    }
  });
  const dispatcher = useDispatch();

  const [updateCategory] = useMutation<UpdateCategoryResponse, PutCategoryVars>(PUT_CATEGORY, {
    fetchPolicy: 'no-cache',
  });
  const handleOnUpdateCategory = (categoryData: ICategoryEdit) => {
    updateCategory({ variables: { putId: categoryData.id, input: categoryData.categoryEdit as CategoryUpdateInput } })
      .then((res) => {
        console.log('Category id ', id);
        if (res.data && res.data.categories) {
          console.log('Category updated');
          dispatcher(categoriesActions.save(res.data.categories.put));
        }
      })
      .catch(catcher);
  };

  const [insertCategory] = useMutation<AddCategoryResponse, AddCategoryVars>(ADD_CATEGORY, {
    fetchPolicy: 'no-cache',
  });
  const handleOnInsertCategory = (categoryData: ICategoryEdit) => {
    insertCategory({ variables: { input: categoryData.categoryEdit as CategoryAddInput } })
      .then((res) => {
        if (res.data && res.data.categories) {
          console.log('Category inserted');
          dispatcher(categoriesActions.save(res.data.categories.add));
        }
      })
      .catch(catcher);
  };

  const onSubmit: SubmitHandler<CategoryFormData> = (data) => {
    console.log('Submitted data:', data, ', id =', id);
    const categoryData: ICategoryEdit = {
      id: id,
      categoryEdit: {
        name: data.name,
        photo: data.photo,
      },
    };

    if (id === null) {
      handleOnInsertCategory(categoryData);
    } else {
      handleOnUpdateCategory(categoryData);
    }

    if (onSave) onSave(categoryData);
  };

  return (
    <form
      className={clsx(styleName, style.edit)}
      onSubmit={(e) => {
        console.log('Form submitted');
        handleSubmit(onSubmit)(e);
        console.log('Form errors:', JSON.stringify(errors));
      }}
    >
      <img className={style.img} src={photo || unknowCategory} alt={name} />
      <div className={style.info}>
        <CategoryEditItem
          {...register('name')}
          type="text"
          title={t('widgets.category.name')}
          error={errors.name?.message && t(errors.name.message)}
        />
        <CategoryEditItem
          {...register('photo')}
          type="text"
          className={clsx(style.category_edit_item, style.link)}
          title={t('widgets.category.photo')}
          error={errors.photo?.message && t(errors.photo.message)}
        />
        <div>
          <Button className={style.button} htmlType="submit">
            {t('widgets.save')}
          </Button>
        </div>
      </div>
    </form>
  );
}

CategoryEdit.displayName = 'CategoryEdit';
export default CategoryEdit;
