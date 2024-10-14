import React from 'react'
import { Typography, Card, Divider } from 'antd'

const { Title, Paragraph, Text } = Typography

const ShippingPolicy = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
        <Title level={2} className="text-center">Chính sách vận chuyển</Title>
        <Paragraph>
          Chào mừng Quý khách đến với website <Text strong>ipm.vn</Text>
        </Paragraph>

        <Paragraph>
          Khi mua sắm tại website, chi phí vận chuyển sẽ thanh toán với đơn vị vận chuyển.
        </Paragraph>

        <Divider />

        <Title level={4}>Thời gian giao hàng:</Title>
        <Paragraph>
          <Text strong>Đối với mặt hàng có sẵn:</Text> thời gian giao hàng sẽ từ 3 đến 7 ngày tùy vào địa phương Quý khách nhận hàng.
        </Paragraph>
        <Paragraph>
          <Text strong>Đối với mặt hàng đặt trước (Pre-order):</Text> thời gian giao hàng sẽ từ 3 đến 7 ngày tính từ thời điểm sách chính thức phát hành.
        </Paragraph>

        <Divider />

        <Title level={4}>Ưu đãi vận chuyển:</Title>
        <Paragraph>
          Miễn phí đơn hàng đối với các đơn hàng có giá trị <Text strong>từ 150K trở lên</Text> tại Hà Nội.
        </Paragraph>
        <Paragraph>
          Miễn phí đơn hàng đối với các đơn hàng có giá trị <Text strong>từ 350K trở lên</Text> ở các tỉnh thành khác.
        </Paragraph>

        <Divider />

        <Paragraph>
          Đơn hàng nhận tại cửa hàng: Đến địa chỉ <Text italic>110 Nguyễn Ngọc Nại, Thanh Xuân, Hà Nội</Text> từ 8h30 đến 17h30 (Thứ 2 - Thứ 6). Hotline: <Text underline>03 3319 3979</Text>.
        </Paragraph>
        
        <Divider />

        <Paragraph>
          Thời gian ưu đãi từ <Text strong>12/4/2021</Text> đến <Text strong>12/5/2021</Text>. Mọi thắc mắc, vui lòng gọi <Text underline>03 3319 3979</Text>.
        </Paragraph>
    </div>
  )
}

export default ShippingPolicy
