import React, { useContext, useState } from 'react';
import { login } from '../../services/UserService';
import { Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';
import Breadcrumb from '../../components/shared/Breadcrumb';
import Title from '../../components/shared/Title';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const onSubmitHandler = async (values) => {
        setLoading(true);
        const { email, password } = values;
    
        try {
            const res = await login({ email, password });
            const token = res.data.token; // Access Token
            const refreshToken = res.data.refreshToken; // Refresh Token
    
            // Giải mã token để lấy thông tin và thời gian hết hạn
            const decodedToken = jwtDecode(token);
            const expirationTime = new Date(decodedToken.exp * 1000); // Chuyển đổi giây sang milliseconds
    
            const userId = decodedToken[Object.keys(decodedToken).find(key => key.includes("nameidentifier"))];
    
            // Lưu thông tin vào state và local storage
            dispatch({ type: "LOGIN", payload: { token, refreshToken, userId, expirationTime } });
            localStorage.setItem("user", JSON.stringify({ token, refreshToken, userId, expirationTime }));
    
            console.log("Current User in Login:", res);
            notification.success({
                message: 'Đăng nhập thành công',
                description: 'Chào mừng bạn trở lại!',
            });
    
            navigate('/');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Vui lòng kiểm tra lại thông tin đăng nhập.';
            notification.error({
                message: 'Đăng nhập không thành công',
                description: 'Vui lòng kiểm tra lại thông tin đăng nhập.',
            });
        } finally {
            setLoading(false);
        }
    };
    
    const handleGoogleLogin = () => {
        notification.info({
            message: 'Google Login',
            description: 'Chức năng đăng nhập bằng Google sẽ được thực hiện ở đây.',
        });
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
                            <Form
                                form={form}
                                onFinish={onSubmitHandler}
                                layout="vertical"
                                className="space-y-0 max-lg:-space-y-6"
                            >
                                <Form.Item
                                    label="Địa chỉ email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập email!',
                                        },
                                        {
                                            type: 'email',
                                            message: 'Định dạng email không hợp lệ!',
                                        },
                                    ]}
                                >
                                    <Input
                                        type="email"
                                        className="block w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-200"
                                        placeholder="Nhập địa chỉ email"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu!',
                                        },
                                        {
                                            min: 6,
                                            message: 'Mật khẩu phải có ít nhất 6 ký tự!',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        className="w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-200"
                                        placeholder="Nhập mật khẩu"
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="remember"
                                                    aria-describedby="remember"
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
                                </Form.Item>

                                <Form.Item>
                                    <button
                                        type="submit"
                                        className={`w-full rounded-md bg-indigo-600 text-white py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={loading}
                                    >
                                        {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                                    </button>
                                </Form.Item>

                                <Form.Item>
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-center mt-4 bg-gray-200 rounded-md py-2 text-gray-700 hover:bg-gray-300 focus:outline-none"
                                        onClick={handleGoogleLogin}
                                    >
                                        <GoogleOutlined style={{ marginRight: 8, color: '#4285F4' }} />
                                        Đăng nhập bằng Google
                                    </button>
                                </Form.Item>
                            </Form>

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
