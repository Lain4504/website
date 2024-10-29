import React, { useEffect, useState, useRef, useContext } from 'react';
import { Typography, Button, Modal, Row, Col, Carousel, Input, Image, Divider } from 'antd';
import { MinusOutlined, PlusOutlined, LeftOutlined, RightOutlined, HeartOutlined, HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAuthorByBookId, getBookById, getCollectionByBookId } from '../../services/BookService';
import { addWishList, deleteWishList, getWishlistByUserId } from '../../services/WishlistService';
import parser from 'html-react-parser';
import Breadcrumb from '../../components/shared/Breadcrumb';
import { AuthContext } from '../../context/AuthContext';
import { getPublisherById } from '../../services/PublisherService';
import TabSwitchProductDetail from '../../components/productpage/TabSwitchProductDetail';
import RelevantByAuthor from '../../components/productpage/RelevantByAuthor';
import { Form } from 'antd';
import AddToCartModal from '../../components/modal/AddToCartModal';
import { addToCart, getAllCartByUserId } from '../../services/CartService';

const { Paragraph } = Typography;

const ProductDetail = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const carouselRef = useRef(null);
  const [heart, setHeart] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.userId || null;
  const [collections, setCollections] = useState([]);
  const [publisher, setPublisher] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [cartItems, setCartItems] = useState(0); 
  const [totalPrice, setTotalPrice] = useState(0); 
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBookById(id);
        setBook(response.data);
        if (response.data.images && response.data.images.length > 0) {
          setSelectedImage(response.data.images[0].link);
      }
        if (response.data.publisherId) {
          const publisherResponse = await getPublisherById(response.data.publisherId);
          setPublisher(publisherResponse.data);
        }

        const [collectionsResponse, authorsResponse] = await Promise.all([
          getCollectionByBookId(id),
          getAuthorByBookId(id),
        ]);
        setCollections(collectionsResponse.data);
        setAuthors(authorsResponse.data);

        if (userId) {
          const wishlistResponse = await getWishlistByUserId(userId);
          setWishlistItems(wishlistResponse.data || []);
          setHeart(wishlistResponse.data.some(item => item.bookId === response.data.id));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id, userId]);

  const toggleHeart = async () => {
    if (!userId) return navigate('/login');

    const wishlistItem = wishlistItems.find(item => item.bookId === book.id);
    try {
      if (heart) {
        if (wishlistItem) {
          await deleteWishList(wishlistItem.id);
          setHeart(false);
          setWishlistItems(prevItems => prevItems.filter(item => item.id !== wishlistItem.id));
        }
      } else {
        await addWishList(userId, book.id);
        setHeart(true);
        const updatedWishlist = await getWishlistByUserId(userId);
        setWishlistItems(updatedWishlist.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async () => {
    const cartItem = {
      userId: userId,
      bookId: book.id,
      quantity: quantity,
      price: book.salePrice * quantity,
    };
  
    // Log ra từng dòng dữ liệu
    console.log("User ID:", userId);
    console.log("Book ID:", book.id);
    console.log("Quantity:", quantity);
    console.log("Calculated Price:", cartItem.price);
    console.log("Cart Item:", cartItem);
  
    try {
      await addToCart(cartItem);
      setIsModalVisible(true);
      setCartItems(prev => prev + quantity);
      setTotalPrice(prev => prev + cartItem.price);
      console.log("Added to cart successfully.");
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };
  

  const handleModalOk = () => {
    console.log("Proceeding to checkout");
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    const fetchCartItems = async () => {
      try{
        const response = await getAllCartByUserId(userId);
        setCartItems(response.data.length);
      } catch (error){
        console.error("Error fetching cart items", error);
      }
    };
    fetchCartItems();
  },[userId])
  const bookImages = book.images || [];
  const publicationYear = new Date(book.publicationDate).getFullYear();
  const breadcrumbs = [{ title: 'Trang chủ', href: '/' }, { title: book.title }];

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
                    -{(book.discount * 100).toFixed(0)}%
                </div>
              )}
              <Carousel ref={carouselRef} autoplay autoplaySpeed={10000} speed={1000} dots effect="fade">
                {bookImages.map((image, index) => (
                  <Image key={index} width="100%" height="auto" src={image.link} alt={`Image ${index + 1}`} className="rounded-lg shadow-lg" preview={{ src: image.link }} />
                ))}
              </Carousel>
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                <Button shape="circle" icon={<LeftOutlined />} size="large" onClick={() => carouselRef.current.prev()} />
              </div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                <Button shape="circle" icon={<RightOutlined />} size="large" onClick={() => carouselRef.current.next()} />
              </div>
            </div>
          </Col>
          <Col xs={24} md={24} lg={14}>
            <h1 className="text-xl font-bold my-2">{book.title}</h1>
            <span className="text-gray-600 text-sm">ISBN: {book.isbn}</span>
            <div className="flex items-center mt-2">
              <span className="text-lg font-semibold text-green-600">{book.salePrice ? book.salePrice.toLocaleString() : 'N/A'}₫</span>
              <del className="ml-2 text-gray-500">{book.price ? book.price.toLocaleString() : 'N/A'}₫</del>
              {heart ? (
                <HeartFilled onClick={toggleHeart} style={{ color: '#c20000', cursor: 'pointer', fontSize: '24px', marginLeft: 'auto' }} />
              ) : (
                <HeartOutlined onClick={toggleHeart} style={{ color: '#000000', cursor: 'pointer', fontSize: '24px', marginLeft: 'auto' }} />
              )}
            </div>
            <div className="mt-4 text-xs">
              <Row gutter={16}>
                <Col span={12}>
                  <strong>Tác giả:</strong> {authors.length > 0 ? authors.map((authorItem, index) => (
                    <span key={authorItem.collectionId} className="text-blue-600">{index > 0 && ', '}<a>{authorItem.author.name}</a></span>
                  )) : <span>Không có tác giả nào.</span>}
                </Col>
                <Col span={12}><strong>Nhà xuất bản:</strong> <span>{publisher?.name || 'N/A'}</span></Col>
              </Row>
              <Row gutter={16} className="mt-2">
                <Col span={12}><strong>Năm xuất bản:</strong> <span>{publicationYear}</span></Col>
                <Col span={12}><strong>Hình thức:</strong> <span>{book.cover}</span></Col>
              </Row>
              <Row gutter={16} className="mt-2">
                <Col span={12}><strong>Kích thước:</strong> <span>{book.size}</span></Col>
              </Row>
            </div>
            <div className="mt-4">
              <strong>Nội dung:</strong>
              <Paragraph className="mt-2" style={{ fontSize: '14px', fontWeight: '300' }}>
                {typeof book.description === 'string' ? parser(book.description) : 'Nội dung không có sẵn.'}
              </Paragraph>
            </div>
            <Form className="mt-4">
              <Form.Item label="Số lượng:" className="flex items-center">
                <Button type="default" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} icon={<MinusOutlined style={{ color: 'white' }} />} style={{ backgroundColor: 'black', color: 'white' }} />
                <Input value={quantity} readOnly className="border border-black rounded-md w-16 text-center mx-2" />
                <Button type="default" onClick={() => setQuantity(quantity + 1)} icon={<PlusOutlined style={{ color: 'white' }} />} style={{ backgroundColor: 'black', color: 'white' }} />
              </Form.Item>
              <Button className=" bg-black text-white hover:bg-gray-800" onClick={handleAddToCart}><ShoppingCartOutlined /> Thêm vào giỏ hàng</Button>
            </Form>
             <div className="mt-4">
              <p>
                Danh mục:
                {collections.length > 0 ? collections.map((collectionItem, index) => (
                  <span key={collectionItem.collectionId} className="text-blue-600 hover:underline">{index > 0 && ', '}<Link to={`/collections/${collectionItem.collection.id}`}> {collectionItem.collection.name}</Link></span>
                )) : <span>Không có danh mục nào.</span>}
              </p>
            </div>
          </Col>
        </Row>
        <Divider />
        <TabSwitchProductDetail book={book} userId={userId} />
        <Divider />
        <RelevantByAuthor authors={authors} />
      </div>
      {/* AddToCartModal integration */}
      <AddToCartModal
        isModalVisible={isModalVisible}
        handleOk={handleModalOk}
        handleCancel={handleModalCancel}
        book={book}
        selectedImage={selectedImage}
        quantity={quantity}
        cartItems={cartItems}
        totalPrice={totalPrice}
      />

    </div>
  );
};

export default ProductDetail;
