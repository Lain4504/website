import React from 'react'

const Pagination = ({ page, totalPage, setCurrentPage }) => {
    const createPageNumbers = () => {
        const pages = [];
        let startPage = Math.max(1, page - 2); // Hiển thị tối đa 2 trang trước trang hiện tại
        let endPage = Math.min(totalPage, page + 2); // Hiển thị tối đa 2 trang sau trang hiện tại

        if (endPage - startPage < 4) {
            if (startPage === 1) {
                endPage = Math.min(5, totalPage); // Đảm bảo có tối đa 5 trang hiển thị nếu đầu tiên
            } else if (endPage === totalPage) {
                startPage = Math.max(1, totalPage - 4); // Đảm bảo hiển thị tối đa 5 trang nếu cuối
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-3 py-1 border ${page === i ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="pagination flex justify-center items-center my-10 space-x-2">
            {/* Nút First */}
            <button
                onClick={() => setCurrentPage(1)}
                disabled={page === 1}
                className="px-3 py-1 border bg-white text-black"
            >
                First
            </button>

            {/* Nút Previous */}
            <button
                onClick={() => setCurrentPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 border bg-white text-black"
            >
                &lsaquo;
            </button>

            {/* Hiển thị số trang */}
            {createPageNumbers()}

            {/* Nút Next */}
            <button
                onClick={() => setCurrentPage(page + 1)}
                disabled={page === totalPage}
                className="px-3 py-1 border bg-white text-black"
            >
                &rsaquo;
            </button>

            {/* Nút Last */}
            <button
                onClick={() => setCurrentPage(totalPage)}
                disabled={page === totalPage}
                className="px-3 py-1 border bg-white text-black"
            >
                Last
            </button>
        </div>
    );
};


export default Pagination;
