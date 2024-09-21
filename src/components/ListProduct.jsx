import React, { useState, useEffect } from "react";
import { getBookByQuery } from "../services/BookService";
import { Link } from "react-router-dom";

const ListProduct = (props) => {
    const [books, setBooks] = useState([]); // Initialize as an empty array

    const fetchData = () => {
        getBookByQuery(props.query)
            .then(res => {
                // Ensure `content` is an array
                const booksData = Array.isArray(res.data.content) ? res.data.content : [];
                setBooks(booksData);
            })
            .catch((error) => console.log("Error fetching book data " + error));
    }

    useEffect(() => {
        fetchData();
    }, [props.query]);

    return (
        <div className="py-12">
            <div className="mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {
                        books.length > 0 ? (
                            books.map(book => (
                                <div key={book.id} className="bg-white shadow-lg rounded-lg overflow-hidden relative group animate-move-from-center">
                                    <div className="relative">
                                        <Link to={`/products/${book.id}`}>
                                            <img src={book.images[0]?.link} alt={book.title} className="w-full h-auto object-cover" />
                                        </Link>
                                        <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl-lg">
                                            -{book.discount * 100}%
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {book.title}
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
                        <a href={`collections/all`} className="text-blue-500 hover:underline">
                            Xem thêm &gt;&gt;
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProduct;
