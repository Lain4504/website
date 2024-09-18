import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBooksBySearchValue } from '../services/BookService'

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
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {
                                result?.content ? (
                                    result?.content?.map(item => (
                                        <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                                            <div className="relative">
                                                <a href={`/products/${item.id}`}>
                                                    {item.images[0] && <img src={item.images[0].link} alt={item.title} className="w-full h-auto object-cover" />}
                                                </a>
                                                {item.discount && (
                                                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                                        -{item.discount * 100}%
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4 text-center">
                                                <a className="block text-blue-600 hover:underline" href={`/products/${item.id}`}>{item.title}</a>
                                                <div className="mt-2">
                                                    <span className="text-lg font-semibold text-gray-900">{item.salePrice.toLocaleString()}₫</span>
                                                    <span className="ml-2 text-sm text-gray-500 line-through">{item.price.toLocaleString()}₫</span>
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
