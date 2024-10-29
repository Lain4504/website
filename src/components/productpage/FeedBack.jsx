import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";
import { Button, Input, List } from "antd";

const FeedBack = ({ bookId, userId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [connection, setConnection] = useState(null);
    const [error, setError] = useState("");
    const [visibleComments, setVisibleComments] = useState(2); // Initially show 2 comments

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/feedback/${bookId}`);
                setComments(response.data);
            } catch (err) {
                setError("Error loading comments: " + err.message);
            }
        };

        const connectToSignalR = async () => {
            const connect = new signalR.HubConnectionBuilder()
                .withUrl("http://localhost:3000/commentHub")
                .configureLogging(signalR.LogLevel.Information)
                .build();

            try {
                await connect.start();
                if (bookId) {
                    await connect.invoke("JoinBookRoom", bookId);
                }
                connect.on("ReceiveComment", (userId, comment) => {
                    setComments((prev) => [...prev, { userId, comment }]);
                });
            } catch (err) {
                console.error("Error connecting to SignalR", err);
                setError("Error connecting to chat server.");
            }

            setConnection(connect);
        };

        fetchComments();
        connectToSignalR();

        return () => {
            if (connection) {
                connection.invoke("LeaveBookRoom", bookId).catch((err) => console.error("Error leaving room:", err));
                connection.stop().then(() => console.log("Disconnected from SignalR"));
            }
        };
    }, [bookId, connection]);

    const sendComment = async () => {
        if (connection && newComment.trim()) {
            try {
                await connection.invoke("SendComment", bookId, userId, newComment);
                setNewComment("");
            } catch (err) {
                console.error("Error sending comment: ", err);
                setError("Error sending comment.");
            }
        } else {
            setError("Comment cannot be empty.");
        }
    };

    const handleViewMore = () => {
        setVisibleComments((prev) => prev + 2); // Show 2 more comments
    };

    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-4">Bình luận</h2>
            {error && <p className="text-red-500">{error}</p>}
            
            {/* Button hiển thị số bình luận */}
            <Button type="link" className="mb-2">
                {comments.length} Bình luận
            </Button>
            
            {/* Form nhập bình luận */}
            <form className="mb-4" onSubmit={(e) => { e.preventDefault(); sendComment(); }}>
                <Input.TextArea
                    id="comment"
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-2"
                    placeholder="Viết bình luận..."
                    required
                />
                <Button type="primary" htmlType="submit">
                    Đăng bình luận
                </Button>
            </form>

            {/* Danh sách bình luận */}
            <List
                bordered
                dataSource={comments.slice(0, visibleComments)}
                renderItem={(comment, index) => (
                    <List.Item key={index}>
                        <strong>{comment.userId}:</strong> {comment.comment}
                    </List.Item>
                )}
            />
            {visibleComments < comments.length && (
                <Button type="link" onClick={handleViewMore}>
                    Xem thêm
                </Button>
            )}
        </div>
    );
};

export default FeedBack;
