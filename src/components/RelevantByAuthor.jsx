import React, { useEffect, useState, useRef } from 'react';
import { getBookByAuthorId } from '../services/BookService';
import Title from './Title';
import { Link } from 'react-router-dom';
import { Button, Divider } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const RelevantByAuthors = ({ authors }) => { 
  const [books, setBooks] = useState([]);
  const [hoveredBookTitle, setHoveredBookTitle] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const scrollRef = useRef(null);

  const fetchData = async () => {
    try {
        const booksArray = await Promise.all(
            authors.map(author => {
                const authorId = author.authorId; 
                return getBookByAuthorId(authorId);
            })
        );
        const allBooks = booksArray.flatMap(res => Array.isArray(res.data) ? res.data : []);
        const uniqueBooks = allBooks.reduce((acc, current) => {
            const x = acc.find(item => item.id === current.id);
            return !x ? acc.concat([current]) : acc;
        }, []);

        setBooks(uniqueBooks.slice(0, 10)); // Giới hạn tối đa 10 sản phẩm
    } catch (error) {
        console.log("Error fetching book data " + error);
    }
  };

  useEffect(() => {
    if (authors.length > 0) {
      fetchData(); 
    }
  }, [authors]);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <> 
      <Divider/>
      <h2 className="text-center mb-6 text-xl"> 
        <Title text1={'Sách cùng'} text2={'tác giả'}/>
      </h2>
      <div className="py-12 relative">
        <div className="flex items-center">
          <Button
            onClick={scrollLeft}
            className="mr-2"
            icon={<LeftOutlined />}
          />
          <div className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide" ref={scrollRef}>
            {
              books.length > 0 ? (
                books.map(book => (
                    <div
                    key={book.id}
                    className="flex-shrink-0 bg-white shadow-lg rounded-lg overflow-hidden relative group
                               w-52 h-88" // Set fixed width and height for the card
                    onMouseEnter={() => setHoveredBookTitle(book.title)}
                    onMouseLeave={() => setHoveredBookTitle("")}
                    onMouseMove={handleMouseMove}
                  >
                    <div className="relative h-72 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      <Link to={`/products/${book.id}`} className="w-full h-full">
                        <img
                          src={book.images[0]?.link}
                          alt={book.title}
                          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                          style={{ objectFit: 'cover' }} // Ensures image covers the container
                        />
                      </Link>
                      {book.discount > 0 && (
                        <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl-lg">
                          -{book.discount * 100}%
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <div className="text-sm font-semibold mb-2 text-center">
                        <Link to={`/products/${book.id}`} className="text-gray-900 hover:text-gray-700 truncate block">
                          {book.title}
                        </Link>
                      </div>
                      <div className="flex items-center justify-center space-x-5">
                        <span className="text-sm font-bold text-red-500">{book.salePrice.toLocaleString()}₫</span>
                        {book.discount > 0 && (
                          <span className="text-gray-600 line-through ml-2">{book.price.toLocaleString()}₫</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                ))
              ) : (
                <p className="text-center">Không có sản phẩm nào phù hợp.</p>
              )
            }
          </div>
          <Button
            onClick={scrollRight}
            className="ml-2"
            icon={<RightOutlined />}
          />
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
      </div>
    </>
  );
};

export default RelevantByAuthors;
