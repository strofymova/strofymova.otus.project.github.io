import { DateRange, Maybe, PaginationInput, ResponsePagination, Scalars, Sorting, SortingInput } from './base.types';

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['String']['output']>;
  commandId: Maybe<Scalars['String']['output']>;
};

export type CategoryMutations = {
  __typename?: 'CategoryMutations';
  add?: Maybe<Category>;
  patch?: Maybe<Category>;
  put?: Maybe<Category>;
  remove?: Maybe<Category>;
};

export type CategoryQueries = {
  __typename?: 'CategoryQueries';
  getMany: Maybe<CategoriesResponse>;
};

export type CategoryAddInput = {
  __typename?: 'CategoryAddInput';
  name: Scalars['String']['input'];
  photo?: Maybe<Scalars['String']['input']>;
};

export type CategoryUpdateInput = {
  __typename?: 'CategoryAddInput';
  name: Scalars['String']['input'];
  photo?: Maybe<Scalars['String']['input']>;
};

export type AddCategoryMutationsArgs = {
  input: CategoryAddInput;
};

export type PutCategoryMutationsArgs = {
  putId: Scalars['ID']['input'];
  input: CategoryUpdateInput;
};

export type PatchCategoryMutationsArgs = {
  patchId: Scalars['ID']['input'];
  input: CategoryUpdateInput;
};

export type RemoveCategoryMutationsArgs = {
  id: Scalars['ID']['input'];
};

export type CategoriesResponse = {
  __typename?: 'CategoriesResponse';
  data: Maybe<Category>[];
  pagination: Maybe<ResponsePagination>;
  sorting: Maybe<Sorting>;
};

export type CategoryGetManyInput = {
  __typename?: 'CategoryGetManyInput';
  createdAt?: Maybe<DateRange>;
  ids?: Maybe<Scalars['String']['input']>[];
  pagination: Maybe<PaginationInput>;
  sorting?: Maybe<SortingInput>;
  updatedAt?: Maybe<DateRange>;
};

export type CategoryGetQueryArgs = {
  input: CategoryGetManyInput;
};
