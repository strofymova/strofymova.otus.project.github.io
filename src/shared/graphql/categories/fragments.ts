import { gql } from '@apollo/client';

export const CATEGORY = gql`
  fragment Category on Category {
    id
    name
    photo
    commandId
    createdAt
    updatedAt
  }
`;
