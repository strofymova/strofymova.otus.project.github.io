import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from '../pages/products/Products';
import Basket from '../pages/basket/Basket';
import Home from '../pages/home/Home';
import NotFound from '../pages/not_found/NotFound';
import Profile from '../pages/profile/Profile';
import Settings from '../pages/settings/Settings';
import Orders from '../pages/orders/Orders';
import { GuestRoute } from './GuestRoute';
import { ProtectedRoute } from './ProtectedRoute';
import Auth from '../pages/auth/Auth';

export type RoutingState = {
  from?: Location;
};

export type RoutingProps = {
  children: React.ReactNode;
};

export const Routing: FC<RoutingProps> = ({ children }) => (
  <BrowserRouter>
    {children}
    <Routes>
      <Route index element={<Home />} />
      <Route path="/category/:id" element={<Products />} />
      <Route
        path="/auth"
        element={
          <GuestRoute>
            <Auth />
          </GuestRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route path="/basket" element={<Basket />} />
      <Route
        path="/signUp"
        element={
          <GuestRoute>
            <Auth />
          </GuestRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
