import React, { useEffect, useState } from 'react';
import { Table, Button, Layout, message } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { cancelOrder, getOrderByUserId } from '../services/OrderService';
import UserNavBar from './UserNavBar';
import Breadcrumb from '../components/Breadcrumb';

const { Content } = Layout;

const handleCancel = (id) => {
    const confirm = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?');
    if (!confirm) return;
    cancelOrder(id).then(res => {
        window.location.reload();
    });
};

const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const OrderList = ({ cookies }) => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const token = cookies.authToken;
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded[Object.keys(decoded).find(key => key.includes("nameidentifier"))];
                console.log("User ID from token: ", userId);

                const fetchUserInfo = async () => {
                    try {
                        const res = await getOrderByUserId(userId);
                        setOrders(res?.data);
                        console.log("User profile data:", res?.data);
                        setTimeout(() => setLoading(false), 1000);
                    } catch (error) {
                        message.error('Failed to fetch user profile');
                        setLoading(false);
                    }
                };
                fetchUserInfo();
            } catch (error) {
                message.error('Invalid token');
                setLoading(false);
            }
        } else {
            message.error('No token found');
            setLoading(false);
        }
    }, [cookies.authToken]);

    const columns = [
        {
            title: 'Đơn hàng',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: 'Ngày',
            dataIndex: 'created',
            key: 'created',
            align: 'center',
            render: (created) => formatDate(created),
        },
        {
            title: 'Tình trạng thanh toán',
            dataIndex: 'paymentState',
            key: 'paymentState',
            align: 'center',
        },
        {
            title: 'Tình trạng vận chuyển',
            dataIndex: 'shippingState',
            key: 'shippingState',
            align: 'center',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'state',
            key: 'state',
            align: 'center',
        },
        {
            title: 'Tổng',
            dataIndex: 'orderDetails',
            key: 'total',
            align: 'center',
            render: (orderDetails) => {
                const total = orderDetails?.reduce((sum, item) => sum + item.amount * item.salePrice, 0);
                return `${total?.toLocaleString()}₫`;
            },
        },
        {
            title: 'Chức năng',
            key: 'action',
            align: 'center',
            render: (_, order) => (
                <div className="flex justify-center space-x-2">
                    <a href={`/order-detail/${order.id}`}>
                        <Button type="primary" className="text-xs bg-green-500">Chi tiết</Button>
                    </a>
                    {order.shippingState === 'NOTSHIPPING' && order.state !== 'CANCELED' && (
                        <Button
                            onClick={() => handleCancel(order.id)}
                            danger
                            className="text-xs"
                        >
                            Hủy đơn hàng
                        </Button>
                    )}
                </div>
            ),
        },
    ];
    const breadcrumbs = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Lịch sử đơn hàng' }
    ];
    return (
        <>
            <Breadcrumb items={breadcrumbs} className="my-10" />
            <UserNavBar />
            <div className="flex h-a my-10">
                <div className="flex-1 p-1 bg-white shadow-md rounded-lg ml-4 overflow-x-auto"> 
                    <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
                        <Table
                            dataSource={loading ? [] : orders}
                            columns={columns}
                            rowKey="id"
                            pagination={false}
                            className="w-full bg-white shadow-md rounded-lg"
                            loading={loading && { spinning: true, tip: 'Đang tải danh sách đơn hàng...' }}
                        />
                    </Content>
                </div>
            </div>
        </>
    );
};

export default OrderList;
