import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'; // Import icon DeleteOutlined
import { getWishlistByUserId, deleteWishList } from '../services/WishlistService';
import { getBookById } from '../services/BookService'; // Import hàm để lấy chi tiết sách
import Breadcrumb from '../components/Breadcrumb';

const { Meta } = Card;

const Wishlist = ({ cookies }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);
  const [hoveredItemId, setHoveredItemId] = useState(null); // State to track the hovered item

  const decodeJWT = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  // Hàm để lấy thông tin chi tiết từng cuốn sách trong wishlist
  const fetchBookDetails = async (bookId) => {
    try {
      const res = await getBookById(bookId);
      return res?.data;
    } catch (error) {
      message.error('Failed to fetch book details');
      return null;
    }
  };

  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Wishlist' }
  ];

  useEffect(() => {
    const token = cookies.authToken;
    if (token) {
      try {
        const decoded = decodeJWT(token);
        const userId = decoded[Object.keys(decoded).find(key => key.includes("nameidentifier"))];
        setUserId(userId);

        const fetchWishlist = async () => {
          try {
            const res = await getWishlistByUserId(userId);
            const wishlistData = await Promise.all(
              res?.data?.map(async (item) => {
                const bookDetails = await fetchBookDetails(item.bookId);
                return { ...item, book: bookDetails };
              })
            );
            setWishlist(wishlistData);
          } catch (error) {
            message.error('Failed to fetch wishlist');
          }
        };
        fetchWishlist();
      } catch (error) {
        message.error('Invalid token');
      }
    } else {
      message.error('No token found');
    }
  }, [cookies.authToken]);

  const deleteWishlist = (bookId) => {
    if (!userId) return;
    deleteWishList(userId, bookId)
      .then(() => {
        const newWishlist = wishlist.filter(item => item.book?.id !== bookId);
        setWishlist(newWishlist);
        message.success('Book removed from wishlist');
      })
      .catch(() => {
        message.error('Failed to remove book from wishlist');
      });
  };

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <div>
        <div id="PageContainer">
          <main className='main-content'>
            <div id="page-wrapper">
              <div className="container">
                <Typography.Title level={5}>Wishlist</Typography.Title>
                <hr className='hr--small' />
                <div className='wishlist-content'>
                  {wishlist?.length === 0 && <Typography.Title level={5}>Your Wishlist is empty</Typography.Title>}
                  <Row gutter={[16, 16]}>
                    {wishlist?.map((item) => (
                      item.book && ( // Ensure item.book exists before rendering
                        <Col xs={24} sm={12} md={6} key={item.id}>
                          <Card
                            hoverable
                            cover={
                              <div
                                style={{ position: 'relative' }}
                                onMouseEnter={() => setHoveredItemId(item.id)} // Set hover state
                                onMouseLeave={() => setHoveredItemId(null)} // Reset hover state
                              >
                                {item.book.images && item.book.images[0] ? (
                                  <img alt={item.book.title} src={item.book.images[0].link} />
                                ) : null}
                                <DeleteOutlined
                                  onClick={() => deleteWishlist(item.book.id)}
                                  style={{
                                    fontSize: '20px',
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    color: hoveredItemId === item.id ? '#ff4d4f' : '#d70f0f', // Change color on hover
                                    cursor: 'pointer',
                                    zIndex: 1,
                                    transition: 'color 0.3s', // Smooth transition
                                  }}
                                />
                              </div>
                            }
                          >
                            <Meta
                              title={<Typography.Text ellipsis>{item.book.title}</Typography.Text>}
                              description={
                                <div className='d-flex justify-content-between'>
                                  <span className='current-price'>{item.book.salePrice?.toLocaleString()}₫</span>
                                </div>
                              }
                            />
                          </Card>
                        </Col>
                      )
                    ))}
                  </Row>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
