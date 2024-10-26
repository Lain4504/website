import React, { useState } from 'react';
import Breadcrumb from '../shared/Breadcrumb';
import { useNavigate, useParams } from 'react-router-dom'; // Để lấy token từ URL
import { Input, Button, Form, message } from 'antd';
import { resetPassword } from '../../services/UserService'; // Hàm gọi API

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const { token } = useParams(); // Lấy token từ URL
    const navigate = useNavigate()
    // Hàm để xử lý gửi form
    const handleSubmit = (values) => {
        setLoading(true);

        if (!token) {
            message.error('Token không hợp lệ!');
            setLoading(false);
            return;
        }

        // Gửi yêu cầu reset password
        resetPassword({
            NewPassword: values.newPassword,
            ConfirmPassword: values.confirmPassword,
            Token: token,
        })
            .then((response) => {
                message.success('Mật khẩu đã được đặt lại thành công!');
                setTimeout(() => {
                    navigate('/login');
                }, 1000); // 1000ms = 1 giây
            })
            .catch((error) => {
                message.error(error.response?.data?.message || 'Có lỗi xảy ra!');
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <div>
            <Breadcrumb items={[{ title: 'Trang chủ', href: '/' }, { title: 'Đặt lại mật khẩu' }]} />
            <div className="flex justify-center items-center min-h-80 my-6">
                <Form
                    name="resetPassword"
                    className="w-full max-w-md p-4 shadow-lg gap-y-2"
                    onFinish={handleSubmit}
                >
                    <h3 className="text-2xl font-semibold text-center mb-4">Đặt lại mật khẩu</h3>

                    <Form.Item
                        name="newPassword"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                        ]}
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu mới"
                            className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Xác nhận mật khẩu mới"
                            className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </Form.Item>


                    <Form.Item>
                        <button type="primary" htmlType="submit" className="w-full rounded-md bg-indigo-600 text-white py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" loading={loading}>
                            Đặt lại mật khẩu
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ResetPassword;