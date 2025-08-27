import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import CustomSpin from '../../../widgets/spin/CustomSpin';
import ProductLayoutComponent from './ProductLayoutComponent';
import { useProductsLoader } from '../../../shared/hooks/useLoadProducts';
import { SortingInput } from '../../../entities/base.types';

interface IProductLayoutContainerProps {
  infinityScroll?: boolean;
}

const ProductLayoutContainer: React.FC<IProductLayoutContainerProps> = React.memo(({
  infinityScroll,
}: IProductLayoutContainerProps) => {
  const { id } = useParams();

  const {
    loading,
    isLoadingMore,
    hasMore,
    currentPage,
    productsTotalCount,
    sorting,
    loadMoreProducts,
    refetchWithNewSorting,
  } = useProductsLoader({
    categoryId: id,
    pageSize: 10,
  });

  const handleSortChange = useCallback(
    (newSorting: SortingInput) => {
      refetchWithNewSorting(newSorting);
    },
    [refetchWithNewSorting]
  );

  const handleShowMore = useCallback(() => {
    loadMoreProducts(currentPage + 1);
  }, [loadMoreProducts, currentPage]);

  const handleIntersection = useCallback(() => {
    if (infinityScroll) {
      handleShowMore();
    }
  }, [infinityScroll, handleShowMore]);

  if ((loading || isLoadingMore) && productsTotalCount === 0) {
    return <CustomSpin />;
  }

  return (
    <ProductLayoutComponent
      onShowMore={handleShowMore}
      onIntersection={handleIntersection}
      onSortChange={handleSortChange}
      infinityScroll={infinityScroll}
      hasMore={hasMore}
      currentSorting={sorting}
    />
  );
});

export default ProductLayoutContainer;
