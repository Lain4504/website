import React, { useEffect, useId, useState } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";
import { Button, Input, List } from "antd";

const FeedBack = ({ bookId, userId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [connection, setConnection] = useState(null);
  const [error, setError] = useState("");
  const [visibleComments, setVisibleComments] = useState(2);

  useEffect(() => {
    // Hàm lấy bình luận từ API
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/feedback/${bookId}`
        );
        setComments(response.data);
      } catch (err) {
        setError("Error loading comments: " + err.message);
      }
    };

    // Hàm kết nối tới SignalR
    const connectToSignalR = async () => {
      const connect = new signalR.HubConnectionBuilder()
        .withUrl(`http://localhost:3000/commentHub?bookId=${bookId}`)
        .configureLogging(signalR.LogLevel.Information)
        .build();

      try {
        await connect.start();
        console.log("Kết nối SignalR thành công");

        // Lắng nghe sự kiện ReceiveComment từ server
        connect.on("ReceiveComment", (userId, comment) => {
          setComments((prevComments) => [...prevComments, { userId, comment }]);
          fetchComments();
        });

        // Lưu kết nối vào state
        setConnection(connect);
      } catch (err) {
        console.error("Error connecting to SignalR", err);
        setError(`Error connecting to chat server: ${err.message}`);
      }
    };

    // Gọi hàm kết nối và lấy dữ liệu bình luận ban đầu
    connectToSignalR();
    fetchComments();

    // Hủy kết nối SignalR khi component bị tháo
    return () => {
      if (connection) {
        connection.stop().then(() => console.log("Đã ngắt kết nối SignalR"));
      }
    };
  }, [bookId]); // Chỉ gọi lại khi bookId thay đổi

  // Hàm gửi bình luận mới
  const sendComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post("http://localhost:3000/api/feedback", {
          bookId,
          userId,
          comment: newComment,
        });
        
        if (response.status === 200) {
          if (connection) {
            console.log(bookId, userId, newComment)
            await connection.invoke("SendComment", bookId, userId, newComment);
            console.log("Comment sent via SignalR");
          }
          setNewComment(""); // Clear the input
        }
      } catch (err) {
        console.error("Error sending comment:", err);
        setError("Error sending comment.");
      }
    } else {
      setError("Comment cannot be empty.");
    }
  };
  

  const handleViewMore = () => {
    setVisibleComments((prev) => prev + 2);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Bình luận</h2>
      {error && <p className="text-red-500">{error}</p>}

      <Button type="link" className="mb-2">
        {comments.length} Bình luận
      </Button>

      <form
        className="mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          sendComment();
        }}
      >
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
