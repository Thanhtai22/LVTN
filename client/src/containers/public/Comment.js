import React, { useState, useEffect } from "react";
import { createComment, getCommentsByPostId } from "../../services/comment";
import CommentSection from "./CommentSection";
import { getDateOnVN } from "../../ultils/dateUtil";
const Comment = ({ postId, userId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState([]);
  const [newComment, setNewComment] = useState("");
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    // Thêm bình luận mới vào danh sách
    setComments((prevComments) => [
      ...prevComments,
      { userId: userId, postId: postId, content: newComment },
    ]);
    createComment({
      userId: userId,
      postId: postId,
      content: newComment,
    });
    // Xóa nội dung của ô nhập bình luận sau khi thêm
    setNewComment("");
  };

  useEffect(() => {
    let isApiSubribed = false;
    const fetchData = async () => {
      if (!isApiSubribed) {
        const comments = await getCommentsByPostId(postId);
        let tempComments = [];
        tempComments = comments.data.map((comment) => {
          return comment;
        });
        setComments(tempComments);
      }
    };
    fetchData();
    return () => {
      isApiSubribed = true;
    };
  }, []);

  return (
    <div className='mt-3 bg-white rounded-md shadow-md p-4'>
      <h3 className='font-bold'>Bình Luận</h3>
      <ul>
        {comments?.map((comment, index) => (
          <CommentSection
            content={comment.content}
            dateTime={
              comment.createdAt
                ? getDateOnVN(comment.createdAt)
                : getDateOnVN(new Date().toString())
            }
            userId={comment.userId ? comment.userId : userId}
          />
        ))}
      </ul>
      <textarea
      className='w-full outline-none bg-slate-300 rounded-md'
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Thêm bình luận..."
      />
      <button className='bg-cyan-500 hover:bg-cyan-600 rounded-md p-2 font-bold' onClick={handleAddComment}>Gửi</button>
    </div>
  );
};

export default Comment;
