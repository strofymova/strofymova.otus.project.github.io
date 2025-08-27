import { CategoryMutations, CategoryQueries } from './categories.types';
import { OrderMutations, OrderQueries } from './orders.types';
import { Product, ProductMutations, ProductQueries } from './products.types';
import { Profile, ProfileMutations } from './profile.types';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: string; output: string };
};

export type Query = {
  __typename?: 'Query';
  profile?: Maybe<Profile>;
  products?: Maybe<ProductQueries>;
  orders?: Maybe<OrderQueries>;
  categories?: Maybe<CategoryQueries>;
};

export type Mutation = {
  __typename?: 'Mutation';
  products?: Maybe<ProductMutations>;
  profile?: Maybe<ProfileMutations>;
  categories?: Maybe<CategoryMutations>;
  orders?: Maybe<OrderMutations>;
};

export type DateRange = {
  __typename?: 'DateRange';
  gte?: Maybe<Scalars['Date']['output']>;
  lte?: Maybe<Scalars['Date']['output']>;
};

export type PaginationInput = {
  __typename?: 'PaginationInput';
  pageNumber?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
};

export type ResponsePagination = {
  pageNumber?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type SortField = 'id' | 'createdAt' | 'updatedAt' | 'date' | 'name';

export type SortType = 'ASC' | 'DESC';

export type SortingInput = {
  __typename?: 'SortingInput';
  field?: Maybe<SortField>;
  type?: Maybe<SortType>;
};

export type Sorting = {
  field?: Maybe<SortField>;
  type?: Maybe<SortType>;
};

export type BasketProduct = {
  product: Product;
  count: number;
};
