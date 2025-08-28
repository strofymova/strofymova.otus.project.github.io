import { InputMaybe, Maybe, Scalars } from './base.types';

export type AuthResult = {
  __typename?: 'AuthResult';
  profile: Profile;
  token: Scalars['String']['output'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Profile = UserInterface & {
  __typename?: 'Profile';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  signUpDate: Scalars['String']['output'];
};

export type ProfileMutations = {
  __typename?: 'ProfileMutations';
  password?: Maybe<ProfilePasswordMutations>;
  signin: AuthResult;
  signup: AuthResult;
  update: Profile;
};

export type ProfileMutationsSigninArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ProfileMutationsSignupArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  commandId: Scalars['String']['input'];
};

export type ProfileMutationsUpdateArgs = {
  input: UpdateProfileInput;
};

export type ProfilePasswordMutations = {
  __typename?: 'ProfilePasswordMutations';
  change: ResetPassword;
};

export type ProfilePasswordMutationsChangeArgs = {
  input: ChangePasswordInput;
};

export type ResetPassword = {
  __typename?: 'ResetPassword';
  success: Scalars['Boolean']['output'];
};

export type UpdateProfileInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = UserInterface & {
  __typename?: 'User';
  about?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  signUpDate: Scalars['String']['output'];
};

export type UserFilters = {
  id: Scalars['ID']['input'];
};

export type UserInterface = {
  // about?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  signUpDate: Scalars['String']['output'];
};
