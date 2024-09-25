import React, { useEffect, useState } from 'react';
import { Card, Skeleton } from 'antd'; // Import Card and Skeleton from Ant Design
import mockPosts from './mockJsonData'; // Import the mock posts

const ListPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    const fetchData = () => {
        // Simulating a fetch call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Uncomment below line to simulate an error
                // return reject(new Error('Failed to fetch posts'));
                resolve(mockPosts);
            }, 1000); // Simulating network delay
        });
    };

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const fetchedPosts = await fetchData();
                setPosts(fetchedPosts);
            } catch (err) {
                setError(err.message); // Set error message if fetching fails
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        loadPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center mt-7">
                <Skeleton active paragraph={{ rows: 4 }} style={{ width: '100%' }} /> {/* Skeleton for loading */}
            </div>
        );
    }
    if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>; // Error message

    return (
        <div className="flex flex-wrap justify-center mt-7">
            {posts.map(post => (
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
    );
};

export default ListPost;
