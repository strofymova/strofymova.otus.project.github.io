import { gql } from '@apollo/client';

export const PROFILE = gql`
  fragment Profile on Profile {
    email
    id
    name
    signUpDate
  }
`;
