import { ApolloClient, createHttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { storage } from '../shared/storage/storage';
import { TOKEN_KEY } from '../store/token';
import { errorLink } from './errorLink';
// import possibleTypes from './possibleTypes.json'
import { URL } from './config';

const httpLink = createHttpLink({
  uri: `${URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = storage.get(TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client: ApolloClient<unknown> = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    // possibleTypes,
  }),
});
