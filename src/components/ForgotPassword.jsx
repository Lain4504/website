import React, { useState } from 'react';
import Breadcrumb from './Breadcrumb';
import { Input, Button, Form, message } from 'antd';
// import { forgetPassword } from '../services/UserService';

const ForgotPassword = () => {
    const [emailData, setEmail] = useState({ email: '' });
    const [isSending, setIsSending] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailData.email)) {
            setEmailError(true);
            return;
        }
        forgetPassword(emailData)
            .then((res) => {
                if (res.status === 200) {
                    setIsSending(true);
                    setEmailError(false);
                    message.success('Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.');
                }
            })
            .catch((err) => {
                message.error(err.response.data.message || 'Có lỗi xảy ra!');
            });
    };

    const handleChange = (e) => {
        setEmail({ email: e.target.value });
    };

    return (
        <div>
            <Breadcrumb items={[{ title: 'Home', href: '/' }, { title: 'Quên mật khẩu' }]} />
            <div className="flex justify-center items-center min-h-screen">
                <Form
                    name="forgotPassword"
                    className="w-full max-w-md p-4 shadow-lg"
                    onFinish={handleSubmit}
                >
                    <h3 className="text-2xl font-semibold text-center mb-4">Quên mật khẩu</h3>
                    <Form.Item
                        name="email"
                        validateStatus={emailError ? 'error' : ''}
                        help={emailError && 'Email không hợp lệ'}
                    >
                        <Input
                            type="text"
                            placeholder="Nhập email của bạn"
                            value={emailData.email}
                            onChange={handleChange}
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
