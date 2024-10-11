import React, { useState, useEffect } from 'react';
import { Row, Col, Dropdown, Menu, Pagination } from 'antd';
import Breadcrumb from '../components/Breadcrumb';
import { ArrowRightOutlined, DownOutlined } from '@ant-design/icons';
import { getAllPostCategories, getPostByCategoryId } from '../services/PostService';
import { Link } from 'react-router-dom';

const PostList = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isMedium, setIsMedium] = useState(window.innerWidth >= 768 && window.innerWidth < 992);
    const [posts, setPosts] = useState([]); // Ensure posts is initialized as an array
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(3);
    const [curPostCategory, setCurPostCategory] = useState('all'); // Default to 'all'

    const fetchData = async (id) => {
        try {
            const response = await getPostByCategoryId(id);
            console.log(response.data); // Check the structure of the response
            setPosts(response.data.content); // Extract posts from the response
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    useEffect(() => {
        const loadPostCategories = async () => {
            try {
                const response = await getAllPostCategories();
                setCategories(response.data);
                fetchData('all'); // Fetch all posts on component mount
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        loadPostCategories();
    }, []);

    useEffect(() => {
        console.log('Current Post Category:', curPostCategory);
        if (curPostCategory) {
            fetchData(curPostCategory);
        }
    }, [curPostCategory]);


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
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const categoriesMenu = (
        <Menu>
            <Menu.Item key="all" onClick={() => {
                setCurPostCategory('all');
                setCurrentPage(1); // Reset to page 1
            }}>
                <Link to="/postcategory/all">Tất cả</Link>
            </Menu.Item>
            {categories.map(category => (
                <Menu.Item key={category.id} onClick={() => {
                    setCurPostCategory(category.id);
                    setCurrentPage(1); // Reset to page 1
                }}>
                    <Link to={`/postcategory/${category.id}`}>{category.name}</Link>
                </Menu.Item>
            ))}
        </Menu>
    );
    
    return (
        <div>
            <Breadcrumb items={[{ title: 'Trang chủ', href: '/' }, { title: 'Tin tức' }]} />
            {(isMobile || isMedium) && (
                <div>
                    <Dropdown overlay={categoriesMenu} trigger={['click']}>
                        <a onClick={e => e.preventDefault()} className="ant-dropdown-link">
                            <span className='text-white font-mono p-2 rounded-lg bg-black hover:bg-gray-600 transition duration-300'>
                                Thể loại bài viết <DownOutlined style={{ fontSize: '12px', color: 'white' }} />
                            </span>
                        </a>
                    </Dropdown>
                </div>
            )}

            <Row gutter={16}>
                <Col xs={24} sm={24} md={isMedium ? 24 : 18} lg={18}>
                    <div className='mt-8'>
                        {currentPosts.map(post => (
                            <div key={post.id} className="mb-4 flex animate-move-from-center" style={{ flexDirection: isMobile ? 'column' : 'row' }}>
                                <div style={{ width: isMobile ? '100%' : '40%' }}>
                                    <a href={post.link}>
                                        <img src={post.thumbnail} alt="Post Thumbnail" style={{ width: '100%', borderRadius: '8px' }} />
                                    </a>
                                </div>
                                <div style={{ width: isMobile ? '100%' : '60%', paddingLeft: isMobile ? '0' : '16px' }}>
                                    <h2>
                                        <Link to={`/posts/${post.id}`} className='text-lg font-bold'>
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <div className='mt-2'>
                                        <span className='mr-3'>{post.createdAt}</span>
                                        <span className='font-thin mr-3'>|</span>
                                        <span>
                                            <a href="#">{post.category}</a>
                                        </span>
                                    </div>
                                    <p className='mt-2'>
                                        {post.brief}
                                        <a href={post.link} className='text-blue-500'>
                                            Xem thêm <ArrowRightOutlined style={{ fontSize: '12px' }} />
                                        </a>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={posts.length}
                            onChange={handleChangePage}
                            showSizeChanger={false}
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
                                    <li className='my-3'>
                                        <Link to="#" onClick={() => {
                                            setCurPostCategory('all');
                                            setCurrentPage(1); // Reset to page 1
                                        }} className='ml-3'>Tất cả</Link>
                                        <hr className='my-2' />
                                    </li>
                                    {categories.map(category => (
                                        <li key={category.id} className='my-3'>
                                            <Link to={`/postcategory/${category.id}`}
                                                className='ml-3'
                                                onClick={() => {
                                                    setCurPostCategory(category.id); // Sửa đổi ở đây
                                                    setCurrentPage(1); // Reset to page 1
                                                }}
                                            >
                                                {category.name}
                                            </Link>
                                            <hr className='my-2' />
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
