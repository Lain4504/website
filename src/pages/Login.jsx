import React, { useContext, useState } from 'react';
import { login } from '../services/UserService';
import { Form, Input, Button, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';
import Breadcrumb from '../components/Breadcrumb';
import Title from '../components/Title';
import { AuthContext } from '../context/AuthContext';
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
            const token = res.data.token;
            const decodedToken = jwtDecode(token);
            console.log("Decode:", decodedToken)
            const userId = decodedToken[Object.keys(decodedToken).find(key => key.includes("nameidentifier"))];
            console.log("userId:", userId)
            dispatch({ type: "LOGIN", payload: { token, userId } });
            localStorage.setItem("user", JSON.stringify({ token, userId }));
            console.log("Current User in Login:", res)
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
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto my-8 lg:py-0">
                    <a className="mb-6 text-2xl font-semibold">
                        <Title text1={'Forever'} text2={'Book Store'} />
                    </a>
                    <div className="w-full bg-white rounded-lg border-1 border-gray-300 shadow-lg dark:border-2 dark:border-gray-600 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
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
                                        className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                        className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                    Ghi nhớ tài khoản
                                                </label>
                                            </div>
                                        </div>
                                        <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            Quên mật khẩu?
                                        </Link>
                                    </div>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="w-full"
                                        loading={loading}
                                    >
                                        Đăng nhập
                                    </Button>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="default"
                                        className="w-full flex items-center justify-center mt-4"
                                        onClick={handleGoogleLogin}
                                    >
                                        <GoogleOutlined style={{ marginRight: 8, color: '#4285F4' }} />
                                        Đăng nhập bằng Google
                                    </Button>
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
