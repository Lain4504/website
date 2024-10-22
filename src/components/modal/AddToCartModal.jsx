import React from 'react';
import { Modal, Row, Col, Button, Image, Typography } from 'antd';

const { Title, Text } = Typography;

const AddToCartModal = ({ isModalVisible, handleOk, handleCancel, book, quantity, selectedImage }) => {
  // Tính tổng giá tiền
  const totalPrice = book.salePrice * quantity;

  return (
    <Modal
      title="Thông tin giỏ hàng"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Row gutter={[16, 16]} justify="center">
        <Col span={8}>
          <Image
            src={selectedImage}
            alt="Book Image"
            width={150}
            style={{ objectFit: 'cover', borderRadius: 4 }}
          />
        </Col>
        <Col span={16}>
          <Title level={4}>{book.title}</Title>
          <Text>{book.salePrice?.toLocaleString()}₫</Text>
          <div>
            <Text><strong>Số lượng:</strong> {quantity}</Text>
          </div>
          <div>
            <Text><strong>Tổng cộng:</strong> {totalPrice.toLocaleString()}₫</Text>
          </div>
        </Col>
      </Row>
      <div className="flex justify-end mt-9">
        <Button type="primary" onClick={handleOk} style={{ marginRight: '8px' }}>
          Tiếp tục mua sắm
        </Button>
      </div>
    </Modal>
  );
};

export default AddToCartModal;
