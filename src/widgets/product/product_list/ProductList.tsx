import { clsx } from 'clsx';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import style from './product_list.module.css';
import { Product, ProductAddInput, ProductUpdateInput } from '../../../entities/products.types';
import { productsSelectors } from '../../../store/products';
import { profileSelectors } from '../../../store/profile';
import { useIntersectionObserver } from '../../../shared/hooks/useIntersectionOrserver';
import { useModalManager } from '../../../shared/hooks/useModalManager';
import { useAdminRight } from '../../../shared/hooks/useAdminRight';
import CustomSpin from '../../../widgets/spin/CustomSpin';
import { AddButton } from '../../../widgets/add_button';
import { ProductCard } from '../product_card';
import Modal from '../../../widgets/modal/Modal';
import { ProductEdit } from '../product_edit';

export interface IProductList {
  className?: string;
  onIntersection?: () => void;
  infinityScroll: boolean;
}

const mapProductToEditForm = ({ category, name, desc, price, photo }: Product) => ({
  categoryId: category?.id ?? '',
  name: name ?? '',
  desc: desc ?? '',
  price: price ?? 0,
  photo: photo ?? null,
});

export const ProductList: React.FC<IProductList> = React.memo(
  ({ className, onIntersection, infinityScroll: infinityScroll = false }: IProductList): React.ReactNode => {
    const lastProductRef = useRef<HTMLDivElement>(null);
    const products = useSelector(productsSelectors.get);
    const profile = useSelector(profileSelectors.get);

    useIntersectionObserver(
      lastProductRef,
      (entry) => {
        if (entry.isIntersecting) {
          onIntersection();
        }
      },
      { threshold: 1 }
    );
    const { t } = useTranslation();
    const { isModalOpen, openModal, closeModal } = useModalManager();

    const [editProduct, setEditProduct] = useState<ProductAddInput | ProductUpdateInput>();
    const [selectedId, setSelectedId] = useState<string>();

    const { isAdmin, isLoading } = useAdminRight(profile);

    const handleOnClickProduct = (id: string) => {
      const selectedProduct = products.find((product) => product.id === id);
      setSelectedId(id);
      if (selectedProduct) {
        setEditProduct(mapProductToEditForm(selectedProduct));
        openModal();
      }
    };

    const handleOnSaveProduct = () => {
      setEditProduct(null);
      closeModal();
    };

    const handleOnClickAddProduct = () => {
      const addProduct: ProductAddInput | ProductUpdateInput = {
        price: undefined,
        photo: null,
        name: undefined,
        desc: undefined,
        categoryId: undefined,
      };
      setSelectedId(null);
      setEditProduct(addProduct);
      openModal();
    };

    if (isLoading) {
      return <CustomSpin />;
    }

    return (
      <div className={clsx(style.main, className)}>
        {isAdmin && <AddButton onClick={handleOnClickAddProduct} title={t('widgets.product.card')}></AddButton>}
        {products.map((product, index) => {
          const isLast = index === products.length - 1;
          return (
            <ProductCard
              onClick={handleOnClickProduct}
              ref={infinityScroll && isLast ? lastProductRef : null}
              key={product.id}
              disable={!isAdmin}
              product={product}
            />
          );
        })}
        <Modal visible={isModalOpen} onClose={closeModal} title={t('widgets.product.edit')}>
          <ProductEdit id={selectedId} productEdit={editProduct} onSave={handleOnSaveProduct} />
        </Modal>
      </div>
    );
  }
);

ProductList.displayName = 'ProductList';
export default ProductList;
