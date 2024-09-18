import React from 'react'

const SearchResult = ({ result }) => {
    return (
        <div id='search-smart' className='bg-white p-4 rounded-lg shadow-md'>
            <div id='product'>
                {
                    result?.content ? (
                        result?.content?.map(item => (
                            <div className='flex items-center mb-4' key={item.id}>
                                <div className='w-24 h-24'>
                                    <a href={`products/${item.id}`}>
                                        <img src={item?.images[0]?.link} alt="image" className="w-full h-full object-cover rounded-lg"/>
                                    </a>
                                </div>
                                <div className="ml-4">
                                    <span className="text-sm font-semibold">
                                        <a className='text-blue-600 hover:underline' href={`products/${item.id}`}>
                                            {item.title}
                                        </a>
                                    </span>
                                    <div className='mt-1'>
                                        <span className="text-lg font-medium text-gray-900">
                                            {item?.salePrice?.toLocaleString()}₫
                                        </span>
                                        <span className="ml-2 text-sm text-gray-500 line-through">
                                            {item?.price.toLocaleString()}₫
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No results found</p>
                    )
                }
            </div>
        </div>
    )
}

export default SearchResult
