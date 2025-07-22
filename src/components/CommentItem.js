import React, { useEffect, useState } from "react";

const CommentItem = ({ comment, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [txt, setTxt] = useState(comment.content);

  const handleSave = () => {
    if (!txt.trim()) return;
    onEdit({ ...comment, content: txt, regDate: new Date().toLocaleString() });
    setEditing(false);
  };
  
  return (
    <div className="comment-item">
      <strong>{comment.nickname}</strong> | <span>{comment.regDate}</span>
      {editing ? (
        <>
          <input value={txt} onChange={(e) => setTxt(e.target.value)} />
          <button className="link-btn" onClick={handleSave}>저장</button>
          <button className="link-btn" onClick={() => setEditing(false)}>취소</button>
        </>
      ) : (
        <>
          <p>{comment.content}</p>
          <button className="link-btn" onClick={() => setEditing(true)}>수정</button>
            <button
              className="link-btn"
              onClick={() => {
                console.log("삭제 요청 ID:", comment.commentId);
                onDelete(comment.commentId);
              }}
            >삭제
            </button>
        </>
      )}
    </div>
  );
};


export default CommentItem;
