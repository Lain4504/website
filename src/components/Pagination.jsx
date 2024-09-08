import React from 'react'
import { paginationRange } from '../utils/appUtils';

const Pagination = (props) => {
    let array = paginationRange(props.totalPage, props.page, props.limit, props.siblings);

    return (
        <div>
            <ul id='pagination' className='flex justify-center space-x-2'>
                <li onClick={() => { props.setCurrentPage('&laquo;') }} className="cursor-pointer page-item">
                    <span className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">&laquo;</span>
                </li>
                <li onClick={() => { props.setCurrentPage('&lsaquo;') }} className="cursor-pointer page-item">
                    <span className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">&lsaquo;</span>
                </li>
                {
                    array.map((value, i) =>
                        <li key={i} onClick={() => props.setCurrentPage(value)}
                            className={value === props.page
                                ? "cursor-pointer px-3 py-1 rounded bg-blue-500 text-white"
                                : "cursor-pointer px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"}>
                            <span>{value}</span>
                        </li>
                    )
                }
                <li onClick={() => { props.setCurrentPage('&rsaquo;') }} className="cursor-pointer page-item">
                    <span className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">&rsaquo;</span>
                </li>
                <li onClick={() => { props.setCurrentPage('&raquo;') }} className="cursor-pointer page-item">
                    <span className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">&raquo;</span>
                </li>
            </ul>
        </div>
    )
}

export default Pagination;
