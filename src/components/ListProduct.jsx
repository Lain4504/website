import React, { useState, useEffect } from "react";
import { getBookByQuery } from "../services/BookService";
import { Link } from "react-router-dom";
import { Button, Skeleton } from 'antd'; // Import Skeleton từ Ant Design

const ListProduct = (props) => {
    const [books, setBooks] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // State to track loading status
    const [hoveredBookTitle, setHoveredBookTitle] = useState(""); // State to track hovered book title
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // State to track mouse position

    const fetchData = () => {
        getBookByQuery(props.query)
            .then(res => {
                const booksData = Array.isArray(res.data.content) ? res.data.content : [];
                setBooks(booksData);
            })
            .catch((error) => console.log("Error fetching book data " + error))
            .finally(() => {
                setTimeout(() => {
                    setLoading(false); // Set loading to false after 0.5 seconds
                }, 500); // 500 milliseconds delay
            });
    };

    useEffect(() => {
        fetchData();
    }, [props.query]);

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <div className="py-12">
            <div className="mx-auto">
                {loading ? ( // Show Skeleton while loading
                    <Skeleton active paragraph={{ rows: 4 }} />
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                        {
                            books.length > 0 ? (
                                books.map(book => (
                                    <div
                                        key={book.id}
                                        className="product-card bg-white shadow-lg rounded-lg overflow-hidden relative group animate-move-from-center"
                                        onMouseEnter={() => setHoveredBookTitle(book.title)} // Set title on mouse enter
                                        onMouseLeave={() => setHoveredBookTitle("")} // Clear title on mouse leave
                                        onMouseMove={handleMouseMove} // Update mouse position
                                    >
                                        <div className="relative">
                                            <Link to={`/products/${book.id}`}>
                                                <img src={book.images[0]?.link} alt={book.title} className="w-full h-auto object-cover product-image" />
                                            </Link>
                                            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl-lg">
                                                -{book.discount * 100}%
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <div className="text-sm font-semibold mb-2 text-center">
                                                <Link to={`/products/${book.id}`} className="text-gray-900 hover:text-gray-700 truncate block">{book.title}</Link>
                                            </div>
                                            <div className="flex items-center justify-center space-x-5">
                                                <span className="text-sm font-bold text-red-500">{book.salePrice.toLocaleString()}₫</span>
                                                <span className="text-gray-600 line-through ml-2">{book.price.toLocaleString()}₫</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">Không có sản phẩm nào phù hợp.</p>
                            )
                        }
                        <div className="col-span-full text-right mt-4">
                            <Button href={`collections/all`} className="text-blue-500 hover:underline">
                                Xem thêm &gt;&gt;
                            </Button>
                        </div>
                    </div>
                )}
                {hoveredBookTitle && (
                    <div
                        className="fixed bg-gray-800 text-xs text-white p-2 rounded-md"
                        style={{
                            left: mousePosition.x + 10, // Adjust position to the right of the cursor
                            top: mousePosition.y + 10 // Adjust position below the cursor
                        }}
                    >
                        {hoveredBookTitle} {/* Display hovered book title */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListProduct;
