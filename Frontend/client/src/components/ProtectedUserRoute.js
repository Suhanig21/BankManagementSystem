import React from 'react';
import { Navigate } from 'react-router-dom';

// This component doesn't need visual styling as it's a functional wrapper
const ProtectedUserRoute = ({ children }) => {
  const isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';

  return isUserLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedUserRoute;