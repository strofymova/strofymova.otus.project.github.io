import { FC, useInsertionEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useInitialization } from '../shared/hooks/useInitialization';
import { initializedActions } from './initialized';

export const Initializer: FC = () => {
  const dispatch = useDispatch();

  useInsertionEffect(() => {
    dispatch(initializedActions.init());
  }, [dispatch]);

  useInitialization();

  return null;
};
