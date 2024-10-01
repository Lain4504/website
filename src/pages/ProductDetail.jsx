import React, { useState } from 'react';
import { Typography, Button, Modal, Row, Col } from 'antd';


const ProductDetail = () => {
  // Dữ liệu giả cho cuốn sách
  const book = {
    title: 'Phép Mầu Ở Ga Nishi-Yuigahama',
    specialEdition: 'Bản Đặc Biệt',
    price: 82500, // Đơn vị là VNĐ
    description:
      'Ngày thành phố Kamakura đón trận gió đầu xuân, một đoàn tàu tốc hành trật bánh khiến bao gia đình mất người thân, bao người chịu niềm đau tử biệt. Một phụ nữ mất vị hôn phu, một thanh niên mất cha, một thiếu niên mất người trong mộng…',
    fullDescription:
      'Ngày thành phố Kamakura đón trận gió đầu xuân, một đoàn tàu tốc hành trật bánh khiến bao gia đình mất người thân, bao người chịu niềm đau tử biệt. Một phụ nữ mất vị hôn phu, một thanh niên mất cha, một thiếu niên mất người trong mộng… Song, chừng hai tháng sau vụ tai nạn thảm khốc ấy, có tin đồn truyền tới tai những người bị bỏ lại thế gian. Rằng tại ga Nishi-Yuigahama, ga gần nhất với hiện trường tàu trật bánh, xuất hiện một linh hồn nữ giới. Nếu làm theo chỉ dẫn của linh hồn đó, ta có thể ngược quá khứ để lên chuyến tàu định mệnh kia. Khi hay tin đồn, thân bằng quyến thuộc của các nạn nhân đều tới ga Nishi-Yuigahama để một lần được gặp lại người đã qua đời. Tập truyện viết về những cuộc hội ngộ như thế, qua bốn phân đoạn nối với nhau bởi chuyến tàu. Quá khứ đã được định đoạt, nhưng tương lai vẫn có cơ may thay đổi. Những người ở lại sẽ ra sao khi hội ngộ người thân yêu đã khuất? Mời bạn cùng IPM chờ đón câu chuyện đẹp đẽ, giàu xúc cảm này để tìm câu trả lời nhé!',
    images: [
      'https://product.hstatic.net/200000287623/product/phep_mau_o_ga_nishi-yuigahama_-_bia1_46fbb580a679436695be10a8b42054a5_large.jpg',
      'https://product.hstatic.net/200000287623/product/phep_mau_o_ga_nishi-yuigahama_-_bia1_46fbb580a679436695be10a8b42054a5_large.jpg',
      'https://product.hstatic.net/200000287623/product/phep_mau_o_ga_nishi-yuigahama_-_bia1_46fbb580a679436695be10a8b42054a5_large.jpg',
    ],
    publisher: 'Hồng Đức',
    publicationYear: 2024,
    format: 'Bìa mềm',
    dimensions: '13 x 18 cm',
  };

  const [selectedImage, setSelectedImage] = useState(book.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

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

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="wrapper-detail">
      <div className="container mx-auto px-4 py-8">
        <Row gutter={16}>
          <Col xs={24} md={10}>
            <div className="relative">
              <div className="absolute top-0 right-0 bg-red-500 text-white px-1 py-1 text-sm rounded-bl-lg">
                -25%
              </div>
              <img
                className="w-full h-auto max-w-full rounded-lg shadow-lg object-contain md:max-w-[300px] lg:max-w-[400px]"
                src={selectedImage}
                alt={book.title}
              />
            </div>

          </Col>
          <Col xs={24} md={14}>
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <span className="text-gray-600">SKU: 8935250714112</span>
            <div className="mt-2">
              <span className="text-lg font-semibold text-green-600">{book.price.toLocaleString()}₫</span>
              <del className="ml-2 text-gray-500">110,000₫</del>
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <div>
                  <strong>Tác giả:</strong> <span><a href="/collections/all/tacgia_takeshi-murase" className="text-blue-600 hover:underline">Takeshi Murase</a></span>
                </div>
                <div>
                  <strong>Nhà xuất bản:</strong> <span>{book.publisher}</span>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <strong>Năm xuất bản:</strong> <span>{book.publicationYear}</span>
                </div>
                <div>
                  <strong>Hình thức:</strong> <span>{book.format}</span>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <strong>Kích thước:</strong> <span>{book.dimensions}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <strong>Nội dung:</strong>
              <p className="mt-2">
                {showFullDescription ? book.fullDescription : book.description}
              </p>
              {book.fullDescription && !showFullDescription && (
                <Button type="link" onClick={toggleDescription}>
                  Xem thêm
                </Button>
              )}
              {showFullDescription && (
                <Button type="link" onClick={toggleDescription}>
                  Rút gọn
                </Button>
              )}
            </div>

            <form id="add-item-form" className="mt-4">
              <div className="flex items-center">
                <label className="mr-2">Phiên Bản:</label>
                <select className="border rounded-md p-2">
                  <option value="Bản Đặc Biệt">Bản Đặc Biệt</option>
                  <option value="Bản Thường">Bản Thường</option>
                </select>
              </div>
              <div className="flex items-center mt-4">
                <label className="mr-2">Số lượng:</label>
                <button type="button" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="border rounded-md px-2">-</button>
                <input type="text" value={quantity} readOnly className="border rounded-md w-16 text-center mx-2" />
                <button type="button" onClick={() => setQuantity(quantity + 1)} className="border rounded-md px-2">+</button>
              </div>
              <div className="mt-4">
                <Button type="primary" onClick={handleAddToCart} className="mr-2">Thêm vào giỏ</Button>
                <Button type="default" className="hidden">Mua ngay</Button>
              </div>
            </form>
            <div className="mt-4">
              <p>Danh mục: <span className="text-blue-600 hover:underline"><a href="/collections/sach-moi">Sách Mới</a></span></p>
            </div>
          </Col>
        </Row>
      </div>

      <Modal title="Thông báo" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Đã thêm {quantity} sách vào giỏ hàng!</p>
      </Modal>
    </div>
  );
};

export default ProductDetail;
