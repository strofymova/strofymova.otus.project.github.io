import { gql } from '@apollo/client';
import { PRODUCT } from './fragments';
import { get } from 'unchanged';
import {
  AddProductMutationsArgs,
  PatchProductMutationsArgs,
  PutProductMutationsArgs,
  RemoveProductMutationsArgs,
} from '../../../entities/products.types';
import { Mutation } from '../../../entities/base.types';

export type AddProductVars = AddProductMutationsArgs;
export type AddProductResponse = Pick<Mutation, 'products'>;

export const ADD_PRODUCT = gql`
  mutation Add($input: ProductAddInput!) {
    products {
      add(input: $input) {
        ...Product
      }
    }
  }
  ${PRODUCT}
`;

export const extractAddProduct = (data: AddProductResponse): Mutation['products']['add'] => get('products.add', data);

export type PatchProductVars = PatchProductMutationsArgs;
export type UpdateProductResponse = Pick<Mutation, 'products'>;

export const PATCH_PRODUCT = gql`
  mutation Patch($patchId: ID!, $input: ProductUpdateInput!) {
    products {
      patch(id: $patchId, input: $input) {
        ...Product
      }
    }
  }
  ${PRODUCT}
`;

export const extractPatchProduct = (data: UpdateProductResponse): Mutation['products']['patch'] =>
  get('products.patch', data);

export type PutProductVars = PutProductMutationsArgs;
export const PUT_PRODUCT = gql`
  mutation Put($putId: ID!, $input: ProductUpdateInput!) {
    products {
      put(id: $putId, input: $input) {
        ...Product
      }
    }
  }
  ${PRODUCT}
`;

export const extractPutProduct = (data: UpdateProductResponse): Mutation['products']['put'] =>
  get('products.put', data);

export type RemoveProductVars = RemoveProductMutationsArgs;
export type RemoveProductResponse = Pick<Mutation, 'products'>;
export const REMOVE_PRODUCT = gql`
  mutation Remove($removeId: ID!) {
    products {
      remove(id: $removeId) {
        ...Product
      }
    }
  }
  ${PRODUCT}
`;

export const extractRemoveProduct = (data: UpdateProductResponse): Mutation['products']['remove'] =>
  get('products.remove', data);
