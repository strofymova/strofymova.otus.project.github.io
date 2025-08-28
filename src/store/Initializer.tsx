import { FC, useInsertionEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializedActions } from './initialized';
import { useInitialization } from '../shared/hooks/useInitialization';

export const Initializer: FC = () => {
  const dispatch = useDispatch();

  useInsertionEffect(() => {
    dispatch(initializedActions.init());
  }, [dispatch]);

  useInitialization();

  return null;
};
