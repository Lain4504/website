import React, { useEffect, useState } from 'react';
import { Card, Skeleton } from 'antd';
import { getAllPost } from '../services/PostService';
import { Link } from 'react-router-dom';

const ListPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [pageSize, setPageSize] = useState(3); // Default to 3
    const maxVisible = 12;

    // Fetch posts from the API
    const loadPosts = async () => {
        try {
            const response = await getAllPost();
            const fetchedPosts = response.data;
            console.log("Post data is: ", response)
            // Sort posts by date
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

    useEffect(() => {
        loadPosts();
    }, []);

    // Function to update pageSize based on window width
    const updatePageSize = () => {
        const width = window.innerWidth;
        if (width >= 1024) {
            setPageSize(3); // Full screen
        } else if (width >= 640) {
            setPageSize(2); // Half screen
        } else {
            setPageSize(1); // Mobile
        }
    };

    useEffect(() => {
        updatePageSize(); // Set initial page size
        window.addEventListener('resize', updatePageSize); // Listen for resize events

        return () => {
            window.removeEventListener('resize', updatePageSize); // Cleanup on unmount
        };
    }, []);

    // Pagination logic
    const indexOfLastPost = currentPage * pageSize;
    const indexOfFirstPost = indexOfLastPost - pageSize;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / pageSize); // Calculate total pages

    const handlePageChange = (page) => {
        if (page !== currentPage) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentPage(page);
                setIsAnimating(false);
            }, 300);
        }
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
            <style>{`
            .post-container {
                transition: opacity 0.3s ease-in-out;
                opacity: 0; /* Start with opacity 0 */
            }

            .post-container.enter {
                opacity: 1; /* Fade in */
            }

            .post-container.exit {
                opacity: 0; /* Fade out */
            }
        `}</style>

            <div className={`flex flex-col items-center mt-7`}>
                {/* List of Posts */}
                <div className={`flex flex-wrap justify-center post-container ${isAnimating ? 'exit' : 'enter'}`}>
                    {currentPosts.map(post => (
                        <div key={post.id} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                            <Card
                                hoverable
                                className="bg-white border rounded shadow"
                                cover={
                                    <div className="relative">
                                        <img className="w-full h-auto rounded-t" src={post.thumbnail} alt={post.title} />
                                        <div className="absolute top-2 left-2 bg-white bg-opacity-75 p-1 rounded">
                                            <p className="text-sm text-gray-500"> {new Date(post.createdAt).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}</p>
                                        </div>
                                    </div>
                                }
                            >
                                <div className="p-4">
                                    <p className="text-lg font-semibold">
                                        <Link to={`/posts/${post.id}`} className="hover:text-blue-600">{post.title}</Link>
                                    </p>
                                    <div className="text-gray-700">{post.brief}</div>
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
                            className={`w-3 h-3 rounded-full cursor-pointer ${currentPage === index + 1 ? 'bg-blue-500' : 'bg-gray-300'
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
