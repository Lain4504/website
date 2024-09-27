import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/UserService';
import { message } from 'antd';
import Breadcrumb from '../components/Breadcrumb';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { id } = useParams(); 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const breadcrumbs = [
        { title: 'Home', href: '/' },
        { title: 'Profile' }
    ];

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return; // Kiểm tra nếu userId tồn tại
            try {
                const response = await getUserProfile(id); // Gọi API
                setUser(response.data); // Cập nhật dữ liệu người dùng từ API
            } catch (error) {
                console.error("Error fetching user:", error);
                message.error("Có lỗi xảy ra khi lấy thông tin người dùng.");
            } finally {
                setLoading(false); // Đặt trạng thái loading thành false
            }
        };

        fetchUser(); // Gọi hàm fetchUser
    }, [id]);

    if (loading) return <div>Đang tải thông tin người dùng...</div>; // Hiển thị thông báo tải

    return (
        <div>
            <Breadcrumb items={breadcrumbs} />
            <div className="flex justify-center items-center">
                <div className="md:w-1/2 lg:w-1/3 text-center">
                    <div>
                        <p><strong>Full Name:</strong> {user?.FullName || 'Chưa có thông tin'}</p>
                        <p><strong>Email:</strong> {user?.Email || 'Chưa có thông tin'}</p>
                        <p><strong>Phone:</strong> {user?.Phone || 'Chưa có thông tin'}</p>
                        <p><strong>Date of Birth:</strong> {user?.Dob || 'Chưa có thông tin'}</p>
                        <p><strong>Address:</strong> {user?.Address || 'Chưa có thông tin'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
