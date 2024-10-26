import React, { useContext, useState } from 'react';
import { login } from '../../services/UserService';
import { notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';
import Breadcrumb from '../../components/shared/Breadcrumb';
import Title from '../../components/shared/Title';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'; // Thư viện Google Login

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const res = await login({ email, password });
            const token = res.data.token;
            const refreshToken = res.data.refreshToken;
            const refreshExpirationTime = new Date(res.data.expirationDate).toISOString(); // Định dạng chuẩn ISO
            console.log("In Login - refreshExpirationTime:", refreshExpirationTime);
        
            // Decode token for expiration time
            const decodedToken = jwtDecode(token);
            const expirationTime = new Date(decodedToken.exp * 1000);
            const userId = decodedToken[Object.keys(decodedToken).find(key => key.includes("nameidentifier"))];
        
            // Save to local storage
            const userData = { token, refreshToken, userId, expirationTime, refreshExpirationTime };
            dispatch({ type: "LOGIN", payload: userData });
            localStorage.setItem("user", JSON.stringify(userData));
        
            // Log saved data
            console.log("Saved User Data in localStorage:", JSON.parse(localStorage.getItem("user")));
        
            notification.success({
                message: 'Đăng nhập thành công',
                description: 'Chào mừng bạn trở lại!',
            });
        
            navigate('/');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Vui lòng kiểm tra lại thông tin đăng nhập.';
            notification.error({
                message: 'Đăng nhập không thành công',
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };
    const handleGoogleLogin = async (credentialResponse) => {
        console.log("Credential response:", credentialResponse); // Log the entire credential response
    
        try {
            const res = await fetch('https://localhost:3001/api/user/google-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: credentialResponse.credential }),
            });
    
            // Log the response status and body
            console.log("Response Status:", res.status);
            const data = await res.json();
            console.log("API Response Data:", data); // Log the entire API response
    
            // Destructure relevant fields from the response
            const { token, refreshToken, expirationDate } = data; // Adjust based on actual response structure
    
            // Log the tokens and expiration time
            console.log("Access Token:", token);
            console.log("Refresh Token:", refreshToken);
            console.log("Refresh Expiration Time:", expirationDate);
    
            // Decode the JWT token
            const decodedToken = jwtDecode(token);
            const expirationTime = new Date(decodedToken.exp * 1000);
            const userId = decodedToken[Object.keys(decodedToken).find(key => key.includes("nameidentifier"))];
            const refreshExpirationTime = new Date(expirationDate).toISOString();
            // Log the decoded information
            console.log("Decoded Token:", decodedToken);
            console.log("Expiration Time:", expirationTime);
    
            // Dispatch login action
            dispatch({ type: 'LOGIN', payload: { token, refreshToken, expirationTime, userId, refreshExpirationTime } });
    
            // Store user data in local storage
            localStorage.setItem("user", JSON.stringify({ token, refreshToken, expirationTime, userId, refreshExpirationTime}));
    
            // Show success notification
            notification.success({
                message: 'Đăng nhập thành công',
                description: 'Chào mừng bạn!',
            });
    
            // Navigate to home
            navigate('/');
        } catch (error) {
            console.error("Error during Google login:", error); // Log the error for debugging
    
            // Show error notification
            notification.error({
                message: 'Đăng nhập Google không thành công',
                description: error.message,
            });
        }
    };
    
        

    const breadcrumbs = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Đăng nhập' },
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbs} />
            <section className="bg-white dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-8 lg:py-0">
                    <a className="mb-6 text-2xl font-semibold">
                        <Title text1={'Forever'} text2={'Book Store'} />
                    </a>
                    <div className="w-full bg-white rounded-lg border border-gray-300 shadow-lg dark:border-2 dark:border-gray-600 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
                        <div className="p-6 space-y-4 lg:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Đăng nhập vào tài khoản của bạn
                            </h1>
                            <form onSubmit={onSubmitHandler} className="space-y-4">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Địa chỉ email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Nhập địa chỉ email"
                                        className="block w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-200"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Mật khẩu</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="Nhập mật khẩu"
                                            className="block w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-200"
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-2 cursor-pointer"
                                        >
                                            {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                Ghi nhớ tài khoản
                                            </label>
                                        </div>
                                    </div>
                                    <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-500">
                                        Quên mật khẩu?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full rounded-md bg-indigo-600 text-white py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                                </button>

                                <GoogleOAuthProvider clientId={'865045586884-kgg6tff2nje4jfle2n2mr3ts463can1l.apps.googleusercontent.com'}>
                                    <GoogleLogin
                                        onSuccess={handleGoogleLogin}
                                        onError={() => {
                                            notification.error({
                                                message: 'Đăng nhập Google không thành công',
                                                description: 'Có lỗi xảy ra trong quá trình đăng nhập Google.',
                                            });
                                        }}
                                        render={(renderProps) => (
                                            <button
                                                onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}
                                                className="w-full flex items-center justify-center mt-4 bg-gray-200 rounded-md py-2 text-gray-700 hover:bg-gray-300 focus:outline-none"
                                            >
                                                <GoogleOutlined style={{ marginRight: 8, color: '#4285F4' }} />
                                                Đăng nhập bằng Google
                                            </button>
                                        )}
                                    />
                                </GoogleOAuthProvider>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Chưa có tài khoản?{' '}
                                <Link to="/register">
                                    <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                        Đăng ký ngay
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
