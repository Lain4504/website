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

  const checkAndRefreshToken = async () => {
    const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage

    if (!user) {
      console.error("Không tìm thấy thông tin người dùng.");
      return null;
    }

    const token = user.token;
    const refreshToken = user.refreshToken; // Lấy refresh token
    const expirationDate = new Date(user.expirationTime);

    // Kiểm tra xem token đã hết hạn chưa
    if (new Date() >= expirationDate) {
      // Kiểm tra xem refresh token có tồn tại không
      if (!refreshToken) {
        console.error("Refresh token không hợp lệ.");
        return null;
      }

      try {
        const response = await axios.post('http://localhost:5146/api/user/refresh-token', { RefreshToken : refreshToken });
        const newToken = response.data.token;
        const newExpirationTime = response.data.expirationTime; // Thời gian hết hạn mới

        // Cập nhật state và localStorage
        dispatch({
          type: "LOGIN",
          payload: {
            token: newToken,
            userId: user.userId,
            expirationTime: newExpirationTime,
            refreshToken: refreshToken // Giữ nguyên refresh token
          }
        });

        localStorage.setItem("user", JSON.stringify({
          token: newToken,
          userId: user.userId,
          expirationTime: newExpirationTime,
          refreshToken: refreshToken
        }));

        return newToken; // Trả về token mới
      } catch (error) {
        if (error.response) {
          console.error('Lỗi từ server:', error.response.data);
          console.error('Mã trạng thái:', error.response.status);
        } else {
          console.error('Lỗi không xác định:', error.message);
        }

        // Gọi hàm logout để xóa refresh token trên server
        await logout(refreshToken);

        // Xóa user khỏi store và localStorage
        dispatch({ type: "LOGOUT", isSessionExpired: true });
        navigate('/login');
        return null;
      }
    }

    return token;
  };

  const logout = async () => {
    const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage
    const refreshToken = user?.refreshToken;

    if (refreshToken) {
      try {
        await axios.post('http://localhost:5146/api/user/logout', { refreshToken });
        console.log("Đăng xuất thành công");
      } catch (error) {
        console.error("Lỗi khi gọi API logout:", error);
      }
    }

    // Xóa dữ liệu trong store và localStorage
    dispatch({ type: "LOGOUT", isSessionExpired: true });
    localStorage.removeItem("user");

    navigate('/login'); // Chuyển hướng đến trang đăng nhập
  };


  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          console.log("Nhận mã lỗi 401 - Thử làm mới token...");
          await checkAndRefreshToken();
          return Promise.reject(error);
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
    const checkTokenExpiration = () => {
      const token = state.currentUser?.token;
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationDate = new Date(payload.exp * 1000);

        if (expirationDate < new Date()) {
          console.log("Token đã hết hạn - Thử làm mới token...");
          checkAndRefreshToken(); // Gọi hàm làm mới token
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