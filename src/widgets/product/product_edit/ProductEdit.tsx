import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, message } from 'antd';
import { clsx } from 'clsx';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import unknowImageUrl from '../../../assets/not_found.png';
import { Category } from '../../../entities/categories.types';
import { ProductAddInput, ProductUpdateInput } from '../../../entities/products.types';
import {
  ADD_PRODUCT,
  AddProductResponse,
  AddProductVars,
  PUT_PRODUCT,
  PutProductVars,
  UpdateProductResponse,
} from '../../../shared/graphql/products/mutations';
import { createErrorHandlers } from '../../../shared/helpers/createErrorHandlers';
import { useThemeStyles } from '../../../shared/hooks/useThemeStyles';
import { basketActions } from '../../../store/basket';
import { categoriesSelectors } from '../../../store/categories';
import { productsActions } from '../../../store/products';
import style from './product_edit.module.css';
import ProductEditItem from './ProductEditItem';
import ProductEditSelect from './ProductEditSelect';

const productSchema = z.object({
  name: z.string().min(1, 'errors.is_required'),
  price: z.number().min(0.01, { message: 'errors.invalid_price' }),
  desc: z.union([z.string().max(10000, 'errors.invalid_description'), z.null()]),
  photo: z.string().nullish(),
  categoryId: z.string().min(1, { message: 'errors.is_required' }),
});

type ProductFormData = z.infer<typeof productSchema>;

export interface IProductEdit {
  productEdit: ProductAddInput | ProductUpdateInput;
  onSave?: (editProduct: IProductEdit) => void;
  id: string | null;
}

export function ProductEdit({
  id,
  productEdit: { price, name, desc, photo, categoryId },
  onSave: onSave,
}: IProductEdit) {
  const { t } = useTranslation();
  const styleName = useThemeStyles(style.main, {
    light: style.light,
    dark: style.dark,
  });

  const categories: Category[] = useSelector(categoriesSelectors.get);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { price, name, desc, photo, categoryId },
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

  const [updateProduct] = useMutation<UpdateProductResponse, PutProductVars>(PUT_PRODUCT, {
    fetchPolicy: 'no-cache',
  });
  const handleOnSaveUpdateProduct = (productData: IProductEdit) => {
    updateProduct({ variables: { putId: productData.id, input: productData.productEdit as ProductUpdateInput } })
      .then((res) => {
        if (res) {
          console.log('Product updated');
          dispatcher(productsActions.save(res.data.products.put));
          dispatcher(basketActions.update(res.data.products.put));
        }
      })
      .catch(catcher);
  };

  const [insertProduct] = useMutation<AddProductResponse, AddProductVars>(ADD_PRODUCT, {
    fetchPolicy: 'no-cache',
  });
  const handleOnInsertUpdateProduct = (productData: IProductEdit) => {
    insertProduct({ variables: { input: productData.productEdit as ProductAddInput } })
      .then((res) => {
        if (res) {
          console.log('Product inserted');
          dispatcher(productsActions.save(res.data.products.add));
        }
      })
      .catch(catcher);
  };

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    console.log('Submitted data:', data);
    const productData: IProductEdit = {
      id: id,
      productEdit: {
        name: data.name,
        price: data.price,
        desc: data.desc,
        photo: data.photo,
        categoryId: data.categoryId,
      },
    };

    if (id === null) {
      handleOnInsertUpdateProduct(productData);
    } else {
      handleOnSaveUpdateProduct(productData);
    }

    if (onSave) onSave(productData);
  };

  return (
    <form
      className={clsx(styleName, style.edit)}
      onSubmit={(e) => {
        console.log('Form submitted');
        handleSubmit(onSubmit)(e);
        // console.log(JSON.stringify(e.));
      }}
    >
      <img className={style.img} src={photo || unknowImageUrl} alt={name} />
      <div className={style.info}>
        <ProductEditItem
          {...register('price', { valueAsNumber: true })}
          type="number"
          step="0.01"
          title={t('widgets.product.cost')}
          error={errors.price?.message && t(errors.price.message)}
        />
        <ProductEditItem
          {...register('name')}
          type="text"
          title={t('widgets.product.name')}
          error={errors.name?.message && t(errors.name.message)}
        />
        <ProductEditItem
          {...register('photo')}
          type="text"
          title={t('widgets.product.photo')}
          error={errors.photo?.message && t(errors.photo.message)}
        />
        <ProductEditSelect {...register('categoryId')} dataList={categories} title={t('widgets.product.category')} />
        <ProductEditItem
          {...register('desc')}
          type="text"
          className={clsx(style.product_edit_item, style.desc)}
          title={t('widgets.product.description')}
          error={errors.desc?.message && t(errors.desc.message)}
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

ProductEdit.displayName = 'ProductEdit';
export default ProductEdit;
