import React from 'react';
import { Modal, Row, Col, Button, Image, Typography, Divider } from 'antd';

const { Title, Text } = Typography;

const AddToCartModal = ({ isModalVisible, handleOk, handleCancel, book, quantity, selectedImage, cartItems, totalPrice }) => {
  console.log(selectedImage);
  return (
    <Modal
      title="Thông tin giỏ hàng"
      open={isModalVisible} 
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
  );
};

export default AddToCartModal;
