import { gql } from '@apollo/client';

export const PRODUCT = gql`
  fragment Product on Product {
    category {
      id
      createdAt
      name
      updatedAt
      commandId
    }
    commandId
    createdAt
    desc
    id
    name
    oldPrice
    photo
    price
    updatedAt
  }
`;
