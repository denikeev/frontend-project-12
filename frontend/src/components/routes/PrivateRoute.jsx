import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.jsx';

import urls from '../../urls.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to={urls.login} />
  );
};

export default PrivateRoute;
