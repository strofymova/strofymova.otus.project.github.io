import { gql } from '@apollo/client';
import { get } from 'unchanged';
import { CATEGORY } from './fragments';
import {
  AddCategoryMutationsArgs,
  PatchCategoryMutationsArgs,
  PutCategoryMutationsArgs,
  RemoveCategoryMutationsArgs,
} from '../../../entities/categories.types';
import { Mutation } from '../../../entities/base.types';

export type AddCategoryVars = AddCategoryMutationsArgs;
export type AddCategoryResponse = Pick<Mutation, 'categories'>;

export const ADD_CATEGORY = gql`
  mutation Add($input: CategoryAddInput!) {
    categories {
      add(input: $input) {
        ...Category
      }
    }
  }
  ${CATEGORY}
`;

export const extractAddCategory = (data: AddCategoryResponse): Mutation['categories']['add'] =>
  get('categories.add', data);

export type PutCategoryVars = PutCategoryMutationsArgs;
export type UpdateCategoryResponse = Pick<Mutation, 'categories'>;

export const PATCH_CATEGORY = gql`
  mutation Patch($patchId: ID!, $input: CategoryUpdateInput!) {
    categories {
      patch(id: $patchId, input: $input) {
        ...Category
      }
    }
  }
  ${CATEGORY}
`;

export type PatchCategoryVars = PatchCategoryMutationsArgs;
export const extractPatchCategory = (data: UpdateCategoryResponse): Mutation['categories']['patch'] =>
  get('categories.patch', data);

export const PUT_CATEGORY = gql`
  mutation Put($putId: ID!, $input: CategoryUpdateInput!) {
    categories {
      put(id: $putId, input: $input) {
        ...Category
      }
    }
  }
  ${CATEGORY}
`;

export const extractPutCategory = (data: UpdateCategoryResponse): Mutation['categories']['put'] =>
  get('categories.put', data);

export type RemoveProductVars = RemoveCategoryMutationsArgs;
export type RemoveProductResponse = Pick<Mutation, 'categories'>;
export const REMOVECATEGORY = gql`
  mutation Remove($removeId: ID!) {
    categories {
      remove(id: $removeId) {
        ...Category
      }
    }
  }
  ${CATEGORY}
`;

export const extractRemoveCategory = (data: UpdateCategoryResponse): Mutation['categories']['remove'] =>
  get('categories.remove', data);
