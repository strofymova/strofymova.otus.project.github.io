import { gql } from '@apollo/client';
import { ORDER } from './fragments';
import { get } from 'unchanged';
import { OrderAddMutationsArgs } from '../../../entities/orders.types';
import { Mutation } from '../../../entities/base.types';

export type AddOrderVars = OrderAddMutationsArgs;
export type AddOrderResponse = Pick<Mutation, 'orders'>;

export const ADD_ORDER = gql`
  mutation Add($input: OrderAddInput!) {
    orders {
      add(input: $input) {
        ...Order
      }
    }
  }
  ${ORDER}
`;

export const extractAddOrder = (data: AddOrderResponse): Mutation['orders']['add'] => get('orders.add', data);
