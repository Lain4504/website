import React, { useContext, useEffect, useState } from 'react';
import { Table, InputNumber, Button, Row, Col, message, Popover } from 'antd';
import { updateCartItem, getAllCartByUserId } from '../../services/CartService';
import Breadcrumb from '../../components/shared/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ArrowRightOutlined } from '@ant-design/icons';

const Cart = () => {
  const [tempCart, setTempCart] = useState({ orderDetails: [] });
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.userId || null;

  // Fetch cart when component mounts
  useEffect(() => {
    getAllCartByUserId(userId).then(response => {
      setTempCart(response.data); // Set the fetched cart data
    }).catch(error => {
      console.error("Error fetching cart:", error);
    });
  }, [userId]);

  const handleItemChange = (value, order_id) => {
    setTempCart(cart => {
      const newCart = { ...cart };
      newCart.orderDetails = newCart.orderDetails.map(item => {
        if (item.id === order_id && value <= item.book.stock && value >= 1) {
          item.amount = value;
        }
        return item;
      });
      return newCart;
    });
  };

  const deleteCartItemHandler = (order_id) => {
    setTempCart(cart => {
      const newCart = { ...cart };
      newCart.orderDetails = newCart.orderDetails.filter(item => item.id !== order_id);
      return newCart;
    });

    // Log tempCart before sending the delete request
    console.log("Deleting cart item. Updated cart data:", tempCart);

    updateCartItem(tempCart).then(res => {
      console.log("Cart item deleted:", res);
    }).catch(error => {
      console.error("Error deleting cart item:", error);
    });
  };

  const updateCart = () => {
    // Log tempCart before sending the update request
    console.log("Updating cart with data:", tempCart);

    updateCartItem(tempCart).then(res => {
      console.log("Cart updated successfully:", res);
    }).catch(error => {
      console.error("Error updating cart:", error);
    });
  };
  const [visible, setVisible] = useState(false);

  const checkout = () => {
    if (!tempCart || tempCart.orderDetails.length === 0) {
      setVisible(true); // Hiển thị thông báo nếu giỏ hàng rỗng
    } else {
      navigate('/checkout'); // Điều hướng sang trang thanh toán nếu giỏ hàng có sản phẩm
    }
  };
  

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'book',
      key: 'book',
      render: (text, item) => (
        <div className="flex items-center">
          <Link to={`/products/${item.book.id}`}>
            <img src={item.book.images[0]?.link} alt={item.book.title} className="w-24 h-auto" />
          </Link>
          <div className="ml-4">
            <Link to={`/products/${item.book.id}`} className="text-red-600 font-bold no-underline">
              {item.book.title}
            </Link>
            <div className='text-gray-500 cursor-pointer mt-2' onClick={() => deleteCartItemHandler(item.id)}>
              <i></i> Xóa
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'salePrice',
      key: 'salePrice',
      render: (text, item) => <span>{item.salePrice?.toLocaleString()}₫</span>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, item) => (
        <div>
          <InputNumber
            min={1}
            max={item.book.stock}
            value={item.amount}
            onChange={(value) => handleItemChange(value, item.id)}
          />
          <div className="text-sm mt-1">Kho: {item.book.stock}</div>
        </div>
      ),
    },
    {
      title: 'Tổng giá',
      key: 'totalPrice',
      render: (text, item) => <span>{(item.salePrice * item.amount).toLocaleString()}₫</span>,
    },
  ];

  const breadcrumbs = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Giỏ hàng' }
  ];
  const content = <p>Giỏ hàng của bạn trống, không thể thanh toán.</p>;

  return (
    <>
      <Breadcrumb items={breadcrumbs} className="my-10" />
      <div>
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-6">Giỏ hàng</h3>
          {tempCart.orderDetails.length === 0 ? (
            <h5 className="text-xl">Giỏ hàng của bạn trống</h5>
          ) : (
            <Table
              columns={columns}
              dataSource={tempCart.orderDetails}
              rowKey="id"
              pagination={false}
              className="mb-8"
            />
          )}
          <Row className="flex justify-between">
            <Col span={16}>
              <label htmlFor="CartSpecialInstructions" className="font-medium">
                Ghi chú
              </label>
              <textarea
                name="note"
                id="CartSpecialInstructions"
                className="input-full form-control w-full border rounded p-2"
              ></textarea>
            </Col>
            <Col span={8} className="text-right">
              <p className="mb-4">
                <span className="font-medium">Tạm tính: </span>
                <span className="h5 text-xl font-semibold">
                  {tempCart.orderDetails.reduce((total, item) => total + item.amount * item.salePrice, 0)?.toLocaleString()}₫
                </span>
              </p>
              <div className="flex justify-end gap-4"> {/* Flex container with space between buttons */}
                <Button
                  type="default"
                  className="bg-gray-300 hover:bg-gray-600 text-black hover:text-white"
                  onClick={updateCart}
                >
                  Cập nhật
                </Button>
                <Popover
      content={content}
      title="Thông báo"
      visible={visible}
      onVisibleChange={setVisible}
      trigger="click"
    >
      <Button
        type="primary"
        className="hover:bg-blue-600 flex items-center"
        onClick={checkout}
      >
        Thanh toán
        <ArrowRightOutlined className="ml-2" />
      </Button>
    </Popover>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Cart;
