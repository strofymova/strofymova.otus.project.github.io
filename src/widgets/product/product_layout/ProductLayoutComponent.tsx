import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './product_layout.module.css';
import FilterLayout from '../../../widgets/filter/FilterLayout';
import { useNavigate } from 'react-router-dom';
import { SortingInput } from '../../../entities/base.types';
import { useThemeStyles } from '../../../shared/hooks/useThemeStyles';
import ProductList from '../product_list/ProductList';

interface IProductLayoutComponentProps {
  onShowMore: () => void;
  onIntersection: () => void;
  infinityScroll?: boolean;
  hasMore?: boolean;
  onSortChange: (newSorting: SortingInput) => void;
  currentSorting: SortingInput;
  categoryId?: string | null;
}

const ProductLayoutComponent: React.FC<IProductLayoutComponentProps> = React.memo(
  ({ onShowMore, onIntersection, infinityScroll, hasMore, onSortChange, currentSorting, categoryId }) => {
    const { t } = useTranslation();
    const minWidthFilter = 200;
    const containerRef = useRef<HTMLDivElement>(null);
    const [productListStyle, setProductListStyle] = useState(styles.products);
    const navigate = useNavigate();
    const styleName = useThemeStyles(styles.showMoreBtn, {
      light: styles.light,
      dark: styles.dark,
    });

    useLayoutEffect(() => {
      if (!containerRef.current) return;

      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const widthFilter = entry.contentRect.width;
          if (widthFilter < minWidthFilter && productListStyle === styles.productsSmall) {
            setProductListStyle(styles.products);
          } else if (widthFilter >= minWidthFilter && productListStyle === styles.products) {
            setProductListStyle(styles.productsSmall);
          }
        }
      });

      observer.observe(containerRef.current);
    }, [productListStyle]);

    const onClickPrev = () => {
      navigate(-1);
    };

    return (
      <>
        <div className={styles.content_container}>
          <FilterLayout ref={containerRef} sorting={currentSorting} onChangeSort={onSortChange} />
          <ProductList
            className={productListStyle}
            categoryId={categoryId}
            onIntersection={onIntersection}
            infinityScroll={infinityScroll}
          />
        </div>
        <div className={styles.content_button}>
          <button className={styleName} onClick={onClickPrev}>
            {t('widgets.back')}
          </button>
          <button className={styleName} onClick={onShowMore} disabled={!hasMore}>
            {t('widgets.product.showMore')}
          </button>
        </div>
      </>
    );
  }
);

ProductLayoutComponent.displayName = 'ProductLayoutComponent';
export default ProductLayoutComponent;
