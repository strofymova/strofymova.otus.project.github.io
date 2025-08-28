import { gql } from '@apollo/client';

export const ORDER = gql`
  fragment Order on Order {
    id
    status
    createdAt
    commandId
    products {
      _id
      product {
        id
        name
        price
        photo
      }
      quantity
    }
    updatedAt
    user {
      commandId
      id
      name
    }
  }
`;
