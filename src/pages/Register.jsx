import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Alert, Typography, Modal } from 'antd';
import { createAccount } from '../services/UserService';
import { Link } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const Register = () => {
    const [form] = Form.useForm();
    const [existingAccountError, setExistingAccountError] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [countdown, setCountdown] = useState(30); // 30 giây đếm ngược
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Khóa nút resend email

    // Bắt đầu đếm ngược 30 giây sau khi modal được hiển thị
    useEffect(() => {
        let timer;
        if (isModalVisible && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsButtonDisabled(false); // Hết 30 giây, mở khóa nút resend email
        }
        return () => clearInterval(timer); // Hủy timer khi không cần thiết
    }, [isModalVisible, countdown]);

    const onSubmitHandler = (values) => {
        const account = { email: values.email, password: values.password };

        createAccount(account)
            .then(() => {
                setExistingAccountError(false);
                setIsModalVisible(true); // Hiển thị modal khi đăng ký thành công
            })
            .catch(() => {
                setExistingAccountError(true);
            });
    };

    const resendEmail = () => {
        setCountdown(30); // Reset lại đếm ngược khi gửi lại email
        setIsButtonDisabled(true); // Khóa nút resend email khi đếm ngược bắt đầu
        // Gọi API resend email ở đây
        console.log("Resending email...");
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        ĐĂNG KÝ
                    </h2>
                </div>
                <hr className="my-4 w-1/2 mx-auto border-t-2 border-gray-300" />
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Form
                        form={form}
                        name="register"
                        layout="vertical"
                        onFinish={onSubmitHandler}
                        autoComplete="off"
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    message: 'Mật khẩu phải dài hơn 6 ký tự!',
                                },
                            ]}
                        >
                            <Input.Password
                                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Nhập mật khẩu"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                            />
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
                            <Input.Password
                                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Xác nhận mật khẩu"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            >
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Đã có tài khoản?{' '}
                        <Link to="/login">
                            <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                Đăng nhập tại đây
                            </span>
                        </Link>
                    </p>
                </div>

                {/* Ant Design Modal */}
                <Modal
                    title="Xác nhận email"
                    visible={isModalVisible}
                    footer={[
                        <Button
                            key="resend"
                            onClick={resendEmail}
                            disabled={isButtonDisabled}
                            className={`w-full ${isButtonDisabled ? 'bg-gray-400' : 'bg-green-600'} text-white`}
                        >
                            {isButtonDisabled ? `Resend Email (${countdown}s)` : 'Resend Email'}
                        </Button>,
                    ]}
                    onCancel={() => setIsModalVisible(false)}
                >
                    <p>Chúng tôi đã gửi email xác nhận đến địa chỉ của bạn. Vui lòng kiểm tra hộp thư để hoàn tất đăng ký.</p>
                    <p>Nếu bạn không thấy email, vui lòng kiểm tra hộp thư rác.</p>
                </Modal>
            </div>
        </>
    );
};

export default Register;
