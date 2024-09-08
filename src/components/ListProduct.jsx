import React, { useState, useEffect } from "react";
import { getBookByQuery } from "../services/BookService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ListProduct = (props) => {
    const [books, setBooks] = useState([]);

    const fetchData = () => {
        getBookByQuery(props.query)
            .then(res => {
                setBooks(res.data.content);
            })
            .catch((error) => console.log("Error fetching book data " + error));
    }
    
    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div id="home-pro-products" className="py-12">
            <div className="mx-auto">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold">{props.title}</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {
                        books.map(book => (
                            <div key={book.id} className="bg-white shadow-lg rounded-lg overflow-hidden relative group">
                                <div className="relative">
                                    <a href={`/products/${book.id}`}>
                                        <img src={book.images[0].link} alt={book.title} className="w-full h-auto object-cover" />
                                    </a>
                                    <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl-lg">
                                        -{book.discount * 100}%
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {book.title}
                                    </div>
                                </div>
                                <div className="p-2">
                                    <div className="text-sm font-semibold mb-2 text-center">
                                        <a className="text-gray-900 hover:text-gray-700 truncate block" href={`/products/${book.id}`}>{book.title}</a>
                                    </div>
                                    <div className="flex items-center justify-center space-x-5">
                                        <span className="text-sm font-bold text-gray-900">{book.salePrice.toLocaleString()}₫</span>
                                        <span className="text-gray-600 line-through">{book.price.toLocaleString()}₫</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="col-span-full text-right mt-4">
                        <a href="collections/all" className="text-blue-500 hover:underline">Xem thêm &gt;&gt;</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProduct;
