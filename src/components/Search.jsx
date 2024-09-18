import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBooksBySearchValue } from '../services/BookService'
import { Container, Row, Col } from 'react-bootstrap'

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
        <div className="bg-gray-100 min-h-screen">
            <div id="PageContainer">
                <main className="py-8">
                    <section id="orther-section-wrapper">
                        <Container>
                            <div id="search-wrapper" className="mb-6">
                                <h3 className="text-center text-xl font-semibold">Kết quả tìm kiếm: {name}</h3>
                            </div>
                            <div className="mb-4">
                                <h5 className="text-lg font-medium">Sản phẩm phù hợp</h5>
                            </div>
                            <Row>
                                {
                                    result?.content ? (
                                        result?.content?.map(item => (
                                            <Col key={item.id} lg={3} className="mb-4">
                                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                                                    <div className="relative">
                                                        <a href={`/products/${item.id}`}>
                                                            {item.images[0] && <img src={item.images[0].link} alt={item.title} className="w-full h-48 object-cover" />}
                                                        </a>
                                                        {item.discount && (
                                                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                                                -{item.discount * 100}%
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="text-sm font-medium">
                                                            <a className="text-blue-600 hover:underline" href={`/products/${item.id}`}>{item.title}</a>
                                                        </div>
                                                        <div className="mt-2">
                                                            <span className="text-lg font-semibold text-gray-900">{item.salePrice.toLocaleString()}₫</span>
                                                            <span className="ml-2 text-sm text-gray-500 line-through">{item.price.toLocaleString()}₫</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500">Không có sản phẩm nào phù hợp</p>
                                    )
                                }
                            </Row>
                        </Container>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Search
