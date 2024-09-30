import React, { useState } from 'react';
import { Button, Input, Layout, message, Modal } from 'antd'; // Import Ant Design components
import { changePassword } from '../services/UserService';
import UserSideBar from '../pages/UserSideBar';
import { Content } from 'antd/es/layout/layout';

const ChangePassword = ({ cookies }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

    const handleSave = () => {
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }
        if (newPassword.length < 6 || newPassword.length > 20) {
            setError('Mật khẩu phải có ít nhất 6 ký tự và nhiều nhất 20 ký tự');
            return;
        }
        
        // Show confirmation modal
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        const data = {
            oldPassword,
            newPassword,
            token: cookies.authToken,
        };

        try {
            await changePassword(data);
            message.success('Đổi mật khẩu thành công');
            setTimeout(() => {
                window.location.href = '/get-profile';
            }, 1000);
        } catch (err) {
            setError(err.response.data);
        }
        setIsModalVisible(false); // Close modal
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Close modal
    };

    return (
        <>
            <div className="flex h-a">
                <UserSideBar />
                <div className="flex-1 p-6 bg-white shadow-md rounded-lg ml-4">
                    <div className="p-4">
                        <div id="PageContainer">
                            <div className="password-form mb-5 mt-3" style={{ maxWidth: '400px', margin: 'auto' }}>
                                <h5 className="text-lg font-semibold mb-4">Đổi mật khẩu</h5>
                                <div className="mb-3">
                                    <Input
                                        required
                                        placeholder="Mật khẩu cũ"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        type="password"
                                        className="w-full"
                                        style={{ height: '35px' }} // Adjust height
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        required
                                        placeholder="Mật khẩu mới"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        type="password"
                                        className="w-full"
                                        style={{ height: '35px' }} // Adjust height
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        required
                                        placeholder="Xác nhận mật khẩu"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="password"
                                        className="w-full"
                                        style={{ height: '35px' }} // Adjust height
                                    />
                                </div>
                                <Button onClick={handleSave} type="primary" className="mt-3" style={{ width: '100%' }}>Lưu</Button>
                                {error !== '' && <div className="mt-3 text-red-600">{error}</div>}
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
