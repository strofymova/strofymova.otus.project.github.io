import { Category } from './categories.types';
import { DateRange, Maybe, PaginationInput, ResponsePagination, Scalars, Sorting, SortingInput } from './base.types';

export type Product = {
  __typename?: 'Products';
  commandId: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Maybe<Scalars['String']['output']>;
  desc?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  price: Maybe<Scalars['Float']['output']>;
  category: Maybe<Category>;
  createdAt: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['String']['output']>;
  oldPrice?: Maybe<Scalars['Float']['output']>;
};

export type ProductMutations = {
  __typename?: 'ProductMutations';
  add?: Maybe<Product>;
  patch?: Maybe<Product>;
  put?: Maybe<Product>;
  remove?: Maybe<Product>;
};

export type ProductQueries = {
  __typename?: 'ProductQueries';
  getMany?: Maybe<ProductResponse>;
};

export type ProductGetQueryArgs = {
  input: ProductGetManyInput;
};

export type ProductGetManyInput = {
  __typename?: 'ProductGetManyInput';
  categoryIds?: Maybe<Scalars['ID']['input']>[];
  createdAt?: Maybe<DateRange>;
  ids?: Maybe<Scalars['ID']['input']>[];
  name?: Maybe<Scalars['String']['input']>;
  pagination?: Maybe<PaginationInput>;
  sorting?: Maybe<SortingInput>;
  updatedAt?: Maybe<DateRange>;
};

export type ProductAddInput = {
  __typename?: 'ProductAddInput';
  categoryId: Maybe<Scalars['String']['input']>;
  desc?: Maybe<Scalars['String']['input']>;
  name: Maybe<Scalars['String']['input']>;
  photo?: Maybe<Scalars['String']['input']>;
  price: Maybe<Scalars['Float']['input']>;
};

export type AddProductMutationsArgs = {
  input: ProductAddInput;
};

export type PutProductMutationsArgs = {
  putId: Scalars['ID']['input'];
  input: ProductUpdateInput;
};

export type PatchProductMutationsArgs = {
  patchId: Scalars['ID']['input'];
  input: ProductUpdateInput;
};

export type RemoveProductMutationsArgs = {
  id: Scalars['ID']['input'];
};

export type ProductUpdateInput = {
  __typename?: 'ProductUpdateInput';
  categoryId?: Maybe<Scalars['String']['input']>;
  desc?: Maybe<Scalars['String']['input']>;
  name?: Maybe<Scalars['String']['input']>;
  photo?: Maybe<Scalars['String']['input']>;
  price?: Maybe<Scalars['Float']['input']>;
  oldPrice?: Maybe<Scalars['Float']['input']>;
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  data?: Maybe<Product>[];
  pagination?: Maybe<ResponsePagination>;
  sorting?: Maybe<Sorting>;
};
