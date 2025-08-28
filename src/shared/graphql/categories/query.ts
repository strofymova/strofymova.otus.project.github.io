import { gql } from '@apollo/client';
import { Query } from '../../../entities/base.types';
import { CategoryGetQueryArgs } from '../../../entities/categories.types';
import { get } from 'unchanged';

export type GetCategoryQueryVars = CategoryGetQueryArgs;
export type GetCategoryResponseQueries = Pick<Query, 'categories'>;
export const GET_CATEGORY = gql`
  query getCategoryQuery($input: CategoryGetManyInput) {
    categories {
      getMany(input: $input) {
        data {
          id
          name
          photo
          createdAt
          updatedAt
          commandId
        }
      }
    }
  }
`;

export const extractGetCategories = (data: GetCategoryResponseQueries): GetCategoryResponseQueries['categories'] =>
  get('categories', data);
