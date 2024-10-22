import React, { useState } from 'react';
import Breadcrumb from '../shared/Breadcrumb';
import { Input, Button, Form, message } from 'antd';
import { forgetPassword } from '../../services/UserService';

const ForgotPassword = () => {
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = (values) => {
        // `values.email` will contain the email input if the form is valid
        forgetPassword(values.email)
            .then((res) => {
                if (res.status === 200) {
                    setIsSending(true);
                }
            })
            .catch((err) => {
                message.error(err.response.data.message || 'Có lỗi xảy ra!');
            });
    };

    const breadscums = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Quên mật khẩu' }
    ];

    return (
        <div>
            <Breadcrumb items={breadscums} />
            <div className="flex justify-center items-center my-10 sm:my-5 lg:my-20">

                <Form
                    name="forgotPassword"
                    className="w-full max-w-md p-6 md:p-4 shadow-lg border-1"
                    onFinish={handleSubmit}
                >
                    <h3 className="text-2xl font-semibold text-center mb-6 sm:mb-4">
                        Quên mật khẩu
                    </h3>
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
                        className="max-lg:mb-0"
                    >
                        <Input
                            className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type="text"
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </Form.Item>
                    <Form.Item>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 text-white py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Gửi
                        </button>
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
