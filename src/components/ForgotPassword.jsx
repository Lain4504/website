import React, { useState } from 'react';
import Breadcrumb from './Breadcrumb';
import { Input, Button, Form, message } from 'antd';
import { forgetPassword } from '../services/UserService';

const ForgotPassword = () => {
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = (values) => {
        // `values.email` will contain the email input if the form is valid
        forgetPassword(values.email )
            .then((res) => {
                if (res.status === 200) {
                    setIsSending(true);
                }
            })
            .catch((err) => {
                message.error(err.response.data.message || 'Có lỗi xảy ra!');
            });
    };

    return (
        <div>
            <Breadcrumb items={[{ title: 'Trang chủ', href: '/' }, { title: 'Quên mật khẩu' }]} />
            <div className="flex justify-center items-center min-h-screen">
                <Form
                    name="forgotPassword"
                    className="w-full max-w-md p-4 shadow-lg"
                    onFinish={handleSubmit}
                >
                    <h3 className="text-2xl font-semibold text-center mb-4">Quên mật khẩu</h3>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Email không hợp lệ',
                            },
                            {
                                required: true,
                                message: 'Vui lòng nhập email của bạn',
                            },
                        ]}
                    >
                        <Input
                            type="text"
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Gửi
                        </Button>
                    </Form.Item>
                    {isSending && (
                        <p className="text-green-500 text-center">
                            Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.
                        </p>
                    )}
                </Form>
            </div>
        </div>
    );
};

export default ForgotPassword;
