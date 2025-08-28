import { gql } from '@apollo/client';
import { Query } from '../../../entities/base.types';
import { ProductGetQueryArgs } from '../../../entities/products.types';
import { get } from 'unchanged';

export type GetProductsVars = ProductGetQueryArgs;
export type GetProductResponseQueries = Pick<Query, 'products'>;
export const GET_PRODUCTS = gql`
  query getProductsQuery($input: ProductGetManyInput) {
    products {
      getMany(input: $input) {
        data {
          category {
            id
            name
          }
          desc
          id
          name
          photo
          price
        }
        pagination {
          pageNumber
          pageSize
          total
        }
      }
    }
  }
`;

export const extractGetProducts = (data: GetProductResponseQueries): GetProductResponseQueries['products'] =>
  get('products', data);
