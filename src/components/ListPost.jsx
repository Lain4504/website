import React, { useEffect, useState } from 'react';
import { Card, Skeleton } from 'antd';
import mockPosts from './mockJsonData'; // Mock data

const ListPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3; // Number of posts per page
    const maxVisible = 12;
    const fetchData = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // return reject(new Error('Failed to fetch posts'));
                resolve(mockPosts);
            }, 1000);
        });
    };

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const fetchedPosts = await fetchData();

                // Sort posts by date (assuming date is a valid sortable string)
                const sortedPosts = fetchedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

                // Get the latest 12 posts
                const latestPosts = sortedPosts.slice(0, maxVisible);

                setPosts(latestPosts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

    // Pagination logic
    const indexOfLastPost = currentPage * pageSize;
    const indexOfFirstPost = indexOfLastPost - pageSize;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / pageSize); // Calculate total pages

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <div className="flex justify-center mt-7">
                <Skeleton active paragraph={{ rows: 4 }} style={{ width: '100%' }} />
            </div>
        );
    }

    if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

    return (
        <>
        <div className="flex flex-col items-center mt-7">
            {/* List of Posts */}
            <div className="flex flex-wrap justify-center">
                {currentPosts.map(post => (
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
                                <p className="text-lg font-semibold">
                                    <a href={post.link} className="hover:text-blue-600">{post.title}</a>
                                </p>
                                <div className="text-gray-700">{post.content}</div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Custom Pagination */}
            <div className="flex justify-center mt-6 space-x-3">
                {[...Array(totalPages)].map((_, index) => (
                    <div
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${
                            currentPage === index + 1 ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                        style={{
                            transition: 'background-color 0.3s',
                        }}
                    />
                ))}
            </div>
        </div>
        <div className='mt-5'></div>
        </>
    );
};

export default ListPost;
