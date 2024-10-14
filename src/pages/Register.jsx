import React, { useState } from 'react';
import { Form, Input, Button, Alert, Typography, Modal } from 'antd';
import { createAccount } from '../services/UserService';
import { Link } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';
import Breadcrumb from '../components/Breadcrumb';
import Title from '../components/Title';

const Register = () => {
    const [form] = Form.useForm();
    const [existingAccountError, setExistingAccountError] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onSubmitHandler = (values) => {
        const account = { email: values.email, password: values.password };

        createAccount(account)
            .then(() => {
                setExistingAccountError(false);
                setIsModalVisible(true); // Show modal on successful registration
            })
            .catch(() => {
                setExistingAccountError(true);
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
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto lg:py-0 mb-12">
                    <a className="mb-6 text-2xl font-semibold">
                        <Title text1={'Forever'} text2={'Book Store'} />
                    </a>
                    <div className="w-full bg-white rounded-lg border-1 border-gray-300 shadow-lg dark:border-2 dark:border-gray-600 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
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
                                        className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="name@company.com"
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
                                            className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="••••••••"
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
                                            className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="••••••••"
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
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Tạo tài khoản
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="default"
                                        className="w-full flex items-center justify-center mt-4"
                                        onClick={handleGoogleLogin}
                                    >
                                        <GoogleOutlined style={{ marginRight: 8, color: '#4285F4' }} />
                                        Tạo tài khoản bằng Google
                                    </Button>
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
