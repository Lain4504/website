import React, { useContext, useState } from 'react';
import { Button, Input, Layout, message, Modal } from 'antd'; // Import Ant Design components
import { changePassword } from '../../services/UserService';
import UserNavBar from '../account/UserNavBar';
import Breadcrumb from '../shared/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'; // Import eye icons

const ChangePassword = ({ cookies }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
    const [showOldPassword, setShowOldPassword] = useState(false); // State to toggle old password visibility
    const [showNewPassword, setShowNewPassword] = useState(false); // State to toggle new password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const handleSave = () => {
        if (newPassword !== confirmPassword) {
            message.error('Mật khẩu không khớp'); // Use Ant Design message for errors
            return;
        }
        if (newPassword.length < 6 || newPassword.length > 20) {
            message.error('Mật khẩu phải có ít nhất 6 ký tự và nhiều nhất 20 ký tự'); // Use Ant Design message for errors
            return;
        }

        // Show confirmation modal
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        const data = {
            oldPassword,
            newPassword,
            token: currentUser.token, // Use the token from localStorage
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
        setIsModalVisible(false); // Close modal
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Close modal
    };

    const breadcrumbs = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Thay đổi mật khẩu' }
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbs} className="my-10" />
            <UserNavBar />
            <div className="flex h-a my-10">
                <div className="flex-1 p-6 bg-white border-none rounded-lg ml-4">
                    <div className="p-4">
                        <div id="PageContainer">
                            <div className="password-form mb-5 mt-3" style={{ maxWidth: '400px', margin: 'auto' }}>
                                <h5 className="text-lg font-semibold mb-4">Đổi mật khẩu</h5>

                                <div className="mb-4">
                                    <label className="block mb-1 text-sm font-medium">Mật khẩu cũ</label>
                                    <Input
                                        required
                                        placeholder="Mật khẩu cũ"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        type={showOldPassword ? 'text' : 'password'}
                                        className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ height: '35px' }} // Adjust height
                                        suffix={
                                            showOldPassword ? (
                                                <EyeOutlined onClick={() => setShowOldPassword(!showOldPassword)} />
                                            ) : (
                                                <EyeInvisibleOutlined onClick={() => setShowOldPassword(!showOldPassword)} />
                                            )
                                        }
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-1 text-sm font-medium">Mật khẩu mới</label>
                                    <Input
                                        required
                                        placeholder="Mật khẩu mới"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        type={showNewPassword ? 'text' : 'password'}
                                        className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ height: '35px' }} // Adjust height
                                        suffix={
                                            showNewPassword ? (
                                                <EyeOutlined onClick={() => setShowNewPassword(!showNewPassword)} />
                                            ) : (
                                                <EyeInvisibleOutlined onClick={() => setShowNewPassword(!showNewPassword)} />
                                            )
                                        }
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-1 text-sm font-medium">Xác nhận mật khẩu</label>
                                    <Input
                                        required
                                        placeholder="Xác nhận mật khẩu"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        style={{ height: '35px' }} // Adjust height
                                        suffix={
                                            showConfirmPassword ? (
                                                <EyeOutlined onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                                            ) : (
                                                <EyeInvisibleOutlined onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                                            )
                                        }
                                    />
                                </div>

                                <Button onClick={handleSave} type="primary" className="mt-3" style={{ width: '100%' }}>Lưu</Button>
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
