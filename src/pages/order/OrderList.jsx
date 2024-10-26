import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Layout, message, Pagination } from 'antd';
import { cancelOrder, getOrderByUserId, getOrderDetailByOrderId } from '../../services/OrderService';
import UserNavBar from '../../components/account/UserNavBar';
import Breadcrumb from '../../components/shared/Breadcrumb';
import { AuthContext } from '../../context/AuthContext';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';

const { confirm } = Modal;
const { Content } = Layout;

const handleCancel = (id, setOrders) => {
    confirm({
        title: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
        content: 'Hành động này không thể hoàn tác.',
        okText: 'Đồng ý',
        okType: 'danger',
        cancelText: 'Hủy',
        onOk() {
            cancelOrder(id).then(res => {
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.id === id ? { ...order, state: 'Canceled' } : order
                    )
                );
                message.success('Đơn hàng đã được hủy thành công');
            }).catch(error => {
                message.error('Hủy đơn hàng thất bại');
            });
        },
        onCancel() {
            console.log('Hủy hành động');
        },
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

const OrderList = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [totals, setTotals] = useState({});
    const [currentPage, setCurrentPage] = useState(1); // trạng thái số trang hiện tại
    const [pageSize, setPageSize] = useState(5); // trạng thái số phần tử mỗi trang
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser ? currentUser.userId : null;

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await getOrderByUserId(userId);
                const ordersData = res?.data || [];
                setOrders(ordersData);
                console.log('Orders:', ordersData);
    
                const totalsMap = {};
                await Promise.all(ordersData.map(async (order) => {
                    const orderDetails = await getOrderDetailByOrderId(order.id);
                    const total = orderDetails.data.reduce(
                        (sum, item) => sum + item.amount * item.salePrice,
                        0
                    ) + (order.shippingPrice || 0); // Add shipping fee
                    totalsMap[order.id] = total;
                }));
                setTotals(totalsMap);
                setLoading(false);
            } catch (error) {
                message.error('Failed to fetch orders');
                setLoading(false);
            }
        };
    
        if (userId) {
            fetchOrderDetails();
        }
    }, [userId]);
    

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
            key: 'total',
            align: 'center',
            render: (order) => {
                return totals[order.id] ? `${totals[order.id].toLocaleString()}₫` : 'Loading...';
            },
        },
        {
            title: 'Chức năng',
            key: 'action',
            align: 'center',
            render: (_, order) => (
                <div className="flex justify-center space-x-2">
                    <Link to={`/order-detail/${order.id}`}>
                        <Button type="primary" className="text-xs bg-green-500">Chi tiết</Button>
                    </Link>
                    {order.shippingState === 'NOTSHIPPING' && order.state !== 'Canceled' && (
                        <Button
                            onClick={() => handleCancel(order.id, setOrders)}
                            danger
                            className="text-xs"
                        >
                            Hủy đơn hàng
                        </Button>
                    )}
                </div>
            ),
        }
    ];

    // Thêm phân trang vào bảng
    const onChangePage = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const breadcrumbs = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Lịch sử đơn hàng' },
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbs} className="my-10" />
            <UserNavBar />
            <div className="flex h-a my-10">
                <div className="flex-1 p-1 bg-white shadow-md rounded-lg ml-4 overflow-x-auto">
                    <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
                        <Table
                            dataSource={loading ? [] : orders.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                            columns={columns}
                            rowKey="id"
                            pagination={false}
                            className="w-full bg-white shadow-md rounded-lg"
                            loading={loading && { spinning: true, tip: 'Đang tải danh sách đơn hàng...' }}
                        />
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={orders.length}
                            onChange={onChangePage}
                            showSizeChanger
                            pageSizeOptions={[5, 10, 20]}
                            className="mt-4 text-center"
                        />
                    </Content>
                </div>
            </div>
        </>
    );
};

export default OrderList;
