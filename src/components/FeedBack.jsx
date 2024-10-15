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
    axios
      .get(`/api/feedback/${bookId}`)
      .then((response) => setComments(response.data))
      .catch((err) => setError("Error loading comments: " + err.message));

    // Establish SignalR connection
    const connect = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/commentHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connect
      .start()
      .then(() => {
        connect.invoke("JoinBookRoom", bookId);
        console.log("Connected to SignalR");
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
        connection.invoke("LeaveBookRoom", bookId);
        connection.stop();
        console.log("Disconnected from SignalR");
      }
      console.log(comments);
    };
  }, [bookId]);

  const sendComment = () => {
    if (connection && newComment.trim()) {
      connection
        .invoke("SendComment", bookId, userId, newComment)
        .then(() => setNewComment(""))
        .catch((err) => {
          console.error("Error sending comment: ", err);
          setError("Error sending comment.");
        });
    } else {
      setError("Comment cannot be empty.");
    }
  };

  return (
    <div>
      <h2>Feedback</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {comments.map((c, index) => (
          <li key={index}>
            <strong>{c.userId}:</strong> {c.comment}
          </li>
        ))}
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
