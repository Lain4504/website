import React, { useContext, useState } from 'react';
import { Button, Input, Layout, message, Modal } from 'antd';
import { changePassword } from '../../services/UserService';
import UserNavBar from '../account/UserNavBar';
import Breadcrumb from '../shared/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const ChangePassword = ({ cookies }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const handleSave = () => {
        if (newPassword !== confirmPassword) {
            message.error('Mật khẩu không khớp');
            return;
        }
        if (newPassword.length < 6 || newPassword.length > 20) {
            message.error('Mật khẩu phải có ít nhất 6 ký tự và nhiều nhất 20 ký tự');
            return;
        }
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        const data = {
            oldPassword,
            newPassword,
            token: currentUser.token,
        };

        try {
            await changePassword(data);
            message.success('Đổi mật khẩu thành công');
            setTimeout(() => {
                navigate('/profile');
            }, 1000);
        } catch (err) {
            message.error('Mật khẩu cũ không chính xác');
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const breadcrumbs = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Thay đổi mật khẩu' }
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbs} className="my-10" />
            <UserNavBar />
            <div className="flex h-full my-10">
                <div className="flex-1 p-6 bg-white border-none rounded-lg shadow-md mx-4">
                    <div className="p-4">
                        <div id="PageContainer">
                            <div className="password-form mb-5 mt-3 max-w-md mx-auto">
                                <h5 className="text-lg font-semibold mb-4">Đổi mật khẩu</h5>

                                {/* Note section */}
                                <div className="border border-red-500 rounded-md p-3 mb-4">
                                    <p className="text-red-600 font-bold mb-2">Lưu ý:</p>
                                    <p className="text-red-600">
                                        Nếu bạn là tài khoản được tạo từ tài khoản Gmail, vui lòng đăng xuất và chọn quên mật khẩu ở trang đăng nhập và nhập Gmail hiện tại bạn đang dùng để đặt mật khẩu.
                                    </p>
                                </div>

                                {/* Password Fields */}
                                {[
                                    { label: 'Mật khẩu cũ', value: oldPassword, setValue: setOldPassword, show: showOldPassword, setShow: setShowOldPassword },
                                    { label: 'Mật khẩu mới', value: newPassword, setValue: setNewPassword, show: showNewPassword, setShow: setShowNewPassword },
                                    { label: 'Xác nhận mật khẩu', value: confirmPassword, setValue: setConfirmPassword, show: showConfirmPassword, setShow: setShowConfirmPassword }
                                ].map((field, index) => (
                                    <div className="mb-4" key={index}>
                                        <label className="block mb-1 text-sm font-medium">{field.label}</label>
                                        <Input
                                            required
                                            placeholder={field.label}
                                            value={field.value}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            type={field.show ? 'text' : 'password'}
                                            className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            style={{ height: '35px' }}
                                            suffix={
                                                field.show ? (
                                                    <EyeOutlined onClick={() => field.setShow(!field.show)} />
                                                ) : (
                                                    <EyeInvisibleOutlined onClick={() => field.setShow(!field.show)} />
                                                )
                                            }
                                        />
                                    </div>
                                ))}

                                <Button onClick={handleSave} type="primary" className="mt-3 w-full">Lưu</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <Modal
                title="Xác nhận"
                visible={isModalVisible}
                onOk={handleConfirm}
                onCancel={handleCancel}
                okText="Có"
                cancelText="Không"
            >
                <p>Bạn có chắc chắn muốn thay đổi mật khẩu không? Thao tác này không thể hoàn tác.</p>
            </Modal>
        </>
    );
};

export default ChangePassword;
