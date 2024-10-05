import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, getAllPostCategories } from '../services/PostService'; // Import service methods
import { Col, Row } from 'antd'; // Ant Design components
import parser from 'html-react-parser'; // Import html-react-parser

const PostDetail = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  // Fetch single post by ID
  const fetchPost = async () => {
    try {
      const res = await getPostById(id);
      const { data } = res;
      console.log('Post detail:', data);
      setPost(data);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    }
  };

  // Fetch categories for the menu
  const loadPostCategories = async () => {
    try {
      const response = await getAllPostCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchPost(); // Load post on component mount
  }, [id]); // Depend on `id` param

  useEffect(() => {
    loadPostCategories(); // Load categories
  }, []);

  return (
    <Row gutter={16} justify="center"> {/* Center align the row */}
      <Col xs={24} sm={24} md={categories.length > 0 ? 18 : 24} lg={categories.length > 0 ? 18 : 24}>
        {/* Dynamically set column width depending on categories */}
        <div className='post-content-container my-4'> 
          <p className='text-xl font-semibold text-center'>{post.title}</p>
        </div>
        <hr className='mb-3'/>
        <div>{parser(post.content || '')}</div> {/* Safely parse post content */}
      </Col>
      {/* Add a class to control visibility via CSS */}
      {categories.length > 0 && (
        <Col xs={24} sm={24} md={6} lg={6} className='categories-column'>
          <div className='border border-gray-300 shadow-md'>
            <div className='bg-black p-4'>
              <h1 className='text-white'>THỂ LOẠI BÀI VIẾT</h1>
            </div>
            <div className='bg-white'>
              <ul>
                {categories.map((category) => (
                  <li key={category.id} className='my-3'>
                    <a href={`/category/${category.id}`} className='ml-3'>
                      {category.name}
                    </a>
                    <hr className='my-2' />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
      )}
    </Row>
  );
};

export default PostDetail;
