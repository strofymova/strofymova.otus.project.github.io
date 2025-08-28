import { gql } from '@apollo/client';
import { Mutation } from '../../../entities/base.types';
import {
  AuthResult,
  ProfileMutationsSigninArgs,
  ProfileMutationsSignupArgs,
  ProfileMutationsUpdateArgs,
} from '../../../entities/profile.types';
import { get } from 'unchanged';
import { PROFILE } from './fragments';

export type UpdateProfileVars = ProfileMutationsUpdateArgs;
export type UpdateProfileResponse = Pick<Mutation, 'profile'>;
export const UPDATE_PROFILE = gql`
  mutation updateProfile($input: UpdateProfileInput!) {
    profile {
      update(input: $input) {
        ...Profile
      }
    }
  }
  ${PROFILE}
`;

export const extractUpdateProfile = (data: UpdateProfileResponse): Mutation['profile']['update'] =>
  get('profile.update', data);

export type SignInVars = ProfileMutationsSigninArgs;
export type SignInResponse = Pick<Mutation, 'profile'>;
export const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    profile {
      signin(email: $email, password: $password) {
        token
      }
    }
  }
`;

export const extractSignIn = (data: SignInResponse): Mutation['profile']['signin'] => get('profile.signin', data);

export type SignUpVars = ProfileMutationsSignupArgs;
export type SignUpResponse = AuthResult;
export const SIGN_UP = gql`
  mutation signUp($email: String!, $password: String!, $commandId: String!) {
    profile {
      signup(email: $email, password: $password, commandId: $commandId) {
        token
      }
    }
  }
`;

export const extractSignUp = (data: SignUpResponse): Mutation['profile']['signup'] => get(`profile.signup`, data);
