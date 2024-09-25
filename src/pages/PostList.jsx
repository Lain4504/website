import React, { useState, useEffect } from 'react';
import { Row, Col, Dropdown, Menu } from 'antd'; // Import necessary Ant Design components
import Breadcrumb from '../components/Breadcrumb';
import { ArrowLeftOutlined, ArrowRightOutlined, DownOutlined } from '@ant-design/icons';

const PostList = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Check if mobile
    const [isMedium, setIsMedium] = useState(window.innerWidth >= 768 && window.innerWidth < 992); // Check if md screen
    const [posts, setPosts] = useState([]); // State to hold posts
    const [categories, setCategories] = useState([]); // State to hold categories
    const breadcrumbs = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Tin tức' }
    ];

    useEffect(() => {
        // Mock data for posts
        const mockPosts = [
            {
                id: 1,
                title: 'Trần Gian Ở Lại và những luyến lưu về tình yêu nơi trần thế',
                date: '04/09/2024',
                category: 'TIN TỨC',
                image: 'https://file.hstatic.net/200000287623/article/456100341_938822808290964_7394982604345935159_n_08428383a253403880be311bff4d1ab9.jpg',
                link: '/blogs/tintuc/tran-gian-o-lai-va-nhung-luyen-luu-ve-tinh-yeu-noi-tran-the',
                content: 'Là một tập truyện ngắn được viết rải rác trong nhiều năm, tập truyện ngắn mới nhất của Giác - Trần Gian Ở Lại đã xuất sắc mô tả vẻ muôn hình vạn trạng của tình yêu và sự nổi loạn, gan dạ của tuổi trẻ...'
            },
            {
                id: 2,
                title: '[REVIEW ĐỘC GIẢ] CUỘN TRANH KỲ BÍ - BOYS LOVE DỄ THƯƠNG MANG MÀU SẮC HUYỀN ẢO',
                date: '05/09/2024',
                category: 'TIN TỨC',
                image: 'https://file.hstatic.net/200000287623/file/1_79e6df722efe40e5a58ab2f225cff766_grande.png',
                link: '/blogs/tintuc/mot-bai-viet-khac',
                content: 'Để tránh cái nóng mùa này, có hai lựa chọn tương đối hay ho mà mình có thể nghĩ ra. Một là đọc cái gì đó thật dễ thương, tận hưởng cảm giác thỏa mãn như khi thưởng thức một thứ quả mọng mát lành...'
            }
        ];

        setPosts(mockPosts); // Set the mock data to the state
    }, []);

    useEffect(() => {
        // Mock data for categories
        const mockCategories = [
            { id: 1, name: 'Hoạt động' },
            { id: 2, name: 'Tin tức' },
            { id: 3, name: 'Lịch phát hành sách định kỳ' },
            { id: 4, name: 'Review'}
        ];
        setCategories(mockCategories);
    }, []);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        setIsMedium(window.innerWidth >= 768 && window.innerWidth < 992);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize); // Cleanup listener
    }, []);

    const categoriesMenu = (
        <Menu>
            {categories.map(category => (
                <Menu.Item key={category.id}>
                    <a href="#">{category.name}</a>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div>
            <Breadcrumb items={breadcrumbs} />
            {(isMobile || isMedium) && (
                <div>
                    <Dropdown overlay={categoriesMenu} trigger={['click']}>
                        <a onClick={e => e.preventDefault()} className="ant-dropdown-link" href="#">
                            Thể loại bài viết <DownOutlined style={{ fontSize: '12px'}}/>
                        </a>
                    </Dropdown>
                </div>
            )}
            <Row gutter={16}>
                {/* Post List Section - Full width on mobile and md */}
                <Col xs={24} sm={24} md={isMedium ? 24 : 18} lg={18}>
                    <div className='mt-4'>
                        {posts.map(post => (
                            <div key={post.id} className="mb-4 flex" style={{ flexDirection: isMobile ? 'column' : 'row' }}>
                                <div style={{ width: isMobile ? '100%' : '40%' }}>
                                    <a href={post.link}>
                                        <img src={post.image} alt="Post Thumbnail" style={{ width: '100%', borderRadius: '8px' }} />
                                    </a>
                                </div>
                                <div style={{ width: isMobile ? '100%' : '60%', paddingLeft: isMobile ? '0' : '16px' }}>
                                    <h2>
                                        <a href={post.link} className='text-lg font-bold'>
                                            {post.title}
                                        </a>
                                    </h2>
                                    <span className='mr-3'>{post.date}</span>
                                    <span className='font-thin mr-3'>|</span>
                                    <span>
                                        <a href="#">{post.category}</a>
                                        </span>
                                    <span>
                                    </span>
                                    <p>
                                        {post.content}
                                        <a href={post.link} className='text-blue-500'>
                                            Xem thêm <ArrowRightOutlined style={{ fontSize : '12px'}}/>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Col>

                {/* Categories Section - Hidden on md */}
                {!isMobile && !isMedium && (
                    <Col xs={24} sm={24} md={6} lg={6}>
                        <div className='border border-gray-300'>
                            <div className='bg-black p-4'>
                                <h1 className='text-white'>Thể loại bài viết</h1>
                            </div>
                            <div className='bg-white'>
                                <ul>
                                    {categories.map(category => (
                                        <li key={category.id} className='my-3'>
                                            <a className='ml-3'>{category.name}  </a><hr className='my-2' /></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Col>
                )}
            </Row>
        </div>
    );
}

export default PostList;
