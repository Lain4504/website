import React from 'react';
import { Card } from 'antd'; // Import Card from Ant Design

const ListPost = () => {
    const mockPosts = [
        {
            id: 1,
            title: 'Trần Gian Ở Lại và những luyến lưu về tình yêu nơi trần thế',
            date: '04/09/2024',
            category: 'TIN TỨC',
            image: 'https://file.hstatic.net/200000287623/article/456100341_938822808290964_7394982604345935159_n_08428383a253403880be311bff4d1ab9.jpg',
            link: '/blogs/tintuc/tran-gian-o-lai-va-nhung-luyen-luu-ve-tinh-yeu-noi-tran-the',
            content: 'Là một tập truyện ngắn được viết rải rác trong nhiều năm...'
        },
        {
            id: 2,
            title: '[REVIEW ĐỘC GIẢ] CUỘN TRANH KỲ BÍ - BOYS LOVE DỄ THƯƠNG MANG MÀU SẮC HUYỀN ẢO',
            date: '05/09/2024',
            category: 'TIN TỨC',
            image: 'https://file.hstatic.net/200000287623/file/1_79e6df722efe40e5a58ab2f225cff766_grande.png',
            link: '/blogs/tintuc/mot-bai-viet-khac',
            content: 'Để tránh cái nóng mùa này, có hai lựa chọn tương đối hay ho...'
        },
        {
            id: 3,
            title: 'Điểm danh những cuốn truyện tranh có dung lượng KHỦNG trên 400 trang!',
            date: '05/09/2024',
            category: 'TIN TỨC',
            image: 'https://file.hstatic.net/200000287623/file/3_1bf7a831bece4bac973064a97f87856a_1024x1024.png',
            link: '/blogs/tintuc/mot-bai-viet-khac',
            content: 'Thông thường, một cuốn truyện tranh sẽ rơi vào khoảng trên dưới 200 trang...'
        }
    ];

    return (
        <div className="flex flex-wrap justify-center mt-7">
            {mockPosts.map(post => (
                <div key={post.id} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                    <Card
                        hoverable
                        className="bg-white border rounded shadow"
                        cover={
                            <div className="relative">
                                <img className="w-full h-auto rounded-t" src={post.image} alt={post.title} />
                                <div className="absolute top-2 left-2 bg-white bg-opacity-75 p-1 rounded">
                                    <p className="text-sm text-gray-500">{post.date}</p>
                                </div>
                            </div>
                        }
                    >
                        <div className="p-4">
                            <p className=" text-lg font-semibold">
                                <a href={post.link} className="hover:text-blue-600">{post.title}</a>
                            </p>
                            <div className="text-gray-700">{post.content}</div>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default ListPost;
