import React, { useState, useEffect } from 'react';
import { deleteWishList, getWishlistByUserId } from '../services/WishlistService';
import { getBookById } from '../services/BookService';
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';  
import { message } from 'antd';

const Wishlist = ({ cookies }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);
  const [hoveredBookTitle, setHoveredBookTitle] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const fetchBookDetails = async (bookId) => {
    try {
      const res = await getBookById(bookId);
      return res?.data;
    } catch (error) {
      console.error('Failed to fetch book details', error);
      return null;
    }
  };

  const fetchWishlist = async (userId) => {
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
      console.error('Failed to fetch wishlist', error);
    }
  };

  useEffect(() => {
    const token = cookies.authToken;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded[Object.keys(decoded).find(key => key.includes("nameidentifier"))];
        setUserId(userId);
        fetchWishlist(userId);
      } catch (error) {
        console.error('Invalid token', error);
      }
    } else {
      console.error('No token found');
    }
  }, [cookies.authToken]);

  const deleteWishlist = async (wishlistId) => {
    if (!userId) return;
    try {
      await deleteWishList(wishlistId);
      const newWishlist = wishlist.filter(item => item.id !== wishlistId);
      setWishlist(newWishlist);
  
      // Kiểm tra nếu sản phẩm đang hover bị xóa thì reset hoveredBookTitle
      const deletedItem = wishlist.find(item => item.id === wishlistId);
      if (deletedItem && deletedItem.book.title === hoveredBookTitle) {
        setHoveredBookTitle('');
      }
  
      message.success('Book removed from wishlist');
    } catch (error) {
      message.error('Failed to remove book from wishlist');
      console.error('Delete error', error);
    }
  };
  
  

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const breadcrumbs = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Wishlist' }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <h2 className="text-lg font-semibold text-start mt-4">Sách yêu thích của bạn</h2> 
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div
              key={item.id}
              className="product-card bg-white shadow-lg rounded-lg overflow-hidden relative group animate-move-from-center"
              onMouseEnter={() => setHoveredBookTitle(item.book.title)}
              onMouseLeave={() => setHoveredBookTitle('')}
            >
              <div className="relative">
                <Link to={`/products/${item.book.id}`}>
                  <img
                    src={item.book.images[0]?.link}
                    alt={item.book.title}
                    className="w-full h-auto object-cover product-image"
                  />
                </Link>
                <button
                  onClick={() => deleteWishlist(item.id)}
                  className="text-red-600 mt-2 flex items-center justify-center absolute top-0 left-1 border border-red-600 p-1 hover:bg-red-100"
                >
                  <DeleteOutlined className="mr-0" />
                </button>

                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl-lg">
                  -{item.book.discount * 100}%
                </div>
              </div>
              <div className="p-2">
                <div className="text-sm font-semibold mb-2 text-center">
                  <Link
                    to={`/products/${item.book.id}`}
                    className="text-gray-900 hover:text-gray-700 truncate block"
                  >
                    {item.book.title}
                  </Link>
                </div>
                <div className="flex items-center justify-center space-x-5">
                  <span className="text-sm font-bold text-red-500">
                    {item.book.salePrice.toLocaleString()}₫
                  </span>
                  <span className="text-gray-600 line-through ml-2">
                    {item.book.price.toLocaleString()}₫
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No items in wishlist.</p>
        )}
      </div>
      {hoveredBookTitle && (
        <div
          className="fixed bg-gray-800 text-xs text-white p-2 rounded-md"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y + 10
          }}
        >
          {hoveredBookTitle}
        </div>
      )}
    </>
  );
};

export default Wishlist;
