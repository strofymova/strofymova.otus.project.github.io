import { Product } from './products.types';
import { DateRange, Maybe, PaginationInput, ResponsePagination, Scalars, Sorting, SortingInput } from './base.types';
import { User } from './profile.types';

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID']['output'];
  createdAt: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['String']['output']>;
  commandId: Maybe<Scalars['String']['output']>;
  products: Maybe<OrderProduct>[];
  status: Maybe<OrderStatus>;
  user: Maybe<User>;
};

export type OrderMutations = {
  __typename?: 'OrderMutations';
  add?: Maybe<Order>;
  patch?: Maybe<Order>;
  put?: Maybe<Order>;
  remove?: Maybe<Order>;
};

export type ProductInput = {
  __typename?: 'ProductInput';
  id: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type OrderAddInput = {
  __typename?: 'OrderAddInput';
  products: Maybe<ProductInput>[];
  status?: Maybe<OrderStatus>;
};

export type OrderAddMutationsArgs = {
  input: OrderAddInput;
};

export type OrderUpdateInput = {
  __typename?: 'OrderUpdateInput';
  products: Maybe<ProductInput>[];
  status?: Maybe<OrderStatus>;
};

export type OrderPutMutationsArgs = {
  putId: Scalars['ID']['input'];
  input: OrderUpdateInput;
};

export type OrderPatchMutationsArgs = {
  patchId: Scalars['ID']['input'];
  input: OrderUpdateInput;
};

export type OrderRemoveMutationsArgs = {
  id: Scalars['ID']['input'];
};

export type OrderQueries = {
  __typename?: 'OrderQueries';
  getMany: Maybe<OrderResponse>;
};

export type OrderProduct = {
  __typename?: 'OrderProduct';
  id: Scalars['ID']['output'];
  product: Maybe<Product>;
  quantity: Maybe<Scalars['Int']['output']>;
};

export type OrderStatus =
  | 'PendingConfirmation'
  | 'Processing'
  | 'Packaging'
  | 'WaitingForDelivery'
  | 'InTransit'
  | 'Delivered'
  | 'ReturnRequested'
  | 'OrderCancelled';

export type OrderResponse = {
  __typename?: 'OrderResponse';
  data: Maybe<Order>[];
  pagination: Maybe<ResponsePagination>;
  sorting: Maybe<Sorting>;
};

export type OrderGetManyInput = {
  __typename?: 'OrderGetManyInput';
  createdAt?: Maybe<DateRange>;
  ids: Maybe<Scalars['String']['input']>[];
  pagination: Maybe<PaginationInput>;
  productIds: Maybe<Scalars['String']['input']>[];
  status?: Maybe<OrderStatus>;
  updatedAt?: Maybe<DateRange>;
  sorting?: Maybe<SortingInput>;
  userId?: Maybe<Scalars['ID']['input']>;
};

export type OrderGetQueryArgs = {
  input: OrderGetManyInput;
};
