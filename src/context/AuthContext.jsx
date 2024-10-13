import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  isSessionExpired: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          console.log("Nhận mã lỗi 401 - Thoát phiên...");
          dispatch({ type: "LOGOUT", isSessionExpired: true });
          navigate('/login');
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
  }, [state.currentUser]);

  useEffect(() => {
    // Kiểm tra tính hợp lệ của token
    const checkTokenExpiration = () => {
      const token = state.currentUser?.token; 
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1])); 
        const expirationDate = new Date(payload.exp * 1000); 

        if (expirationDate < new Date()) {
          console.log("Token đã hết hạn - Thoát phiên...");
          dispatch({ type: "LOGOUT", isSessionExpired: true });
          navigate('/'); 
        }
      }
    };

    checkTokenExpiration(); // Gọi hàm kiểm tra khi currentUser thay đổi
  }, [state.currentUser, dispatch, navigate]);

  return (
    <AuthContext.Provider value={{ 
      currentUser: state.currentUser, 
      userId: state.currentUser?.userId,
      isSessionExpired: state.isSessionExpired, 
      dispatch 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;