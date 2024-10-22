import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBooksBySearchValue } from '../../services/BookService'
import { Link } from "react-router-dom";
import { Pagination } from 'antd'; // Thêm import Pagination từ Ant Design
import Breadcrumb from '../../components/shared/Breadcrumb';

const SearchResult = () => {
    const { name } = useParams()
    const [result, setResult] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(12); // Số sách trên mỗi trang

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getBooksBySearchValue(name);
                setResult(res.data.content || []);
                console.log("Search result:", res.data.content); // Đảm bảo nội dung đúng
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [name]);



    // Tính toán vị trí của sách trong trang hiện tại
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = result.slice(indexOfFirstBook, indexOfLastBook);

    // Xử lý sự kiện khi thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const [hoveredBookTitle, setHoveredBookTitle] = useState("");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const breadcrumbs = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Tìm kiếm' }
    ];
    return (
        <>
            <Breadcrumb items={breadcrumbs} />
            <div className="bg-white min-h-screen">
                <div>
                    <main className="py-8">
                        <section>
                            <div className="mb-6 text-left">
                                <h3 className="text-xl font-semibold mb-3">TÌM KIẾM</h3>
                                <h3 className="text-sm font-light">Kết quả tìm kiếm cho "{name}"</h3>
                            </div>
                            <div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {
                                        currentBooks.length > 0 ? (
                                            currentBooks.map(book => (
                                                <div
                                                    key={book.id}
                                                    className="product-card bg-white shadow-lg rounded-lg overflow-hidden relative group animate-move-from-center transition-transform duration-300 ease-in-out"
                                                    onMouseEnter={() => setHoveredBookTitle(book.title)}
                                                    onMouseLeave={() => setHoveredBookTitle("")}
                                                    onMouseMove={handleMouseMove}
                                                >
                                                    <div className="relative h-48 xs:h-80 sm:h-96 md:h-96 lg:h-80 xl:h-80 transition-all duration-300 ease-in-out"> {/* Chiều cao dynamic và có hiệu ứng */}
                                                        <Link to={`/products/${book.id}`}>
                                                            <img
                                                                src={book.images[0]?.link}
                                                                alt={book.title}
                                                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105" /* Zoom in hiệu ứng khi hover */
                                                            />
                                                        </Link>
                                                        <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl-lg">
                                                            -{book.discount * 100}%
                                                        </div>
                                                    </div>
                                                    <div className="p-2 transition-opacity duration-300 ease-in-out">
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
                                            <p className="text-center text-gray-500">Không có sản phẩm nào phù hợp</p>
                                        )
                                    }
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
                            </div>
                        </section>
                    </main>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {/* Pagination */}
                <Pagination
                    current={currentPage}
                    pageSize={booksPerPage}
                    total={result.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showQuickJumper
                    className="mt-4"
                />
            </div>
            <div className='mt-5'></div>
        </>
    )
}

export default SearchResult;
