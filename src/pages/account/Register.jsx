import React, { useContext, useState } from 'react';
import { Input, Button, Alert, Typography, Modal, notification } from 'antd';
import { createAccount } from '../../services/UserService';
import { Link, useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';
import Breadcrumb from '../../components/shared/Breadcrumb';
import Title from '../../components/shared/Title';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContext } from '../../context/AuthContext';
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [existingAccountError, setExistingAccountError] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const account = { email, password };
        setLoading(true);

        createAccount(account)
            .then(() => {
                setExistingAccountError(false);
                setIsModalVisible(true);
            })
            .catch(() => {
                setExistingAccountError(true);
            })
            .finally(() => {
                setLoading(false);
            });
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
            console.log("Refresh Expiration Time:", new Date(expirationDate));
    
            // Decode the JWT token
            const decodedToken = jwtDecode(token);
            const expirationTime = new Date(decodedToken.exp * 1000);
            const userId = decodedToken[Object.keys(decodedToken).find(key => key.includes("nameidentifier"))];
    
            // Log the decoded information
            console.log("Decoded Token:", decodedToken);
            console.log("Expiration Time:", expirationTime);
            console.log("User ID:", userId);
    
            // Dispatch login action
            dispatch({ type: 'LOGIN', payload: { token, refreshToken, expirationTime, userId } });
    
            // Store user data in local storage
            localStorage.setItem("user", JSON.stringify({ token, refreshToken, expirationTime, userId, refreshExpirationTime: new Date(expirationDate).toISOString() }));
    
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
        { title: 'Đăng ký' }
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
                                Tạo tài khoản
                            </h1>
                            {existingAccountError && (
                                <Alert
                                    message="Tài khoản đã tồn tại. Vui lòng thử lại với email khác."
                                    type="error"
                                    showIcon
                                    className="mb-4"
                                />
                            )}
                            <form onSubmit={onSubmitHandler} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700">Địa chỉ email</label>
                                    <Input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@company.com"
                                        className="mt-1 block w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Mật khẩu</label>
                                    <Input.Password
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        className="mt-1 w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Xác nhận mật khẩu</label>
                                    <Input.Password
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        className="mt-1 w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-200"
                                    />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            required
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                            Tôi chấp nhận <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Điều khoản và Điều kiện</a>
                                        </label>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full rounded-md bg-indigo-600 text-white py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Đang xử lý...' : 'Đăng ký'}
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
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Đã có tài khoản? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập tại đây</Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Ant Design Modal */}
                <Modal
                    title="Xác nhận email"
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                >
                    <p>Chúng tôi đã gửi email xác nhận đến địa chỉ của bạn. Vui lòng kiểm tra hộp thư để hoàn tất đăng ký.</p>
                    <p>Nếu bạn không thấy email, vui lòng kiểm tra hộp thư rác.</p>
                </Modal>
            </section>
        </>
    );
};

export default Register;
