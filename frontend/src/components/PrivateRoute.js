// src/components/PrivateRoute.js
/*import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        localStorage.getItem('token') ? (
          <Component />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default PrivateRoute; */

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('token');
  return token ? <Element {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
