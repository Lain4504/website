import React, { useEffect, useState, useRef } from 'react';
import { Typography, Button, Modal, Row, Col, Carousel, Input, Image, Divider } from 'antd';
import { ShoppingCartOutlined, MinusOutlined, PlusOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/BookService';
import parser from 'html-react-parser'; // Import html-react-parser

const { Title, Text, Paragraph } = Typography;

const ProductDetail = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const carouselRef = useRef(null); // Tạo ref cho Carousel

  // Fetch book data by ID
  const fetchBook = async () => {
    const response = await getBookById(id);
    const { data } = response;
    console.log(data);
    setBook(data);
  };

  useEffect(() => {
    fetchBook();
  }, []);

  // Handle adding to cart
  const handleAddToCart = () => {
    setCartItems(cartItems + quantity);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setQuantity(1);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const book_images = book.images ? book.images : [];
  const book_authors = book.author ? book.author : [];
  const totalPrice = book.salePrice ? book.salePrice * quantity : 0; // Calculate total price based on quantity and sale price
  const selectedImage = book_images.length > 0 ? book_images[0].link : ''; // Select the first image

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <Row gutter={16}>
          <Col xs={24} md={10}>
            <div className="relative">
              {book.discount && (
                <div className="absolute top-0 right-0 bg-red-500 text-white px-1 py-1 text-sm rounded-bl-lg z-50">
                  -{book.discount * 100}%
                </div>
              )}
              <Carousel ref={carouselRef}>
                {book_images.map((image, index) => (
                  <div key={index}>
                    <Image
                      width="100%"
                      height="auto"
                      src={image.link}
                      alt={`Image ${index + 1}`}
                      className="rounded-lg shadow-lg"
                      preview={{ src: image.link }} // Allows clicking to see a larger image
                    />
                  </div>
                ))}
              </Carousel>
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                <Button
                  shape="circle"
                  icon={<LeftOutlined />}
                  size="large"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', border: 'none', color: 'black' }}
                  onClick={() => {
                    carouselRef.current.prev();
                  }}
                />
              </div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                <Button
                  shape="circle"
                  icon={<RightOutlined />}
                  size="large"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', border: 'none', color: 'black' }}
                  onClick={() => {
                    carouselRef.current.next();
                  }}
                />
              </div>
            </div>
          </Col>
          <Col xs={24} md={24} lg={14}>
            <h1 className="text-xl font-bold my-2">{book.title}</h1>
            <span className="text-gray-600 text-sm">ISBN: {book.isbn} </span>
            <div className="mt-2">
              <span className="text-lg font-semibold text-green-600">{book.salePrice ? book.salePrice.toLocaleString() : 'N/A'}₫</span>
              <del className="ml-2 text-gray-500">{book.price ? book.price.toLocaleString() : 'N/A'}₫</del>
            </div>

            <div className="mt-4 text-xs">
              <Row gutter={16}>
                <Col span={12}>
                  <strong>Tác giả:</strong> {book_authors.map((author, index) => (
                    <span key={index} className="text-blue-600 hover:underline">{author.name}&nbsp;</span>
                  ))}
                </Col>
                <Col span={12}>
                  <strong>Nhà xuất bản:</strong> <span>{book.publisher?.name}</span>
                </Col>
              </Row>
              <Row gutter={16} className="mt-2">
                <Col span={12}>
                  <strong>Năm xuất bản:</strong> <span>{book.publicationYear}</span>
                </Col>
                <Col span={12}>
                  <strong>Hình thức:</strong> <span>{book.cover}</span>
                </Col>
              </Row>
              <Row gutter={16} className="mt-2">
                <Col span={12}>
                  <strong>Kích thước:</strong> <span>{book.size}</span>
                </Col>
                <Col span={12}></Col> {/* Thêm cột rỗng nếu cần thiết */}
              </Row>
            </div>


            <div className="mt-4">
              <strong>Nội dung:</strong>
              <Paragraph className="mt-2" style={{ fontSize: '14px', fontWeight: '300' }}>
                {typeof book.description === 'string' ? parser(book.description) : 'Nội dung không có sẵn.'}
              </Paragraph>
            </div>

            <form className="mt-4">
              <div className="flex items-center mt-4">
                <label className="mr-2 text-black">Số lượng:</label>
                <Button
                  type="default"
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="border border-black rounded-md px-1 text-black"
                  icon={<MinusOutlined style={{ color: 'white' }} />}
                  style={{ backgroundColor: 'black', color: 'white' }}
                />
                <Input
                  value={quantity}
                  readOnly
                  className="border border-black rounded-md w-16 text-center mx-2"
                  style={{ color: 'black', backgroundColor: 'white' }}
                />
                <Button
                  type="default"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border border-black rounded-md px-1 text-black"
                  icon={<PlusOutlined style={{ color: 'white' }} />}
                  style={{ backgroundColor: 'black', color: 'white' }}
                />
              </div>

              <div className="flex items-center mt-4">
                <Button className="bg-red-600 text-white hover:bg-red-700 mr-2" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </Button>
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  Mua Ngay
                </Button>
              </div>
            </form>

            <div className="mt-4">
              <p>Danh mục: <span className="text-blue-600 hover:underline"><a href="/collections/sach-moi">Sách Mới</a></span>, <span className="text-blue-600 hover:underline"><a href="/collections/light-novel">Light Novel</a></span></p>
            </div>
          </Col>
        </Row>
      </div>

      <Modal
        title="Thông tin giỏ hàng"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1000}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div style={{ flex: 1 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Col xs={24}>
                <h1 className="font-bold text-lg my-3">Giỏ hàng của bạn đã được cập nhật</h1>
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
                  <Title level={4} className="mt-2">{book.title}</Title>
                  <Text className="text-lg block">{book.salePrice?.toLocaleString()}₫</Text>
                  <Text className="block"><strong>Số lượng:</strong> {quantity}</Text>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <h1 className="font-bold text-lg my-3">Giỏ hàng của bạn hiện có {cartItems} sản phẩm</h1>
              <Divider />
              <Text className="block mt-2"><strong>Tổng cộng:</strong> {totalPrice.toLocaleString()}₫</Text>
            </Col>
          </Row>
        </div>
        <div className="flex justify-end mt-9">
          <Button type="primary" onClick={handleOk} style={{ marginRight: '8px' }}>Tiếp tục đặt hàng</Button>
          <Button type="primary" danger onClick={handleOk}>Thanh toán</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetail;
