import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, isSessionExpired } = useContext(AuthContext);
  useEffect(() => {
    // console.log("Current user in PrivateRoute:", currentUser); // Log the current user for debugging
}, [currentUser]);
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
