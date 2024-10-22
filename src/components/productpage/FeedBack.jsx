import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";

function FeedBack({ bookId, userId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [connection, setConnection] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        // Load existing comments
        const fetchComments = async () => {
            try {
                console.log(bookId, userId)
                const response = await axios.get(`http://localhost:5146/api/feedback/${bookId}`);
                setComments(response.data);
                console.log("Messegae:", response.data)
            } catch (err) {
                setError("Error loading comments: " + err.message);
            }
        };
        fetchComments();

        // Establish SignalR connection
        const connect = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5146/commentHub")
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connect
            .start()
            .then(() => {
                if (bookId) {
                    connect.invoke("JoinBookRoom", bookId);
                    console.log("Connected to SignalR");
                } else {
                    console.error("Book ID is invalid.");
                }
            })
            .catch((err) => {
                console.error("Error connecting to SignalR", err);
                setError("Error connecting to chat server.");
            });

        // Listen for new comments from other users
        connect.on("ReceiveComment", (userId, comment) => {
            setComments((prev) => [...prev, { userId, comment }]);
        });

        setConnection(connect);

        // Cleanup function
        return () => {
            if (connection) {
                connection
                    .invoke("LeaveBookRoom", bookId)
                    .catch((err) => console.error("Error leaving room:", err));
                connection.stop().then(() => {
                    console.log("Disconnected from SignalR");
                });
            }
        };
    }, [bookId]);

    const sendComment = () => {
        // Log the connection state
        console.log("Connection state:", connection);
    
        // Log the bookId, userId, and newComment before invoking
        console.log("Sending comment with the following data:");
        console.log("Book ID:", bookId);
        console.log("User ID:", userId);
        console.log("Comment:", newComment);
    
        if (connection && newComment.trim()) {
            connection
                .invoke("SendComment", bookId, userId, newComment)
                .then(() => {
                    console.log("Comment sent successfully");
                    setNewComment("");
                })
                .catch((err) => {
                    console.error("Error sending comment: ", err);
                    setError("Error sending comment.");
                });
        } else {
            setError("Comment cannot be empty.");
            console.warn("Comment was empty or connection is invalid.");
        }
    };

    return (
        <div>
            <h2>Feedback</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {Array.isArray(comments) && comments.length > 0 ? (
                    comments.map((c, index) => (
                        <li key={index}>
                            <strong>{c.userId}:</strong> {c.comment}
                        </li>
                    ))
                ) : (
                    <li>No comments available.</li>
                )}
            </ul>


            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
            />
            <button onClick={sendComment}>Send Comment</button>
        </div>
    );
}

export default FeedBack;
