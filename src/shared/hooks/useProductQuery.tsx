import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { GET_PRODUCTS, GetProductResponseQueries, GetProductsVars } from '../graphql/products/query';
import { productsActions } from 'src/store/products';

interface UseProductsQueryOptions {
  pageNumber?: number;
  pageSize?: number;
  fetchPolicy?: 'cache-first' | 'network-only' | 'cache-and-network';
}

export const useProductsQuery = (options?: UseProductsQueryOptions) => {
  const dispatch = useDispatch();

  const variables: GetProductsVars = {
    input: {
      pagination: {
        pageNumber: options?.pageNumber || 1,
        pageSize: options?.pageSize || 10,
      },
    },
  };

  return useQuery<GetProductResponseQueries, GetProductsVars>(GET_PRODUCTS, {
    variables,
    onCompleted: (data) => {
      if (data?.products?.getMany?.data) {
        // dispatch(productsActions.set(data.products.getMany.data));
        const products = data.products.getMany.data;
        dispatch(productsActions.set({ items: products, lastPage: 1, totalCount: products.length }));
      }
    },
    onError: (error) => {
      console.error('Unable to load products', error);
    },
    fetchPolicy: options?.fetchPolicy || 'network-only',
  });
};
