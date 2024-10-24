import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, isSessionExpired } = useContext(AuthContext);

  useEffect(() => {
    console.log("Current user in PrivateRoute:", currentUser); // Kiểm tra người dùng hiện tại
  }, [currentUser]);

  // Nếu phiên đã hết hạn, điều hướng người dùng đến trang đăng nhập
  if (isSessionExpired) {
    return <Navigate to="/login" />;
  }

  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
