import type { ErrorResponse } from '@apollo/client/link/error';
import { onError } from '@apollo/client/link/error';
import type { GraphQLFormattedError } from 'graphql';
import { NOT_AUTHORIZED_CODE } from './config';
import { store } from '../store';
import { tokenActions } from '../store/token';

export type Extensions = {
  code: string;
  field: string;
  value: string;
};

export const getGraphqlErrorExtensions = (errors: readonly GraphQLFormattedError[]): Extensions[] =>
  errors.map((err) => {
    const { extensions } = err;

    return extensions as Extensions;
  });

export const getErrorExtensions = (error: ErrorResponse): Extensions[] => {
  const { graphQLErrors } = error || {};
  if (graphQLErrors?.length) {
    return getGraphqlErrorExtensions(graphQLErrors);
  }
  return null;
};

export const errorLink = onError((error: ErrorResponse) => {
  const extensions = getErrorExtensions(error);
  if (extensions?.find((i) => i.code === NOT_AUTHORIZED_CODE)) {
    store.dispatch(tokenActions.logout());
  }
});
