import React, { useState } from 'react';
import { Row, Col, Image, Typography, Divider, Button, Modal } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ProductDetail = () => {
  // Dữ liệu giả cho cuốn sách
  const book = {
    title: 'Phép Mầu Ở Ga Nishi-Yuigahama',
    specialEdition: 'Bản Đặc Biệt',
    price: 82500, // Đơn vị là VNĐ
    description:
      'Ngày thành phố Kamakura đón trận gió đầu xuân...',
    images: [
      'https://product.hstatic.net/200000287623/product/phep_mau_o_ga_nishi-yuigahama_-_bia1_46fbb580a679436695be10a8b42054a5_large.jpg',
      'https://product.hstatic.net/200000287623/product/phep_mau_o_ga_nishi-yuigahama_-_bia1_46fbb580a679436695be10a8b42054a5_large.jpg',
      'https://product.hstatic.net/200000287623/product/phep_mau_o_ga_nishi-yuigahama_-_bia1_46fbb580a679436695be10a8b42054a5_large.jpg',
      // Thêm nhiều hình ảnh nếu cần
    ],
    publisher: 'Hồng Đức',
    publicationYear: 2024,
    format: 'Bìa mềm',
    dimensions: '13 x 18 cm',
  };

  const [selectedImage, setSelectedImage] = useState(book.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Giỏ hàng (giả lập)
  const [cartItems, setCartItems] = useState(0);
  const totalPrice = quantity * book.price;

  const handleAddToCart = () => {
    setCartItems(cartItems + quantity);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Reset quantity after adding to cart
    setQuantity(1);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <Row gutter={[16, 16]} className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Hình chính */}
        <Col xs={24} sm={12} md={10} className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {book.images.map((image, index) => (
              <Image
                src={image}
                alt={`Book Image ${index}`}
                key={index}
                width="100%"
                style={{ objectFit: 'cover', borderRadius: 4, cursor: 'pointer' }}
                onClick={() => setSelectedImage(image)} // Thay đổi hình khi nhấn
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <Image
              src={selectedImage}
              alt="Main Book Cover"
              width="100%"
              style={{ objectFit: 'cover', borderRadius: 4 }}
            />
          </div>
        </Col>

        {/* Thông tin sách */}
        <Col xs={24} sm={12} md={14} className='flex-1'>
          <Title level={3} className='font-medium text-2xl mt-2'>{book.title}</Title>
          <Text type="secondary" className='text-lg mt-2'>By {book.author}</Text>
          <Divider />
          <Text>
            <strong>Price:</strong> <Text type="danger" className='mt-5 text-3xl font-medium'>{book.price.toLocaleString()}đ</Text>
          </Text>

          {/* Thông tin bổ sung */}
          <Row gutter={[16, 16]} className="mt-5">
            <Col span={12}>
              <Text><strong>Nhà xuất bản:</strong> {book.publisher}</Text>
            </Col>
            <Col span={12}>
              <Text><strong>Năm xuất bản:</strong> {book.publicationYear}</Text>
            </Col>
            <Col span={12}>
              <Text><strong>Hình thức:</strong> {book.format}</Text>
            </Col>
            <Col span={12}>
              <Text><strong>Kích thước:</strong> {book.dimensions}</Text>
            </Col>
          </Row>

          <Divider />
          <Text className='mt-5 text-gray-500 md:w-4/5'>{book.description}</Text>

          {/* Bộ đếm số lượng */}
          <div className='flex items-center mt-4'>
            <Button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
            <Text className='mx-4'>{quantity}</Text>
            <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
          </div>

          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            size="large"
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 mt-5 flex items-center justify-center'
            style={{ marginTop: '20px' }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Divider />
        </Col>
      </Row>

      {/* Mô tả và đánh giá */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p><b>User1:</b> This book is fantastic!</p>
          <p><b>User2:</b> A must-read for everyone.</p>
        </div>
      </div>

      {/* Modal hiển thị giỏ hàng */}
      <Modal
  title="Thông tin giỏ hàng"
  visible={isModalVisible}
  onCancel={handleCancel}
  footer={null} // Bỏ nút Cancel và Ok
  width={1000}
  style={{ display: 'flex', flexDirection: 'column', height: '100%' }} // Make modal a flex container
>
  <div style={{ flex: 1 }}> {/* Take up available space */}
    <Row gutter={[16, 16]}>
      {/* Dòng thông báo giỏ hàng */}
      {/* Bên trái: Thông tin sản phẩm */}
      <Col xs={24} sm={12}>
        <Col xs={24}>
          <h1 className='font-bold text-lg my-3'>Giỏ hàng của bạn đã được cập nhật</h1>
        </Col>
        <div className="flex">
          <div className="flex-shrink-0">
            <Image
              src={selectedImage}
              alt="Book Image"
              width={150}
              style={{ objectFit: 'cover', borderRadius: 4 }}
            />
          </div>
          <div className="ml-2" style={{ marginLeft: '10px' }}>
            <Title level={4} className='mt-2'>{book.title}</Title>
            <Text className='text-lg block'>{book.price.toLocaleString()}đ</Text>
            <Text className='block'><strong>Số lượng:</strong> {quantity}</Text>
          </div>
        </div>
      </Col>
      {/* Bên phải: Thông tin số lượng và các nút */}
      <Col xs={24} sm={12}>
        <h1 className='font-bold text-lg my-3'>Giỏ hàng của bạn hiện có {cartItems} sản phẩm</h1>
        <Divider />
        <Text className='block mt-2'><strong>Tổng cộng:</strong> {totalPrice.toLocaleString()}đ</Text>
      </Col>
    </Row>
  </div>
  
  {/* Bên dưới: Nút */}
  <div className='flex justify-end mt-9'>
    <Button type="primary" onClick={handleOk} style={{ marginRight: '8px' }}>Tiếp tục đặt hàng</Button>
    <Button type="primary" danger onClick={handleOk}>Thanh toán</Button>
  </div>
</Modal>

    </div>
  );
};

export default ProductDetail;
