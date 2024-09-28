import React, { useEffect, useState } from 'react';
import { Table, Button, Layout, Spin } from 'antd';
import { cancelOrder } from '../services/OrderService';
import UserSideBar from './UserSideBar';

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

const OrderList = ({ orders }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        
        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    // Ant Design table columns setup
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
                        <Button type="primary" className="text-xs">Chi tiết</Button>
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

    return (
        <div className="flex h-a">
        <UserSideBar />
        <div className="flex-1 p-1 bg-white shadow-md rounded-lg ml-4">
                <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
                    {loading ? (
                        <Table
                            dataSource={[]} // Passing empty dataSource
                            columns={columns}
                            rowKey="id"
                            pagination={false}
                            className="w-full bg-white shadow-md rounded-lg"
                            loading={{
                                spinning: true,
                                tip: 'Đang tải danh sách đơn hàng...',
                            }}
                        />
                    ) : (
                        <Table
                            dataSource={orders}
                            columns={columns}
                            rowKey="id"
                            pagination={false}
                            className="w-full bg-white shadow-md rounded-lg"
                        />
                    )}
                </Content>
                </div>
                </div>
    );
};

export default OrderList;
