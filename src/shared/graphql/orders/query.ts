import { gql } from '@apollo/client';
import { Query } from '../../../entities/base.types';
import { OrderGetQueryArgs } from '../../../entities/orders.types';
import { get } from 'unchanged';

export type GetOrderQueryVars = OrderGetQueryArgs;
export type GetOrderResponseQueries = Pick<Query, 'orders'>;
export const GET_ORDER = gql`
  query getOrderQuery($input: OrderGetManyInput) {
    orders {
      getMany(input: $input) {
        data {
          createdAt
          id
          products {
            _id
            product {
              name
              price
              id
            }
            quantity
          }
          status
        }
        pagination {
          pageNumber
          total
          pageSize
        }
      }
    }
  }
`;

export const extractGetOrders = (data: GetOrderResponseQueries): GetOrderResponseQueries['orders'] =>
  get('orders', data);
