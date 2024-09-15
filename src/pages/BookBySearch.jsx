// BooksBySearch.js
import React, { useEffect, useState } from 'react';
import { getBooksBySearchValue } from '../services/BookService';
import Pagination from '../utils/Pagination';

const BooksBySearch = ({ searchQuery }) => {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 12;
    const totalPage = Math.ceil(books.length / limit);

    const fetchBooks = (query, page) => {
        getBooksBySearchValue(query)
            .then(res => {
                setBooks(res.data.content); // Adjust based on your API response structure
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        if (searchQuery) {
            fetchBooks(searchQuery, page);
        }
    }, [searchQuery, page]);

    const setCurrentPage = (value) => {
        if (value === '&laquo;') {
            setPage(1);
        } else if (value === '&lsaquo;') {
            if (page > 1) {
                setPage(page - 1);
            }
        } else if (value === '&rsaquo;') {
            if (page < totalPage) {
                setPage(page + 1);
            }
        } else if (value === '&raquo;') {
            setPage(totalPage);
        } else if (value !== '...') {
            setPage(value);
        }
    }

    return (
        <section>
            <div className='mx-auto'>
                <div>
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                        {books.map(book => (
                            <div key={book.id}>
                                <div className="relative">
                                    <a href={`/products/${book.id}`}>
                                        <img src={book.images[0].link} alt={book.title} className="w-full h-auto object-cover" />
                                    </a>
                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1">
                                        -{book.discount * 100}%
                                    </div>
                                </div>
                                <div className="mt-2 text-center">
                                    <a href={`/products/${book.id}`} className="block font-medium text-gray-900 hover:underline">{book.title}</a>
                                    <div className="text-red-500 mt-1">
                                        <span>{book.salePrice.toLocaleString()}₫</span>
                                        <span className="text-gray-500 line-through ml-2">{book.price.toLocaleString()}₫</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Pagination page={page} totalPage={totalPage} setCurrentPage={setCurrentPage} />
            </div>
        </section>
    );
}

export default BooksBySearch;
