import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CATEGORY, GetCategoryResponseQueries } from '../../shared/graphql/categories/query';
import { RootState } from '../../store';
import { categoriesActions } from '../../store/categories';
import { profileActions } from '../../store/profile';
import { tokenSelectors } from '../../store/token';
import { GET_PROFILE, GetProfileResponse } from '../graphql/profile/query';

export const useInitialization = () => {
  const [error, setError] = useState<string | null>(null);

  const token = useSelector(tokenSelectors.get);
  const isAuth = token != null && token != undefined;

  const dispatch = useDispatch();
  const {
    refetch: refetchProfile,
    loading: profileLoading,
    error: profileError,
  } = useQuery<GetProfileResponse>(GET_PROFILE, {
    skip: !isAuth,
    onCompleted: (data) => {
      if (data.profile) {
        dispatch(profileActions.set(data.profile));
      }
    },
    onError: (profileLoadingErr) => {
      setError(profileLoadingErr.message);
    },
    fetchPolicy: 'network-only',
  });

  const { loading: categoriesLoading, error: categoriesError } = useQuery<GetCategoryResponseQueries>(GET_CATEGORY, {
    onCompleted: (data) => {
      const categories = data.categories.getMany.data;
      dispatch(categoriesActions.set({ items: categories, lastPage: 1, totalCount: categories.length }));
    },
    onError: (categoryLoadingErr) => {
      setError(categoryLoadingErr.message);
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (isAuth) {
      refetchProfile();
    } else {
      dispatch(profileActions.set(null));
    }
  }, [isAuth, refetchProfile, dispatch]);

  useEffect(() => {
    if (profileError) {
      setError(profileError.message);
    } else if (categoriesError) {
      setError(categoriesError.message);
    } else {
      setError(null);
    }
  }, [profileError, categoriesError]);

  return { error };
};
