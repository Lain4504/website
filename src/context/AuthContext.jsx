import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null, // Lấy thông tin người dùng từ localStorage
  isSessionExpired: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const navigate = useNavigate();

  useEffect(() => {
    // Interceptor để bắt lỗi 401 và tự động logout
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          console.log("Nhận mã lỗi 401 - Thoát phiên...");
          dispatch({ type: "LOGOUT", isSessionExpired: true });
          navigate('/login'); // Điều hướng đến trang đăng nhập
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser)); 
    // Lưu user vào localStorage
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ 
      currentUser: state.currentUser, 
      userId: state.currentUser?.userId, // Extract userId if available
      isSessionExpired: state.isSessionExpired, 
      dispatch 
  }}>      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
