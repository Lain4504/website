import React, { useState, useEffect } from 'react';
import { Row, Col, Dropdown, Menu, Skeleton, Pagination } from 'antd'; // Import necessary Ant Design components
import Breadcrumb from '../components/Breadcrumb';
import { ArrowRightOutlined, DownOutlined } from '@ant-design/icons';
import mockPosts from '../components/mockJsonData';
import { getAllPostCategories } from '../services/PostService';

const PostList = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isMedium, setIsMedium] = useState(window.innerWidth >= 768 && window.innerWidth < 992);
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [pageSize] = useState(3); // Set your desired page size

    const breadcrumbs = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Tin tức' }
    ];
    const fetchData = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockPosts);
            }, 1000);
        });
    };

    useEffect(() => {
        const loadPosts = async () => {
            const fetchedPosts = await fetchData();
            setPosts(fetchedPosts);
            setLoading(false);
        };
        loadPosts();
    }, []);

    useEffect(() => {
        const loadPostCategories = async () =>{
            try{
                const response = await getAllPostCategories();
                setCategories(response.data);
            }catch(error){
                console.error('Failed to fetch categories:', error);
            }
        }
        loadPostCategories();
    }, []);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        setIsMedium(window.innerWidth >= 768 && window.innerWidth < 992);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChangePage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const indexOfLastPost = currentPage * pageSize;
    const indexOfFirstPost = indexOfLastPost - pageSize;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // Get current posts

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
                        <a onClick={e => e.preventDefault()} className="ant-dropdown-link hover:text-blue-500 bg-black transition duration-300 p-2 rounded-lg shadow-lg hover:shadow-lg border border-r">
                            <span className='text-white font-mono'>Thể loại bài viết</span> <DownOutlined style={{ fontSize: '12px', color: 'white' }} />
                        </a>
                    </Dropdown>
                </div>
            )}

            <Row gutter={16}>
                <Col xs={24} sm={24} md={isMedium ? 24 : 18} lg={18}>
                    <div className='mt-8'>
                        {loading ? (
                            <Skeleton active paragraph={{ rows: 4 }} />
                        ) : (
                            currentPosts.map(post => (
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
                                        <div className='mt-2'>
                                            <span className='mr-3'>{post.date}</span>
                                            <span className='font-thin mr-3'>|</span>
                                            <span>
                                                <a href="#">{post.category}</a>
                                            </span>
                                        </div>
                                        <p className='mt-2'>
                                            {post.content}
                                            <a href={post.link} className='text-blue-500'>
                                                Xem thêm <ArrowRightOutlined style={{ fontSize: '12px' }} />
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {/* Pagination centered */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={posts.length}
                            onChange={handleChangePage}
                            showSizeChanger={false} // Hide size changer if you want a fixed page size
                        />
                    </div>
                </Col>

                {!isMobile && !isMedium && (
                    <Col xs={24} sm={24} md={6} lg={6}>
                        <div className='border border-gray-300 shadow-md'>
                            <div className='bg-black p-4'>
                                <h1 className='text-white'>THỂ LOẠI BÀI VIẾT</h1>
                            </div>
                            <div className='bg-white'>
                                <ul>
                                    {categories.map(category => (
                                        <li key={category.id} className='my-3'>
                                            <a className='ml-3'>{category.name}</a><hr className='my-2' />
                                        </li>
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
