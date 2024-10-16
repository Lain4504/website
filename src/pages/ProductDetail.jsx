import React, { useEffect, useState, useRef, useContext } from 'react';
import { Typography, Button, Modal, Row, Col, Carousel, Input, Image, Divider } from 'antd';
import { MinusOutlined, PlusOutlined, LeftOutlined, RightOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookById, getCollectionByBookId } from '../services/BookService';
import { addWishList, deleteWishList, getWishlistByUserId } from '../services/WishlistService';
import parser from 'html-react-parser';
import Breadcrumb from '../components/Breadcrumb';
import { AuthContext } from '../context/AuthContext';
import { getPublisherById } from '../services/PublisherService';
import TabSwitchProductDetail from '../components/TabSwitchProductDetail';

const { Title, Text, Paragraph } = Typography;

const ProductDetail = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const carouselRef = useRef(null);
  const [heart, setHeart] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser ? currentUser.userId : null;
  const [collections, setCollections] = useState([]);
  const [publisher, setPublisher] = useState(null);
  const navigate = useNavigate();
  const fetchBook = async () => {
    try {
      const response = await getBookById(id);
      const { data } = response;
      setBook(data);
      if (data.publisherId) {
        const publisherResponse = await getPublisherById(data.publisherId);
        setPublisher(publisherResponse.data);
      }
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };
  const fetchCollections = async (id) => {
    try {
      const response = await getCollectionByBookId(id);
      setCollections(response.data);
      console.log("Book's Collection:", collections)
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };
  const fetchWishlist = async (userId) => {
    if (!userId) return; // Return early if userId is not available

    try {
      const response = await getWishlistByUserId(userId);
      console.log(response);
      setWishlistItems(response.data);
      const wishlisted = response.data.some(wishlistItem => wishlistItem.bookId === book.id);
      console.log('Is the book wishlisted?', wishlisted);
      setHeart(wishlisted);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };
  useEffect(() => {
    // Fetch book and wishlist data
    const fetchData = async () => {
      await fetchBook();
      if (userId) {
        fetchWishlist(userId); // Call fetchWishlist after fetching book
      }
      await fetchCollections(id);
    };
    fetchData();
  }, [id, userId]);
  // Theo dõi sự thay đổi của `book` để cập nhật trạng thái `heart`
  useEffect(() => {
    if (book.id && userId) {
      fetchWishlist(userId); // Kiểm tra wishlist mỗi khi book hoặc userId thay đổi
    }
  }, [book, userId]);


  // Handle adding/removing from wishlist
  const toggleHeart = () => {
    if (!userId) {
      navigate('/login');
      return;
    }

    if (heart) {
      // Tìm wishlistItem trong wishlistItems
      const wishlistItem = wishlistItems.find(item => item.bookId === book.id);
      if (wishlistItem) {
        const wishlistId = wishlistItem.id; // Lấy wishlistId

        // Gọi deleteWishList với wishlistId
        deleteWishList(wishlistId).then(() => {
          setHeart(false);
          setWishlistItems(prevItems => prevItems.filter(item => item.id !== wishlistId)); // Cập nhật wishlistItems
        }).catch(err => console.error(err));
      }
    } else {
      // Gọi addWishList như cũ
      addWishList(userId, book.id).then(() => {
        setHeart(true);
        fetchWishlist(userId); // Cập nhật wishlistItems sau khi thêm
      }).catch(err => console.error(err));
    }
  };
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
  const totalPrice = book.salePrice ? book.salePrice * quantity : 0;
  const selectedImage = book_images.length > 0 ? book_images[0].link : '';
  const breadcrumbs = [
    { title: 'Trang chủ', href: '/' },
    { title: book.title }
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Breadcrumb items={breadcrumbs} className="my-10" />
      <div className="container mx-auto px-4 py-8">
        <Row gutter={16}>
          <Col xs={24} md={10}>
            <div className="relative">
              {book.discount && (
                <div className="absolute top-0 right-0 bg-red-500 text-white px-1 py-1 text-sm rounded-bl-lg z-10">
                  -{book.discount * 100}%
                </div>
              )}
              <Carousel
                ref={carouselRef}
                autoplay
                autoplaySpeed={10000} // Tốc độ tự động chuyển (ms)
                speed={1000} // Thời gian chuyển đổi giữa các slide (ms)
                dots={true} // Hiển thị chấm ở dưới cùng
                effect="fade" // Hiệu ứng mờ dần thay vì cuộn
              >
                {book_images.map((image, index) => (
                  <div key={index}>
                    <Image
                      width="100%"
                      height="auto"
                      src={image.link}
                      alt={`Image ${index + 1}`}
                      className="rounded-lg shadow-lg"
                      preview={{ src: image.link }}
                      style={{
                        transition: 'opacity 0.5s ease-in-out', // Mượt mà hơn khi ảnh xuất hiện
                        opacity: 1
                      }}
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
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    border: 'none',
                    color: 'black'
                  }}
                  onClick={() => {
                    carouselRef.current.next();
                  }}
                />
              </div>
            </div>
          </Col>

          <Col xs={24} md={24} lg={14}>
            <h1 className="text-xl font-bold my-2">{book.title}</h1>
            <span className="text-gray-600 text-sm">ISBN: {book.isbn}</span>

            <div className="flex items-center mt-2">
              <span className="text-lg font-semibold text-green-600">
                {book.salePrice ? book.salePrice.toLocaleString() : 'N/A'}₫
              </span>
              <del className="ml-2 text-gray-500">
                {book.price ? book.price.toLocaleString() : 'N/A'}₫
              </del>
              {heart ? (
                <HeartFilled
                  onClick={toggleHeart}
                  style={{ color: '#c20000', cursor: 'pointer', fontSize: '24px', marginLeft: 'auto' }}
                />
              ) : (
                <HeartOutlined
                  onClick={toggleHeart}
                  style={{ color: '#000000', cursor: 'pointer', fontSize: '24px', marginLeft: 'auto' }}
                />
              )}
            </div>

            <div className="mt-4 text-xs">
              <Row gutter={16}>
                <Col span={12}>
                  <strong>Tác giả:</strong>
                  {book_authors.map((author, index) => (
                    <span key={index} className="text-blue-600 hover:underline">
                      {author.name}&nbsp;
                    </span>
                  ))}
                </Col>
                <Col span={12}>
                  <strong>Nhà xuất bản:</strong> <span>{publisher ? publisher.name : 'N/A'}</span>
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
                <Col span={12}></Col>
              </Row>
            </div>

            <div className="mt-4">
              <strong>Nội dung:</strong>
              <Paragraph className="mt-2" style={{ fontSize: '14px', fontWeight: '300' }}>
                {typeof book.description === 'string'
                  ? parser(book.description)
                  : 'Nội dung không có sẵn.'}
              </Paragraph>
            </div>

            <form className="mt-4">
              <div className="flex items-center">
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
                <Button
                  className="ml-4 bg-black text-white hover:bg-gray-800"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </form>

            <div className="mt-4">
              <p>
                Danh mục:
                {collections.length > 0 ? (
                  <>
                    {collections.map((collectionItem, index) => (
                      <span key={collectionItem.collectionId} className="text-blue-600 hover:underline">
                        {index === 0 && ' '} {/* Thêm một dấu cách cho item đầu tiên */}
                        <a href={`/collections/${collectionItem.collection.id}`}>
                          {collectionItem.collection.name}
                        </a>
                        {index < collections.length - 1 && ', '}
                      </span>
                    ))}
                  </>
                ) : (
                  <span>Không có danh mục nào.</span>
                )}
              </p>
            </div>
          </Col>
        </Row>
        <Divider />
        <TabSwitchProductDetail description={book.description}/>
      </div>
    </div>
  );
};

export default ProductDetail;
