import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
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

        const response = await axios.post('http://localhost:5146/api/user/refresh-token', { refreshToken });
        const newToken = response.data.token;

        // Nếu token mới là null hoặc undefined, hãy kiểm tra lại phản hồi từ server
        if (!newToken) {
          console.error("Không có token mới được trả về từ server.");
          return null;
        }

        const decodedToken = jwtDecode(newToken);
        const newExpirationTime = new Date(decodedToken.exp * 1000);

        // Cập nhật đối tượng user với token và expirationTime mới
        const updatedUser = {
          ...user,
          token: newToken,
          expirationTime: newExpirationTime,
          refreshToken: refreshToken // Giữ nguyên refresh token
        };

        // Cập nhật state và localStorage
        dispatch({
          type: "LOGIN",
          payload: updatedUser
        });

        localStorage.setItem("user", JSON.stringify(updatedUser));

        return updatedUser; // Trả về đối tượng user đã cập nhật
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

    return user; 
  };
  const logout = async () => {
    const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage
    const refreshToken = user?.refreshToken;

    if (refreshToken) {
      try {
        await axios.post('https://localhost:3001/api/user/logout', { refreshToken });
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
        const originalRequest = error.config;
  
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          console.log("Nhận mã lỗi 401 - Bắt đầu làm mới token...");
  
          originalRequest._retry = true; // Đảm bảo không lặp lại yêu cầu khi refresh token
          try {
            const user = await checkAndRefreshToken(); // Lấy user mới
  
            if (user) { // Kiểm tra xem có user hay không
              console.log("Token mới đã được làm mới, thử lại yêu cầu ban đầu...");
              originalRequest.headers['Authorization'] = `Bearer ${user.token}`;
              return axios(originalRequest); // Thử lại yêu cầu với token mới
            } else {
              console.error("Lỗi khi làm mới token, không có user mới.");
              return Promise.reject(error);
            }
          } catch (refreshError) {
            console.error("Lỗi khi làm mới token:", refreshError);
            return Promise.reject(refreshError);
          }
        }
  
        // Nếu không phải lỗi 401 hoặc lỗi khác, reject yêu cầu ban đầu
        return Promise.reject(error);
      }
    );
  
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [dispatch, navigate]);  

  useEffect(() => {
    const checkToken = async () => {
      if (state.currentUser) {
        const token = state.currentUser.token;
  
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expirationDate = new Date(payload.exp * 1000);
  
          if (expirationDate < new Date()) {
            console.log("Token đã hết hạn - Thoát phiên...");
            const user = await checkAndRefreshToken(); // Gọi hàm kiểm tra và làm mới token
  
            if (user) {
              dispatch({ type: "LOGIN", payload: user }); 
            }
          }
        }
  
        // Cập nhật thông tin người dùng trong localStorage
        localStorage.setItem("user", JSON.stringify(state.currentUser));
        console.log("Người dùng cập nhật:", state.currentUser);
      }
    };
  
    checkToken(); // Gọi hàm kiểm tra token
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
