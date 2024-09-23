import React, { useEffect, useRef, useState } from 'react'
import { getBooksByQuery, getBookByQuery } from "../services/BookService"
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getCollections, getCollectionById } from '../services/CollectionService'
import Pagination from '../utils/Pagination'
import Breadcrumb from '../components/Breadcrumb'
import { Menu, Radio, Select } from 'antd'

const BooksByCollection = () => {
    const navigate = useNavigate()
    const [books, setBooks] = useState([])
    const [collections, setCollections] = useState([])
    const book_length = useRef(0)
    const [curCollection, setCurCollection] = useState()
    const { id } = useParams()
    const urlParams = new URLSearchParams(window.location.search);
    const [page, setPage] = useState(urlParams.get('page'));
    const [limit,] = useState(12);
    const totalPage = Math.ceil(book_length.current / limit);
    const [hoveredBookTitle, setHoveredBookTitle] = useState("");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // State to track mouse position

    const fetchData = (id) => {
        if (id === 'all') {
            setCurCollection(null); // Đặt lại tiêu đề khi id là 'all'
        } else {
            getCollectionById(id)
                .then(res => setCurCollection(res.data))
                .catch(error => console.error(error));
        }

        getBooksByQuery(id, page, urlParams.get('min'), urlParams.get('max'))
            .then(res => {
                setBooks(res.data.content);
                book_length.current = res.data.totalElements;
            })
            .catch(error => console.error(error));

        getCollections()
            .then(res => setCollections(res.data))
            .catch(error => console.error(error));
    };

    const setCurrentPage = (value) => {
        window.scrollTo(0, 0);
        if (value === '&laquo;') {
            setPage(1)
            return
        }
        else if (value === '&lsaquo;') {
            if (page !== 1) {
                setPage(page - 1)
            }
            return
        }
        else if (value === '&rsaquo;') {
            if (page !== totalPage)
                setPage(page + 1)
            return
        }
        else if (value === '&raquo;') {
            setPage(totalPage)
            return
        }
        else if (value === '...') {
            return
        }
        setPage(value)
        if (id === 'all')
            navigate(`/collections/all?page=${page}`)
        else
            navigate(`/collections/${id}?page=${page}`)
    }

    const handlePrice = (e) => {
        const value = e.target.value;
        setCurCollection(null);
        let minValue = null;
        let maxValue = null;

        switch (value) {
            case 'all':
                break;
            case 'under-10000':
                maxValue = 10000;
                break;
            case '10-20':
                minValue = 10000;
                maxValue = 20000;
                break;
            case '20-30':
                minValue = 20000;
                maxValue = 30000;
                break;
            case '30-40':
                minValue = 30000;
                maxValue = 40000;
                break;
            case '40-50':
                minValue = 40000;
                maxValue = 50000;
                break;
            case 'over-50000':
                minValue = 50000;
                break;
            default:
                break;
        }

        if (minValue !== null && maxValue !== null) {
            navigate(`/collections/${id}?min=${minValue}&max=${maxValue}${page ? `&page=${page}` : ''}`);
        } else if (minValue !== null) {
            navigate(`/collections/${id}?min=${minValue}${page ? `&page=${page}` : ''}`);
        } else if (maxValue !== null) {
            navigate(`/collections/${id}?max=${maxValue}${page ? `&page=${page}` : ''}`);
        } else {
            navigate(`/collections/${id}${page ? `?page=${page}` : ''}`);
        }
    }
    const handleChange = (value) => {
        setCurCollection(null);
        switch (value) {
            case 'manual':
                break;
            case 'newest':
                getBookByQuery('sorted-and-paged/by-collection?sortBy=Id&size=12&sortOrder=desc')
                    .then(res => setBooks(res.data.content))
                break;
            case 'best-selling':
                getBookByQuery('sorted-and-paged/by-collection?sortBy=Sold&size=12')
                    .then(res => setBooks(res.data.content))
                break;
            case 'title-ascending':
                getBookByQuery('sorted-and-paged/by-collection?sortBy=Title&size=12')
                    .then(res => setBooks(res.data.content))
                break;
            case 'title-descending':
                getBookByQuery('sorted-and-paged/by-collection?sortBy=Title&size=12&sortOrder=desc')
                    .then(res => setBooks(res.data.content))
                break;
            case 'price-ascending':
                getBookByQuery('sorted-and-paged/by-collection?sortBy=Price&size=12')
                    .then(res => setBooks(res.data.content))
                break;
            case 'price-descending':
                getBookByQuery('sorted-and-paged/by-collection?sortBy=Price&size=12&sortOrder=desc')
                    .then(res => setBooks(res.data.content))
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        fetchData(id)
    }, [id, page, window.location.search])

    useEffect(() => {
        setPage(1)
    }, [id])
    const breadcrumbs = [
        { title: 'Home', href: '/' },
        { title: curCollection ? curCollection.name : 'All' }
    ];
    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
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
                                    <Link to={`/collections/all`} className="hover:underline text-blue-600">TẤT CẢ SẢN PHẨM</Link>
                                </Menu.Item>
                                {collections.map(collection => (
                                    collection.isDisplay ? (
                                        <Menu.Item key={collection.id}>
                                            <Link to={`/collections/${collection.id}`} className="hover:underline text-blue-600">{collection.name}</Link>
                                        </Menu.Item>
                                    ) : null
                                ))}
                            </Menu>

                            <div className="mt-8">
                                <h2 className="font-semibold text-lg">Khoảng Giá</h2>
                                <Radio.Group onChange={handlePrice} defaultValue="all" className='mt-2 space-y-2'>
                                    <Radio value="all" className="block">Tất cả</Radio>
                                    <Radio value="under-10000" className="block">Nhỏ hơn 10,000₫</Radio>
                                    <Radio value="10-20" className="block">Từ 10,000₫ - 20,000₫</Radio>
                                    <Radio value="20-30" className="block">Từ 20,000₫ - 30,000₫</Radio>
                                    <Radio value="30-40" className="block">Từ 30,000₫ - 40,000₫</Radio>
                                    <Radio value="40-50" className="block">Từ 40,000₫ - 50,000₫</Radio>
                                    <Radio value="over-50000" className="block">Lớn hơn 50,000₫</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className='w-full lg:w-3/4 px-4'>
                            <div className='mb-6'>
                                <div className='flex justify-between items-center'>
                                    <h3 className='text-xl font-bold'>{id === 'all' ? "TẤT CẢ SẢN PHẨM" : curCollection ? curCollection.name : ''}</h3>
                                    <div className="text-right">
                                        <label htmlFor="SortBy">Sắp xếp</label>
                                        <Select
                                            defaultValue="manual"
                                            onChange={handleChange}
                                            style={{ width: '120px', textAlign: "center" }}
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
                                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:grid-cols-3'>
                                    {books.map(book => (
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
                                    ))}
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
                        </div>
                    </div>

                    <Pagination page={page} totalPage={totalPage} setCurrentPage={setCurrentPage} />
                </div>
            </section>
        </>
    )
}

export default BooksByCollection;
