import React, { useEffect, useRef, useState } from 'react'
import { getBooksByQuery, getBookByQuery } from "../services/BookService"
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getCollections, getCollectionById } from '../services/CollectionService'
import Pagination from '../utils/Pagination'
import Breadcrumb from '../components/Breadcrumb'

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


    const collection_items = collections.map(collection => (
        collection.isDisplay ? (
            <li key={collection.id}>
                <Link to={`/collections/${collection.id}`} className="hover:underline text-blue-600">{collection.name}</Link>
            </li>
        ) : null
    ));

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
        const minValue = Number(e.target.dataset.min)
        const maxValue = Number(e.target.dataset.max)
        setCurCollection(null);
        if (minValue && maxValue) {
            navigate(`/collections/${id}?min=${minValue}&max=${maxValue}${page ? `&page=${page}` : ''}`)
        }
        else if (minValue) {
            navigate(`/collections/${id}?min=${minValue}${page ? `&page=${page}` : ''}`)
        }
        else if (maxValue) {
            navigate(`/collections/${id}?max=${maxValue}${page ? `&page=${page}` : ''}`)
        }
        else {
            navigate(`/collections/${id}${page ? `?page=${page}` : ''}`)
        }
    }
    const handleChange = (e) => {
        const value = e.target.value
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
    return (
        <>
            <section>
                <div className='mx-auto'>
                    <Breadcrumb items={breadcrumbs} />
                    <div className='flex flex-wrap flex-col md:flex-row'>
                        <div className='w-full lg:w-1/4 px-4 hidden lg:block'>
                            <div>
                                <h2 className="font-semibold text-lg">Danh Mục Sản Phẩm</h2>
                                <ul className='mt-2 space-y-1'>
                                    <li>
                                        <Link to={`/collections/all`} className="hover:underline text-blue-600">TẤT CẢ SẢN PHẨM</Link>
                                    </li>
                                    {collection_items}
                                </ul>
                            </div>

                            <div className="mt-8">
                                <h2 className="font-semibold text-lg">Khoảng Giá</h2>
                                <ul className='mt-2 space-y-2'>
                                    <li>
                                        <label>
                                            <input onClick={handlePrice} type='radio' name='price-filter'></input>
                                            <span>Tất cả</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input onClick={handlePrice} type='radio' data-max='10000' name='price-filter'></input>
                                            <span>Nhỏ hơn 10,000₫</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input onClick={handlePrice} type='radio' data-min='10000' data-max='20000' name='price-filter'></input>
                                            <span> Từ 10,000₫ - 20,000₫</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input onClick={handlePrice} type='radio' data-min='20000' data-max='30000' name='price-filter'></input>
                                            <span>Từ 20,000₫ - 30,000₫</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input onClick={handlePrice} type='radio' data-min='30000' data-max='40000' name='price-filter'></input>
                                            <span> Từ 30,000₫ - 40,000₫</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input onClick={handlePrice} data-min='40000' data-max='50000' type='radio' name='price-filter'></input>
                                            <span>Từ 40,000₫ - 50,000₫</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input onClick={handlePrice} type='radio' data-min='50000' name='price-filter'></input>
                                            <span>Lớn hơn 50,000₫</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='w-full lg:w-3/4 px-4'>
                            <div className='mb-6'>
                                <div className='flex justify-between items-center'>
                                    <h3 className='text-xl font-bold'>{id === 'all' ? "TẤT CẢ SẢN PHẨM" : curCollection ? curCollection.name : ''}</h3>
                                    <div className="text-right">
                                        <label htmlFor="SortBy">Sắp xếp</label>
                                        <select onChange={(e) => handleChange(e)} name="SortBy" id="SortBy" className="ml-2 p-2 border border-gray-300 rounded">
                                            <option value="manual">Tùy chọn</option>
                                            <option value="newest">Mới nhất</option>
                                            <option value="best-selling">Bán chạy nhất</option>
                                            <option value="title-ascending">Tên A-Z</option>
                                            <option value="title-descending">Tên Z-A</option>
                                            <option value="price-ascending">Giá tăng dần</option>
                                            <option value="price-descending">Giá giảm dần</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                                    {books.map(book => (
                                        <div key={book.id}>
                                            <div className="relative">
                                                <Link to={`/products/${book.id}`}>
                                                    <img src={book.images[0].link} alt={book.title} className="w-full h-auto object-cover" />
                                                </Link>
                                                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1">
                                                    -{book.discount * 100}%
                                                </div>
                                            </div>
                                            <div className="mt-2 text-center">
                                                <Link to={`/products/${book.id}`} className="block font-medium text-gray-900 hover:underline">{book.title}</Link>
                                                <div className="text-red-500 mt-1">
                                                    <span> {book.salePrice.toLocaleString()}₫</span>
                                                    <span className="text-gray-500 line-through ml-2">{book.price.toLocaleString()}₫</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
