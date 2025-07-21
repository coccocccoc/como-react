import React, { useEffect, useState } from "react";
import "./PostEditor.css";
import { useNavigate } from "react-router-dom";

const PostEditor = ({ categories = [], initData = null, onSubmit, onCancel: parentCancel }) => {
  const [category, setCategory] = useState(initData?.category || "");
  const [title, setTitle] = useState(initData?.title  || "");
  const [content, setContent] = useState(initData?.content || "");
  
  useEffect(() => {
    setCategory(initData?.category || "");
    setTitle(initData?.title || "");
    setContent(initData?.content || "");
  }, [initData]);

  const navigate = useNavigate();
  const handleCancel = () => {
  if (window.history.length > 1) {
    navigate(-1); // 스택에 이전 페이지가 있으면 뒤로가기
  } else {
    navigate("/group-board"); // 없으면 목록(또는 홈)으로
  }
};

  const handleSubmit = () => {
    if (!category || !title.trim() || !content.trim()) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    onSubmit({ ...initData, id: initData?.id, category, title, content });
  };
  

  return (
    <div className="post-editor">
      {/* 카테고리 선택 */}
      <select
        className="board-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">게시판을 선택해 주세요.</option>
        {categories?.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* 제목 */}
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="post-editor-title"
      />

      {/* 내용 */}
      <textarea
        placeholder="내용을 입력해주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="post-content"
        rows={20}
      />

      {/* 버튼 */}
      <div className="post-actions">
        <button className="cancel-button" onClick={handleCancel}>
          취소
        </button>
        <button className="submit-button" onClick={handleSubmit}>
          {initData ? "수정하기" : "등록하기"}
        </button>
      </div>
    </div>
  );
};

export default PostEditor;