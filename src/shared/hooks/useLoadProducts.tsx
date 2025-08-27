import { useQuery } from '@apollo/client';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortingInput } from '../../entities/base.types';
import { AppDispatch } from '../../store';
import { productsActions, productsSelectors } from '../../store/products';
import { GET_PRODUCTS, GetProductResponseQueries, GetProductsVars } from '../graphql/products/query';

interface UseProductsLoaderProps {
  categoryId?: string;
  pageSize?: number;
  initialSorting?: SortingInput;
}

interface UseProductsLoaderReturn {
  loading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  currentPage: number;
  productsTotalCount: number;
  sorting: SortingInput;
  loadMoreProducts: (page: number) => Promise<void>;
  setSorting: (sorting: SortingInput) => void;
  refetchWithNewSorting: (newSorting: SortingInput) => void;
}

export const useProductsLoader = ({
  categoryId,
  pageSize = 10,
  initialSorting = { type: 'ASC', field: 'name' },
}: UseProductsLoaderProps): UseProductsLoaderReturn => {
  const dispatch = useDispatch<AppDispatch>();

  const productsTotalCount = useSelector(productsSelectors.getTotalCount);
  const currentPage = useSelector(productsSelectors.getLastPage);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sorting, setSorting] = useState<SortingInput>(initialSorting);

  const variables = useMemo(
    (): GetProductsVars => ({
      input: {
        categoryIds: categoryId ? [categoryId] : null,
        pagination: {
          pageNumber: 1,
          pageSize,
        },
        sorting,
      },
    }),
    [categoryId, pageSize, sorting]
  );

  const { loading, fetchMore, refetch } = useQuery<GetProductResponseQueries, GetProductsVars>(GET_PRODUCTS, {
    variables,
    onCompleted: (data) => {
      if (data?.products?.getMany) {
        const productResponse = data.products.getMany;
        const products = productResponse.data;
        dispatch(
          productsActions.set({
            items: products,
            lastPage: productResponse.pagination.pageNumber,
            totalCount: productResponse.pagination.total,
          })
        );
        setHasMore(productsTotalCount < productResponse.pagination.total);
      }
    },
    onError: (error) => {
      console.error('Unable to load products:', error);
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  const loadMoreProducts = useCallback(
    async (page: number) => {
      if (!hasMore || loading || isLoadingMore) return;

      setIsLoadingMore(true);

      try {
        await fetchMore({
          variables: {
            input: {
              categoryIds: categoryId ? [categoryId] : null,
              pagination: {
                pageNumber: page,
                pageSize,
              },
              sorting,
            },
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prevResult;

            const productResponse = fetchMoreResult.products.getMany;
            const newProducts = productResponse.data;

            dispatch(
              productsActions.add({
                items: newProducts,
                lastPage: productResponse.pagination.pageNumber,
                totalCount: productResponse.pagination.total,
              })
            );

            setHasMore(productsTotalCount + productResponse.pagination.total < productResponse.pagination.total);

            return {
              ...prevResult,
              products: {
                ...prevResult.products,
                getMany: {
                  ...prevResult.products.getMany,
                  data: [...prevResult.products.getMany.data, ...newProducts],
                  pagination: productResponse.pagination,
                },
              },
            };
          },
        });
      } catch (error) {
        console.error('Error loading more products:', error);
      } finally {
        setIsLoadingMore(false);
      }
    },
    [hasMore, loading, isLoadingMore, fetchMore, categoryId, pageSize, sorting, dispatch, productsTotalCount]
  );

  const refetchWithNewSorting = useCallback(
    async (newSorting: SortingInput) => {
      setSorting(newSorting);

      // Сбрасываем состояние при изменении сортировки
      dispatch(productsActions.reset());
      setHasMore(true);

      await refetch({
        input: {
          categoryIds: categoryId ? [categoryId] : null,
          pagination: {
            pageNumber: 1,
            pageSize,
          },
          sorting: newSorting,
        },
      });
    },
    [refetch, categoryId, pageSize, dispatch]
  );

  return {
    loading,
    isLoadingMore,
    hasMore,
    currentPage,
    productsTotalCount,
    sorting,
    loadMoreProducts,
    setSorting,
    refetchWithNewSorting,
  };
};
