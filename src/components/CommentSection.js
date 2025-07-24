import React, { useState } from "react";
import CommentItem from "./CommentItem";

const CommentSection = ({
  postId,
  comments,
  onAdd,
  onDelete,
  onUpdate,
  currentUser = { name: "닉네임" },
}) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) {
      alert("댓글을 입력해 주세요.");
      return;
    }
    const newComment = {
    content: text,
  };

  onAdd(newComment);
  setText("");
  };
  
   // 최신 댓글이 아래로 가도록 정렬
  const sortedComments = [...comments].sort((a, b) => new Date(a.regDate) - new Date(b.regDate));

  return (
    <div className="comment-section">
      <h6>댓글</h6>

      {/* 댓글 리스트 */}
      {sortedComments.map((c) => (
        <CommentItem
          key={c.commentId}
          comment={c}
          onDelete={onDelete}
          onEdit={(updated) => onUpdate(updated)}
        />
      ))}

      {/* 입력창 */}
      <div className="comment-form">
        <input
          placeholder="댓글을 입력하세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSubmit}>등록</button>
      </div>
    </div>
  );
};

export default CommentSection;
