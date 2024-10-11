import React, { useEffect, useRef, useState } from 'react';
import { getBooksByQuery, getBookByQuery } from "../services/BookService";
import { useParams, Link } from 'react-router-dom';
import { getCollections, getCollectionById } from '../services/CollectionService';
import Breadcrumb from '../components/Breadcrumb';
import { Menu, Select, Pagination } from 'antd';

const BooksByCollection = () => {
    const [books, setBooks] = useState([]);
    const [collections, setCollections] = useState([]);
    const book_length = useRef(0);
    const [curCollection, setCurCollection] = useState();
    const { id } = useParams();
    const [hoveredBookTitle, setHoveredBookTitle] = useState("");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(12);
    const [sortBy, setSortBy] = useState('manual');

    const fetchData = (id) => {
        if (id === 'all') {
            setCurCollection(null);
        } else {
            getCollectionById(id)
                .then(res => setCurCollection(res.data))
                .catch(error => console.error(error));
        }

        getBooksByQuery(id)
            .then(res => {
                setBooks(res.data.content);
                book_length.current = res.data.totalElements;
            })
            .catch(error => console.error(error));

        getCollections()
            .then(res => setCollections(res.data))
            .catch(error => console.error(error));
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const handleChange = (value) => {
        setSortBy(value);
        let collectionQuery = curCollection ? `collection=${curCollection.id}` : '';
        let query = '';
        setCurrentPage(1); // Reset to first page on sort change
        switch (value) {
            case 'manual':
                break;
            case 'newest':
                query = `sorted-and-paged/by-collection?${collectionQuery}&sortBy=Id&sortOrder=desc`;
                break;
            case 'best-selling':
                query = `sorted-and-paged/by-collection?${collectionQuery}&sortBy=Sold`;
                break;
            case 'title-ascending':
                query = `sorted-and-paged/by-collection?${collectionQuery}&sortBy=Title`;
                break;
            case 'title-descending':
                query = `sorted-and-paged/by-collection?${collectionQuery}&sortBy=Title&sortOrder=desc`;
                break;
            case 'price-ascending':
                query = `sorted-and-paged/by-collection?${collectionQuery}&sortBy=Price`;
                break;
            case 'price-descending':
                query = `sorted-and-paged/by-collection?${collectionQuery}&sortBy=Price&sortOrder=desc`;
                break;
            default:
                break;
        }

        if (query) {
            getBookByQuery(query)
                .then(res => setBooks(res.data.content));
        }
    };

    useEffect(() => {
        setSortBy('manual');
        fetchData(id);
    }, [id]);

    const breadcrumbs = [
        { title: 'Trang chủ', href: '/' },
        { title: curCollection ? curCollection.name : 'All' }
    ];

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <section>
                <div className='mx-auto'>
                    <Breadcrumb items={breadcrumbs} />
                    <div className='flex flex-wrap flex-col md:flex-row'>
                        <div className='w-full lg:w-1/4 px-4 hidden lg:block'>
                            <h2 className="font-semibold text-lg">Danh Mục Sản Phẩm</h2>
                            <Menu>
                                <Menu.Item key="all">
                                    <Link to="/collections/all" className="hover:underline text-blue-600">TẤT CẢ SẢN PHẨM</Link>
                                </Menu.Item>
                                {collections.map(collection => (
                                    collection.isDisplay ? (
                                        <Menu.Item key={collection.id}>
                                            <Link to={`/collections/${collection.id}`} className="hover:underline text-blue-600">{collection.name}</Link>
                                        </Menu.Item>
                                    ) : null
                                ))}
                            </Menu>
                        </div>
                        <div className='w-full lg:w-3/4 px-4'>
                            <div className='mb-6'>
                                <div className='flex justify-between items-center'>
                                    <h3 className='text-xl font-bold'>{id === 'all' ? "TẤT CẢ SẢN PHẨM" : curCollection ? curCollection.name : ''}</h3>
                                    <div className="text-right">
                                        <label htmlFor="SortBy">Sắp xếp</label>
                                        <Select
                                            value={sortBy}
                                            onChange={handleChange}
                                            style={{ width: '140px', textAlign: "center" }}
                                            className="ml-2 "
                                        >
                                            <Select.Option value="manual">Tùy chọn</Select.Option>
                                            <Select.Option value="newest">Mới nhất</Select.Option>
                                            <Select.Option value="best-selling">Bán chạy nhất</Select.Option>
                                            <Select.Option value="title-ascending">Tên A-Z</Select.Option>
                                            <Select.Option value="title-descending">Tên Z-A</Select.Option>
                                            <Select.Option value="price-ascending">Giá tăng dần</Select.Option>
                                            <Select.Option value="price-descending">Giá giảm dần</Select.Option>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:grid-cols-3'>
                                    {currentBooks.map(book => (
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
                                    ))}
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
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    <Pagination
                                        current={currentPage}
                                        pageSize={booksPerPage}
                                        total={book_length.current}
                                        onChange={handlePageChange}
                                        showSizeChanger={false}
                                        showQuickJumper
                                        className="mt-4"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='mt-5'></div>
        </>
    );
};

export default BooksByCollection;
