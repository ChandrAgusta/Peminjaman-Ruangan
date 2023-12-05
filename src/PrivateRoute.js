import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, authenticated, role, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        authenticated ? (
          <Element />
        ) : (
          <Navigate to="/login" replace state={{ from: rest.location.pathname }} />
        )
      }
    />
  );
};

export default PrivateRoute;