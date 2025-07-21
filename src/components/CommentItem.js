import React, { useState } from "react";

const CommentItem = ({ comment, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [txt, setTxt] = useState(comment.text);

  const handleSave = () => {
    if (!txt.trim()) return;
    onEdit({ ...comment, text: txt, date: new Date().toLocaleString() });
    setEditing(false);
  };
  
  return (
    <div className="comment-item">
      <strong>{comment.author}</strong> | <span>{comment.date}</span>
      {editing ? (
        <>
          <input value={txt} onChange={(e) => setTxt(e.target.value)} />
          <button className="link-btn" onClick={handleSave}>저장</button>
          <button className="link-btn" onClick={() => setEditing(false)}>취소</button>
        </>
      ) : (
        <>
          <p>{comment.text}</p>
          <button className="link-btn" onClick={() => setEditing(true)}>수정</button>
          <button className="link-btn" onClick={() => onDelete(comment.id)}>삭제</button>
        </>
      )}
    </div>
  );
};


export default CommentItem;
