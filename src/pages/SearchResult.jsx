import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBooksBySearchValue } from '../services/BookService'
import { Link } from "react-router-dom";
const Search = () => {
    const { name } = useParams()
    const [result, setResult] = useState({})

    useEffect(() => {
        getBooksBySearchValue(name).then(res => {
            setResult(res.data)
        })
    }, [name])

    console.log(result)

    return (
        <div className="bg-white min-h-screen">
            <div>
                <main className="py-8">
                    <section>
                        <div className="mb-6 text-left">
                            <h3 className="text-xl font-semibold mb-3">TÌM KIẾM</h3>
                            <h3 className="text-xl font-light">Kết quả tìm kiếm: {name}</h3>
                        </div>
                        <div className="mb-4">
                            <h5 className="text-lg font-medium">Sản phẩm phù hợp:</h5>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                            {
                                result?.content ? (
                                    result?.content?.map(item => (
                                        <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden relative group animate-move-from-center">
                                            <div className="relative">
                                                <Link to={`/products/${item.id}`}>
                                                    {item.images[0] && <img src={item.images[0].link} alt={item.title} className="w-full h-auto object-cover" />}
                                                </Link>
                                                {item.discount && (
                                                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                                                        -{item.discount * 100}%
                                                    </div>
                                                )}
                                                <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                       {item.title}
                                                </div>
                                            </div>
                                            <div className="p-2">
                                            <div className="text-sm font-semibold mb-2 text-center">
                                            <Link to={`/products/${item.id}`} className="text-gray-900 hover:text-gray-700 truncate block">{item.title}</Link>
                                            </div>
                                                <div className="flex items-center justify-center space-x-5">
                                                    <span className="text-sm font-bold text-red-500">{item.salePrice.toLocaleString()}₫</span>
                                                    <span className="text-gray-600 line-through ml-2">{item.price.toLocaleString()}₫</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">Không có sản phẩm nào phù hợp</p>
                                )
                            }
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Search
