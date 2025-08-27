import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../store';
import { tokenSelectors } from '../store/token';

export type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const token = useSelector<RootState, RootState['token']>(tokenSelectors.get);
  const location = useLocation();
  if (token) return <>{children}</>;
  return <Navigate to="/auth" state={{ from: location }} replace />;
};
