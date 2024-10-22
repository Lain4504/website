import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Typography, Divider, Button, Row, Col } from 'antd';
import { getOrderDetailByOrderId, getOrderById } from '../../services/OrderService';
import { getBookById } from '../../services/BookService';
import Breadcrumb from '../components/Breadcrumb';
import { getDistrictById, getProvinceById, getWardById } from '../../services/AddressService';
import Title from '../components/Title'
const { Text } = Typography;

const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderInfo, setOrderInfo] = useState(null);
  const [addressName, setAddressName] = useState('');
  const navigate = useNavigate();
  const componentRef = useRef();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Fetch order info
        const orderResponse = await getOrderById(id);
        setOrderInfo(orderResponse?.data || null); 

        const detailsResponse = await getOrderDetailByOrderId(id);
        const details = detailsResponse?.data || [];

        const detailsWithTitlesAndImages = await Promise.all(
          details.map(async (detail) => {
            const bookResponse = await getBookById(detail.bookId);
            return {
              ...detail,
              bookTitle: bookResponse?.data?.title || 'Unknown Title',
              imageLink: bookResponse?.data?.images?.[0]?.link || '', // Get the first image if available
            };
          })
        );

        setOrderDetails(detailsWithTitlesAndImages);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const fetchAddressNames = async () => {
    if (!orderInfo?.address) return;
    const addressParts = orderInfo.address.split(',');
    const [wardId, districtId, provinceId] = addressParts;

    try {
      const [wardRes, districtRes, provinceRes] = await Promise.all([
        getWardById(wardId),
        getDistrictById(districtId),
        getProvinceById(provinceId),
      ]);
      setAddressName(`${wardRes}, ${districtRes}, ${provinceRes}`);
    } catch (error) {
      console.error('Error fetching address names:', error);
      setAddressName('Không tìm thấy địa chỉ');
    }
  };

  useEffect(() => {
    if (orderInfo?.address) {
      fetchAddressNames();
    }
  }, [orderInfo]);

  const columns = [
    {
      title: 'Tên sản phẩm',
      key: 'bookTitle',
      render: (text, record) => (
        <div className="flex items-center space-x-2">
          <img
            src={record.imageLink}
            alt={record.bookTitle}
            style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
          />
          <span>{record.bookTitle}</span>
        </div>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount) => amount.toLocaleString(),
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'salePrice',
      key: 'salePrice',
      align: 'right',
      render: (salePrice) => salePrice.toLocaleString(),
    },
    {
      title: 'Tổng tiền',
      key: 'total',
      align: 'right',
      render: (text, record) => (record.amount * record.salePrice).toLocaleString(),
    },
  ];

  const breadcrumbs = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Chi tiết đơn hàng' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <a className="mb-6 text-2xl flex items-center justify-start">
      <Title text1={'Chi tiết'} text2={'đơn hàng'}/>
      </a>
      <div style={{ padding: '20px' }}>
        <div ref={componentRef}>
          
          {orderInfo && (
            <>
              <Row>
                <Col span={12}>
                  <Text strong>Ngày tạo đơn hàng: </Text>
                  {new Date(orderInfo.created).toLocaleDateString()} {/* Display formatted order date */}
                </Col>
              </Row>
              <Row style={{ margin: '10px 0' }}>
                <Col span={12}>
                  <Text strong>Địa chỉ: </Text>
                  {addressName}
                </Col>
              </Row>
              <Divider />
            </>
          )}

          <Table
            columns={columns}
            dataSource={orderDetails}
            pagination={false}
            summary={(pageData) => {
              let total = 0;
              pageData.forEach(({ amount, salePrice }) => {
                total += amount * salePrice;
              });

              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={3}>Tạm tính</Table.Summary.Cell>
                    <Table.Summary.Cell align="right">{total.toLocaleString()}</Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={3}>Tiền vận chuyển</Table.Summary.Cell>
                    <Table.Summary.Cell align="right">{orderInfo?.shippingPrice?.toLocaleString() || '30,000'}</Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={3}>
                      <Text strong>Tổng</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell align="right">
                      <Text strong>{(total + (orderInfo?.shippingPrice || 30000)).toLocaleString()}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
