import React, { useState } from 'react';
import { Form, Input, Button, Alert, Typography, Modal, notification } from 'antd';
import { createAccount } from '../../services/UserService';
import { Link } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';
import Breadcrumb from '../components/Breadcrumb';
import Title from '../components/Title';

const Register = () => {
    const [form] = Form.useForm();
    const [existingAccountError, setExistingAccountError] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false); // Thêm trạng thái loading

    const onSubmitHandler = (values) => {
        const account = { email: values.email, password: values.password };
        setLoading(true); // Đặt loading thành true trước khi gọi API

        createAccount(account)
            .then(() => {
                setExistingAccountError(false);
                setIsModalVisible(true); // Hiển thị modal khi đăng ký thành công
            })
            .catch(() => {
                setExistingAccountError(true);
            })
            .finally(() => {
                setLoading(false); // Đặt loading thành false sau khi gọi API xong
            });
    };

    const handleGoogleLogin = () => {
        notification.info({
            message: 'Google Login',
            description: 'Chức năng đăng nhập bằng Google sẽ được thực hiện ở đây.',
        });
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
                            <Form
                                form={form}
                                name="register"
                                layout="vertical"
                                onFinish={onSubmitHandler}
                                autoComplete="off"
                                className="space-y-2 max-md:-space-y-4 md:space-y-0 lg:space-y-2"
                            >
                                {existingAccountError && (
                                    <Alert
                                        message="Tài khoản đã tồn tại. Vui lòng thử lại với email khác."
                                        type="error"
                                        showIcon
                                        className="mb-4"
                                    />
                                )}
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
                                            message: 'Vui lòng nhập đúng định dạng email!',
                                        },
                                    ]}
                                >
                                    <Input
                                        className="block w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-200" placeholder="name@company.com"
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
                                            message: 'Mật khẩu phải dài hơn 6 ký tự!',
                                        },
                                    ]}
                                >
                                    <div className="flex items-center">
                                        <Input.Password
                                            className="w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-200" placeholder="••••••••"
                                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item
                                    label="Xác nhận mật khẩu"
                                    name="confirmPassword"
                                    dependencies={['password']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng xác nhận mật khẩu!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <div className="flex items-center">
                                        <Input.Password
                                            className="w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-200" placeholder="••••••••"
                                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="terms"
                                                aria-describedby="terms"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                required
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                                Tôi chấp nhận <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Điều khoản và Điều kiện</a>
                                            </label>
                                        </div>
                                    </div>
                                </Form.Item>
                                <Form.Item>
                                    <button
                                        type="submit"
                                        className={`w-full rounded-md bg-indigo-600 text-white py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={loading} // Vô hiệu hóa nút khi đang tải
                                    >
                                        {loading ? 'Đang xử lý...' : 'Đăng ký'} 
                                    </button>
                                </Form.Item>
                                <Form.Item>
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-center mt-4 bg-gray-200 rounded-md py-2 text-gray-700 hover:bg-gray-300 focus:outline-none"
                                        onClick={handleGoogleLogin}
                                    >
                                        <GoogleOutlined style={{ marginRight: 8, color: '#4285F4' }} />
                                        Tạo tài khoản bằng Google
                                    </button>
                                </Form.Item>
                            </Form>
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
